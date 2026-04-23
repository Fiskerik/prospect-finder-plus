// src/pages/CheckoutSuccess.tsx
import { useEffect, useState } from "react";

type Status =
  | { state: "loading" }
  | { state: "credited"; credits: number }
  | { state: "blocked_promo_reused" }
  | { state: "unknown" };

export default function CheckoutSuccess() {
  const [status, setStatus] = useState<Status>({ state: "loading" });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    if (!sessionId) {
      setStatus({ state: "unknown" });
      return;
    }

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 10; // ~20s of polling

    async function poll() {
      attempts += 1;
      try {
        const res = await fetch(`/api/session-status?session_id=${encodeURIComponent(sessionId!)}`);
        const data = await res.json();
        if (cancelled) return;

        if (data.status === "credited") {
          setStatus({ state: "credited", credits: data.credits });
          return;
        }
        if (data.status === "blocked_promo_reused") {
          setStatus({ state: "blocked_promo_reused" });
          return;
        }
        // pending — keep polling
        if (attempts < maxAttempts) {
          setTimeout(poll, 2000);
        } else {
          setStatus({ state: "unknown" });
        }
      } catch {
        if (attempts < maxAttempts && !cancelled) {
          setTimeout(poll, 2000);
        } else if (!cancelled) {
          setStatus({ state: "unknown" });
        }
      }
    }

    poll();
    return () => {
      cancelled = true;
    };
  }, []);

  const wrapStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    maxWidth: 440,
    margin: "80px auto",
    padding: "0 20px",
    textAlign: "center",
  };

  if (status.state === "loading") {
    return (
      <div style={wrapStyle}>
        <div style={{ fontSize: 36, marginBottom: 16 }}>⏳</div>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
          Confirming your purchase…
        </h1>
        <p style={{ color: "#5f6b7a" }}>This usually takes just a few seconds.</p>
      </div>
    );
  }

  if (status.state === "blocked_promo_reused") {
    return (
      <div style={wrapStyle}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: "#c0392b" }}>
          Promo code already used
        </h1>
        <p style={{ color: "#5f6b7a", marginBottom: 24 }}>
          You've already redeemed this promotion code on your account, so no new credits were added.
          You were not charged.
        </p>
        <p style={{ fontSize: 13, color: "#5f6b7a", marginBottom: 24 }}>
          Need more credits? You can purchase them at full price below.
        </p>
        <a
          href="/checkout"
          style={{
            display: "inline-block",
            background: "#0a66c2",
            color: "#fff",
            textDecoration: "none",
            borderRadius: 999,
            padding: "12px 28px",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Back to checkout
        </a>
      </div>
    );
  }

  if (status.state === "credited") {
    return (
      <div style={wrapStyle}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Payment successful!</h1>
        <p style={{ color: "#5f6b7a", marginBottom: 24 }}>
          {status.credits} credit{status.credits === 1 ? "" : "s"} added to your account. They'll
          appear in the extension within a few seconds. You can close this tab.
        </p>
        <p style={{ fontSize: 12, color: "#8895a7" }}>
          If credits don't appear, try clicking "Sign out" and signing back in.
        </p>
      </div>
    );
  }

  // unknown / fallback (webhook didn't record within ~20s)
  return (
    <div style={wrapStyle}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Payment received</h1>
      <p style={{ color: "#5f6b7a", marginBottom: 24 }}>
        We're still confirming your purchase. Credits should appear in the extension shortly. If
        they don't show up within a minute, sign out and back in.
      </p>
    </div>
  );
}
