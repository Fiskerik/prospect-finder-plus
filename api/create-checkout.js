// api/create-checkout.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const PRICES = {
  single: process.env.STRIPE_PRICE_1,
  five:   process.env.STRIPE_PRICE_5,
  ten:    process.env.STRIPE_PRICE_10,
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { plan, email } = req.body;  // 👈 plan, inte priceId

  const priceId = PRICES[plan];

  if (!priceId) {
    return res.status(400).json({ error: `Invalid plan: ${plan}` });
  }


  try {
    // Skapa bas-objektet för sessionen
    const sessionOptions = {
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/checkout`,
      allow_promotion_codes: true,
    };

    // Lägg bara till customer_email om email faktiskt har ett värde
    if (email && email.trim() !== "") {
      sessionOptions.customer_email = email;
    }

    const session = await stripe.checkout.sessions.create(sessionOptions);

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return res.status(500).json({ error: err.message });
  }
}
