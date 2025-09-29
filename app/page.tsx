export default function Page() {
  return (
    <section style={{ display: "grid", gap: 12 }}>
      <h1 style={{ fontSize: 28, margin: 0 }}>ironhorse ✅</h1>
      <p style={{ margin: 0 }}>
        Build healthy. Env: {process.env.NEXT_PUBLIC_SITE_URL ?? "not set"}
      </p>
      <div style={{
        marginTop: 12,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 12
      }}>
        <a href="/placeholders" style={card}>View placeholders</a>
        <a href="/api/health" style={card}>API health</a>
      </div>
    </section>
  );
}

const card: React.CSSProperties = {
  display: "block",
  padding: 16,
  border: "1px solid #eee",
  borderRadius: 12,
  color: "#0f62fe",
  textDecoration: "none",
};
