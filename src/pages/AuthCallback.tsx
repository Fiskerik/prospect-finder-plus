// src/pages/AuthCallback.tsx
// Supabase redirects here after Google OAuth / magic link
// We extract the tokens, store them, then close the tab (or show success)

import { useEffect, useState } from "react";

export default function AuthCallback() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace("#", ""));
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (!accessToken) {
      setStatus("error");
      return;
    }

    // Post a message to any open extension pages, or store in localStorage
    // so the extension can pick it up
    try {
      // Store tokens in localStorage — the extension's background can read this
      // via chrome.tabs.executeScript or by opening the page
      localStorage.setItem(
        "supabase_auth_tokens",
        JSON.stringify({ access_token: accessToken, refresh_token: refreshToken, ts: Date.now() }),
      );
      setStatus("success");
      // Auto-close after 2s
      setTimeout(() => window.close(), 2000);
    } catch {
      setStatus("error");
    }
  }, []);

  if (status === "loading") {
    return (
      <div style={{ fontFamily: "Inter, sans-serif", textAlign: "center", padding: "80px 20px" }}>
        <p style={{ color: "#5f6b7a" }}>Signing you in…</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div style={{ fontFamily: "Inter, sans-serif", textAlign: "center", padding: "80px 20px" }}>
        <div style={{ fontSize: 36 }}>⚠️</div>
        <h2 style={{ fontSize: 18, marginTop: 12 }}>Sign-in failed</h2>
        <p style={{ color: "#5f6b7a" }}>Please try again from the extension.</p>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Inter, sans-serif", textAlign: "center", padding: "80px 20px" }}>
      <div style={{ fontSize: 48 }}>✅</div>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 12 }}>Signed in!</h2>
      <p style={{ color: "#5f6b7a", marginTop: 8 }}>
        You can close this tab and return to the extension.
      </p>
    </div>
  );
}
