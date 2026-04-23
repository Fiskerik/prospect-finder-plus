// api/stripe-webhook.js
// Stripe sends POST here after payment — we add credits in Supabase.
// Works for both paid purchases AND $0 sessions (e.g. full promo-code discount).

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { createClient } = require("@supabase/supabase-js");

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

module.exports = async (req, res) => {
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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

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

    // Add credits atomically
    const { error: creditError } = await supabase.rpc("add_credits", {
      uid: user_id,
      amount: creditsToAdd,
    });

    if (creditError) {
      console.error("Supabase add_credits error:", creditError);
      // Return 500 so Stripe retries
      return res.status(500).json({ error: "DB credit update failed" });
    }

    // Record this session as processed (prevents double-crediting on retries)
    const { error: logError } = await supabase
      .from("processed_sessions")
      .insert({
        stripe_session_id: session.id,
        user_id,
        credits_added: creditsToAdd,
        amount_total: session.amount_total, // 0 for fully discounted sessions
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
