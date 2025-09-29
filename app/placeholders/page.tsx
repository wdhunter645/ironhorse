export default function Placeholders() {
  const items = Array.from({ length: 12 }, (_, i) => `https://picsum.photos/seed/${i}/600/400`);
  return (
    <main style={{ padding: 32, fontFamily: "ui-sans-serif" }}>
      <h1>Placeholders</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {items.map((src, i) => (
          <img key={i} src={src} alt={`Placeholder ${i}`} style={{ width: "100%", height: "auto" }} />
        ))}
      </div>
    </main>
  );
}
