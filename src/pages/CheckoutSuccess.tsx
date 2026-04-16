// src/pages/CheckoutSuccess.tsx
export default function CheckoutSuccess() {
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
      <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Payment successful!</h1>
      <p style={{ color: "#5f6b7a", marginBottom: 24 }}>
        Your credits will appear in the extension within a few seconds. You can close this tab.
      </p>
      <p style={{ fontSize: 12, color: "#8895a7" }}>
        If credits don't appear, try clicking "Sign out" and signing back in.
      </p>
    </div>
  );
}
