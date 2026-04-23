// api/session-status.js
// Returns the result of a checkout session as recorded by our webhook.
// The frontend uses this to show "Payment successful" vs "Promo already used".
import { createClient } from "@supabase/supabase-js";

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

  // Poll-friendly: webhook may not have processed yet.
  const { data, error } = await supabase
    .from("processed_sessions")
    .select("stripe_session_id, credits_added, promotion_code, amount_total")
    .eq("stripe_session_id", sessionId)
    .maybeSingle();

  if (error) {
    console.error("[session-status] DB error:", error);
    return res.status(500).json({ error: "DB error" });
  }

  if (!data) {
    // Webhook hasn't processed this session yet — frontend should retry.
    return res.status(200).json({ status: "pending" });
  }

  if (data.credits_added > 0) {
    return res.status(200).json({
      status: "credited",
      credits: data.credits_added,
      promotion_code: data.promotion_code,
    });
  }

  // credits_added === 0 means the webhook blocked it (promo reused)
  return res.status(200).json({
    status: "blocked_promo_reused",
    promotion_code: data.promotion_code,
  });
}
