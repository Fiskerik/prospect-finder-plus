// api/session-status.js
// Returns the result of a checkout session.
// Primary source: our processed_sessions table (written by the webhook).
// Fallback: Stripe directly — if the webhook hasn't written yet but Stripe
// shows the session is complete with a promo that this user already used,
// we can return blocked_promo_reused immediately.
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const sessionId = req.query.session_id;
  if (!sessionId || typeof sessionId !== "string") {
    return res.status(400).json({ error: "session_id is required" });
  }

  // 1. Check our DB first (the source of truth once the webhook ran).
  const { data, error } = await supabase
    .from("processed_sessions")
    .select("stripe_session_id, credits_added, promotion_code, amount_total")
    .eq("stripe_session_id", sessionId)
    .maybeSingle();

  if (error) {
    console.error("[session-status] DB error:", error);
    return res.status(500).json({ error: "DB error" });
  }

  if (data) {
    if (data.credits_added > 0) {
      return res.status(200).json({
        status: "credited",
        credits: data.credits_added,
        promotion_code: data.promotion_code,
      });
    }
    return res.status(200).json({
      status: "blocked_promo_reused",
      promotion_code: data.promotion_code,
    });
  }

  // 2. No row yet. Look at Stripe directly to give the user a faster answer.
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const userId = session.metadata?.user_id;
    const discount = Array.isArray(session.discounts) ? session.discounts[0] : null;
    const promoId = discount?.promotion_code
      ? (typeof discount.promotion_code === "string"
          ? discount.promotion_code
          : discount.promotion_code.id)
      : null;

    // If a promo was used and this user already redeemed it on a prior session,
    // we can answer immediately without waiting for the webhook.
    if (userId && promoId) {
      const { data: prior } = await supabase
        .from("processed_sessions")
        .select("id")
        .eq("user_id", userId)
        .eq("promotion_code", promoId)
        .neq("stripe_session_id", sessionId)
        .maybeSingle();

      if (prior) {
        return res.status(200).json({
          status: "blocked_promo_reused",
          promotion_code: promoId,
        });
      }
    }

    // Session exists in Stripe but no DB row yet → webhook still running.
    return res.status(200).json({ status: "pending" });
  } catch (e) {
    console.error("[session-status] Stripe lookup failed:", e.message);
    return res.status(200).json({ status: "pending" });
  }
}
