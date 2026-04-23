// api/stripe-webhook.js
// Stripe sends POST here after payment — we add credits in Supabase.
// Works for both paid purchases AND $0 sessions (e.g. full promo-code discount).

import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Vercel: disable body parsing so we can verify Stripe signature
export const config = { api: { bodyParser: false } };

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const rawBody = await getRawBody(req);
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature failed:", err.message);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  console.log(`[webhook] received event: ${event.type} id=${event.id}`);

  // Handle both regular completion and async payment success.
  // For $0 (100% promo) sessions, Stripe still fires checkout.session.completed.
  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    let session = event.data.object;

    // Re-fetch the session to ensure we have the freshest metadata
    // (in some cases the webhook payload metadata can be stale/missing).
    try {
      session = await stripe.checkout.sessions.retrieve(session.id);
    } catch (e) {
      console.warn("[webhook] could not re-fetch session, using payload:", e.message);
    }

    console.log(`[webhook] session ${session.id} amount_total=${session.amount_total} payment_status=${session.payment_status} metadata=`, session.metadata);

    // Metadata is set in create-checkout.js on the session itself
    const user_id = session.metadata?.user_id;
    const credits = session.metadata?.credits;

    if (!user_id || !credits) {
      console.warn("Webhook: missing metadata on session", {
        sessionId: session.id,
        metadata: session.metadata,
      });
      // Return 200 so Stripe doesn't retry — but log it for debugging
      return res.status(200).json({ received: true, warning: "missing metadata" });
    }

    const creditsToAdd = parseInt(credits, 10);
    if (isNaN(creditsToAdd) || creditsToAdd <= 0) {
      console.error("Webhook: invalid credits value", credits);
      return res.status(200).json({ received: true, warning: "invalid credits" });
    }

    // Idempotency: check if we already processed this session
    const { data: existing } = await supabase
      .from("processed_sessions")
      .select("id")
      .eq("stripe_session_id", session.id)
      .maybeSingle();

    if (existing) {
      console.log(`Webhook: session ${session.id} already processed, skipping`);
      return res.status(200).json({ received: true, skipped: "already processed" });
    }

    // Extract promotion code (if any) from the session.
    // Stripe puts it under session.discounts[].promotion_code (an ID like "promo_...").
    // We resolve it to the human-readable code (e.g. "WELCOME10") for nicer logging,
    // but match on the ID since that's stable.
    let promotionCodeId = null;
    let promotionCodeLabel = null;
    try {
      const discount = Array.isArray(session.discounts) ? session.discounts[0] : null;
      if (discount?.promotion_code) {
        promotionCodeId = typeof discount.promotion_code === "string"
          ? discount.promotion_code
          : discount.promotion_code.id;
        try {
          const pc = await stripe.promotionCodes.retrieve(promotionCodeId);
          promotionCodeLabel = pc?.code ?? null;
        } catch (e) {
          console.warn("[webhook] could not resolve promo code label:", e.message);
        }
      }
    } catch (e) {
      console.warn("[webhook] error reading discounts:", e.message);
    }

    // Enforce: each promotion code can only be redeemed once per user.
    if (promotionCodeId) {
      const { data: priorPromo, error: priorErr } = await supabase
        .from("processed_sessions")
        .select("id, stripe_session_id")
        .eq("user_id", user_id)
        .eq("promotion_code", promotionCodeId)
        .maybeSingle();

      if (priorErr) {
        console.error("[webhook] failed to check prior promo usage:", priorErr);
        return res.status(500).json({ error: "DB promo check failed" });
      }

      if (priorPromo) {
        console.warn(`[webhook] BLOCKED: user ${user_id} already redeemed promo ${promotionCodeLabel ?? promotionCodeId} (prior session ${priorPromo.stripe_session_id}). Skipping credit on session ${session.id}.`);
        // Log the blocked attempt so it's visible and not retried by Stripe
        await supabase.from("processed_sessions").insert({
          stripe_session_id: session.id,
          user_id,
          credits_added: 0,
          amount_total: session.amount_total,
          promotion_code: promotionCodeId,
          processed_at: new Date().toISOString(),
        }).then(({ error }) => {
          if (error) console.warn("[webhook] could not log blocked session:", error);
        });
        return res.status(200).json({
          received: true,
          blocked: "promo already redeemed by this user",
        });
      }
    }

    // Add credits via direct UPDATE on profiles (no RPC required).
    // Read current credits, then write incremented value.
    const { data: profile, error: fetchErr } = await supabase
      .from("profiles")
      .select("credits")
      .eq("id", user_id)
      .maybeSingle();

    if (fetchErr) {
      console.error("[webhook] failed to fetch profile:", fetchErr);
      return res.status(500).json({ error: "DB fetch failed" });
    }

    if (!profile) {
      console.error(`[webhook] no profile found for user_id=${user_id}`);
      return res.status(500).json({ error: "Profile not found" });
    }

    const newCredits = (profile.credits || 0) + creditsToAdd;
    const { error: creditError } = await supabase
      .from("profiles")
      .update({ credits: newCredits })
      .eq("id", user_id);

    if (creditError) {
      console.error("[webhook] credits update error:", creditError);
      // Return 500 so Stripe retries
      return res.status(500).json({ error: "DB credit update failed" });
    }

    console.log(`[webhook] credits ${profile.credits || 0} -> ${newCredits} for user ${user_id}`);

    // Record this session as processed (prevents double-crediting on retries)
    const { error: logError } = await supabase
      .from("processed_sessions")
      .insert({
        stripe_session_id: session.id,
        user_id,
        credits_added: creditsToAdd,
        amount_total: session.amount_total, // 0 for fully discounted sessions
        promotion_code: promotionCodeId, // null if no promo was used
        processed_at: new Date().toISOString(),
      });

    if (logError) {
      // Non-fatal: credits already added, just log
      console.warn("Could not log processed session:", logError);
    }

    console.log(`Added ${creditsToAdd} credits to user ${user_id} (session ${session.id}, amount: ${session.amount_total})`);
  }

  res.status(200).json({ received: true });
};
