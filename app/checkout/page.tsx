// /app/checkout/page.tsx  (or pages/checkout.tsx)
// This is the page the extension opens when a user clicks "Buy"
// It reads ?plan=single|five|ten&user_id=xxx, calls the API, redirects to Stripe

"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const PLAN_LABELS: Record<string, { label: string; price: string; credits: number }> = {
  single: { label: "1 full report",  price: "$9.99",  credits: 1  },
  five:   { label: "5 full reports", price: "$39.99", credits: 5  },
  ten:    { label: "10 full reports",price: "$69.99", credits: 10 }
};

export default function CheckoutPage() {
  const params = useSearchParams();
  const plan    = params.get("plan")    ?? "single";
  const userId  = params.get("user_id") ?? "";
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const planInfo = PLAN_LABELS[plan] ?? PLAN_LABELS.single;

  async function handleCheckout() {
    if (!userId) {
      setError("No user ID found. Please sign in via the extension first.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, user_id: userId })
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

  // Auto-redirect
  useEffect(() => { if (userId) handleCheckout(); }, []);

  return (
    <div style={{ fontFamily: "Inter, sans-serif", maxWidth: 400, margin: "80px auto", padding: "0 20px", textAlign: "center" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Prospect In</h1>
      <p style={{ color: "#5f6b7a", marginBottom: 24 }}>
        You selected: <strong>{planInfo.label}</strong> — {planInfo.price}
      </p>
      {error && (
        <p style={{ color: "#c0392b", background: "#fdf0ef", padding: "10px 14px", borderRadius: 8, marginBottom: 16, fontSize: 13 }}>
          {error}
        </p>
      )}
      <button
        onClick={handleCheckout}
        disabled={loading}
        style={{
          background: "#0a66c2", color: "#fff", border: "none",
          borderRadius: 999, padding: "12px 28px", fontSize: 14,
          fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1
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