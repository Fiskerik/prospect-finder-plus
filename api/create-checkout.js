// api/create-checkout.js
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const PRICES = {
  single: { priceId: process.env.STRIPE_PRICE_1, credits: 1 },
  five:   { priceId: process.env.STRIPE_PRICE_5, credits: 5 },
  ten:    { priceId: process.env.STRIPE_PRICE_10, credits: 10 },
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { plan, email, user_id } = req.body;

  const planData = PRICES[plan];
  if (!planData) {
    return res.status(400).json({ error: `Invalid plan: ${plan}` });
  }

  // Require user_id so we can attach metadata and enforce promo limits
  if (!user_id) {
    return res.status(400).json({ error: "user_id is required. Please sign in before purchasing." });
  }

  try {
    // Find or create a Stripe customer tied to this Supabase user_id.
    // This is what makes Stripe's "once per customer" promo restriction work.
    let customerId = null;
    const existing = await stripe.customers.search({
      query: `metadata['supabase_user_id']:'${user_id}'`,
      limit: 1,
    });

    if (existing.data.length > 0) {
      customerId = existing.data[0].id;
    } else {
      const customer = await stripe.customers.create({
        email: email && email.trim() ? email.trim() : undefined,
        metadata: { supabase_user_id: user_id },
      });
      customerId = customer.id;
    }

    const sessionOptions = {
      customer: customerId,
      line_items: [{ price: planData.priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${req.headers.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/checkout`,
      allow_promotion_codes: true,
      // Pass user_id and credits in metadata so the webhook can credit the right account
      metadata: {
        user_id,
        credits: String(planData.credits),
      },
      payment_intent_data: {
        metadata: {
          user_id,
          credits: String(planData.credits),
        },
      },
    };

    const session = await stripe.checkout.sessions.create(sessionOptions);
    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return res.status(500).json({ error: err.message });
  }
}
