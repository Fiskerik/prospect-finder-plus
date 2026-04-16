// src/pages/Checkout.tsx
import { useEffect, useState } from "react";

// Dessa mappar namnet på planen till de specifika Price ID:n som syns i din Stripe-bild
const PLAN_DETAILS: Record<string, { label: string; price: string; stripeId: string }> = {
  single: { 
    label: "1 full report", 
    price: "$9.99", 
    stripeId: "STRIPE_PRICE_1" 
  },
  five: { 
    label: "5 full reports", 
    price: "$39.99", 
    stripeId: "STRIPE_PRICE_5" 
  },
  ten: { 
    label: "10 full reports", 
    price: "$69.99", 
    stripeId: "STRIPE_PRICE_10" 
  },
};

export default function CheckoutPage() {
  const params = new URLSearchParams(window.location.search);
  const planKey = params.get("plan") ?? "single";
  const userId = params.get("user_id") ?? "";
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Hämta rätt info baserat på URL-parametern
  const planInfo = PLAN_DETAILS[planKey] ?? PLAN_DETAILS.single;

  async function handleCheckout() {
    if (!userId) {
      setError("No user ID found. Please sign in via the extension first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          priceId: planInfo.stripeId, // Skickar det faktiska Stripe ID:t
          email: "" // Kan lämnas tom om Stripe ska fråga efter mail, eller fyllas i om du har den
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error ?? "Could not create checkout session.");
      }
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Kör checkout automatiskt om vi har ett userId när sidan laddas
  useEffect(() => {
    if (userId) {
      handleCheckout();
    }
  }, [userId]);

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        maxWidth: 400,
        margin: "80px auto",
        padding: "0 20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Prospect In</h1>
      <p style={{ color: "#5f6b7a", marginBottom: 24 }}>
        You selected: <strong>{planInfo.label}</strong> — {planInfo.price}
      </p>

      {error && (
        <p
          style={{
            color: "#c0392b",
            background: "#fdf0ef",
            padding: "10px 14px",
            borderRadius: 8,
            marginBottom: 16,
            fontSize: 13,
          }}
        >
          {error}
        </p>
      )}

      <button
        onClick={handleCheckout}
        disabled={loading}
        style={{
          background: "#0a66c2",
          color: "#fff",
          border: "none",
          borderRadius: 999,
          padding: "12px 28px",
          fontSize: 14,
          fontWeight: 600,
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
          transition: "background 0.2s",
        }}
      >
        {loading ? "Redirecting to Stripe…" : "Continue to payment"}
      </button>

      <p style={{ marginTop: 14, fontSize: 12, color: "#8895a7" }}>
        After payment, credits appear in the extension within seconds.
      </p>
    </div>
  );
}