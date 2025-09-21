export function Footer() {
  return (
    <footer className="border-t py-10 mt-20 text-sm">
      <div className="container mx-auto px-4 text-center text-slate-500">
        © {new Date().getFullYear()} Lou Gehrig Fan Club • A zero-profit initiative supporting ALS research.
        <div className="mt-2 space-x-4">
          <a href="/sitemap" className="hover:text-blue-600">Sitemap</a>
          <a href="/privacy" className="hover:text-blue-600">Privacy</a>
          <a href="/terms" className="hover:text-blue-600">Terms</a>
        </div>
      </div>
    </footer>
  );
}
