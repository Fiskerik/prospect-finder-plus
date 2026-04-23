// src/pages/Checkout.tsx
import { useEffect, useState } from "react";

const PLAN_DETAILS: Record<string, { label: string; price: string }> = {
  single: { label: "1 full report", price: "$9.99" },
  five:   { label: "5 full reports", price: "$39.99" },
  ten:    { label: "10 full reports", price: "$69.99" },
};

export default function CheckoutPage() {
  const params = new URLSearchParams(window.location.search);
  const planKey = params.get("plan") ?? "single";
  const userId = params.get("user_id") ?? "";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [autoStarted, setAutoStarted] = useState(false);

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
          plan: planKey,
          email: email.trim(),
          user_id: userId,
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

  // Auto-start checkout when user_id is available (coming from the extension)
  useEffect(() => {
    if (userId && !autoStarted) {
      setAutoStarted(true);
      handleCheckout();
    }
  }, [userId]);

  // If no user_id, show a helpful message instead of a broken checkout
  if (!userId) {
    return (
      <div style={{ fontFamily: "Inter, sans-serif", maxWidth: 400, margin: "80px auto", padding: "0 20px", textAlign: "center" }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>🔒</div>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Sign in required</h1>
        <p style={{ color: "#5f6b7a", marginBottom: 24 }}>
          Please sign in to the Prospect In extension before purchasing credits. Your user ID is needed to deliver credits to your account.
        </p>
      </div>
    );
  }

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

      {loading ? (
        <p style={{ color: "#5f6b7a", fontSize: 14 }}>Redirecting to Stripe…</p>
      ) : (
        <>
          {/* Only show manual button if auto-redirect failed */}
          {error && (
            <button
              onClick={handleCheckout}
              style={{
                background: "#0a66c2", color: "#fff", border: "none",
                borderRadius: 999, padding: "12px 28px", fontSize: 14,
                fontWeight: 600, cursor: "pointer",
              }}
            >
              Try again
            </button>
          )}
        </>
      )}

      <p style={{ marginTop: 14, fontSize: 12, color: "#8895a7" }}>
        After payment, credits appear in the extension within seconds.
      </p>
    </div>
  );
}
