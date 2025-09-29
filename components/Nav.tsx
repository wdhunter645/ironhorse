export default function Nav() {
  const link = (href: string, label: string) => (
    <a href={href} style={{ color: "#0f62fe", textDecoration: "none", marginRight: 16 }}>{label}</a>
  );
  return (
    <header style={{ borderBottom: "1px solid #eee", padding: "16px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <strong style={{ fontSize: 18 }}>ironhorse</strong>
        <nav>
          {link("/", "Home")}
          {link("/placeholders", "Placeholders")}
          {link("/api/health", "Health")}
        </nav>
      </div>
    </header>
  );
}
