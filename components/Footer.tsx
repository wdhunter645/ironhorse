export default function Footer() {
  return (
    <footer className="border-t text-sm text-gray-600">
      <div className="mx-auto max-w-5xl px-4 py-6">
        © {new Date().getFullYear()} Lou Gehrig Fan Club • A zero-profit initiative supporting ALS research.
      </div>
    </footer>
  );
}
