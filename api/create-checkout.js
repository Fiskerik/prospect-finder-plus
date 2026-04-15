// /api/create-checkout.js  (Vercel serverless function)
// POST { plan: "single"|"five"|"ten", user_id, success_url, cancel_url }

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const PLANS = {
  single: { price: process.env.STRIPE_PRICE_1,  credits: 1  },
  five:   { price: process.env.STRIPE_PRICE_5,  credits: 5  },
  ten:    { price: process.env.STRIPE_PRICE_10, credits: 10 }
};

module.exports = async (req, res) => {
  // CORS for extension
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { plan, user_id, success_url, cancel_url } = req.body;

  if (!PLANS[plan]) return res.status(400).json({ error: "Invalid plan" });
  if (!user_id)     return res.status(400).json({ error: "user_id required" });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: PLANS[plan].price, quantity: 1 }],
      metadata: { user_id, plan, credits: PLANS[plan].credits },
      success_url: success_url || `${process.env.APP_PUBLIC_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  cancel_url  || `${process.env.APP_PUBLIC_URL}/checkout/cancel`
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    res.status(500).json({ error: err.message });
  }
};