export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #eee", padding: "16px 24px", color: "#666" }}>
      <small>&copy; {new Date().getFullYear()} ironhorse</small>
    </footer>
  );
}
