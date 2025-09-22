import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lou Gehrig Fan Club",
  description: "Phase 3/4 styled shell",
};

const GLOBAL_CSS = `
:root{
  --bg:#0b0c10; --panel:#0f1116; --ink:#e7e9ee; --muted:#a6adbb; --brand:#4cc9f0; --line:#23262e;
}
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:var(--bg);color:var(--ink);font:16px/1.5 system-ui,Segoe UI,Roboto,Arial}
a{color:inherit;text-decoration:none}
.container{max-width:1100px;margin:0 auto;padding:0 24px}

/* header */
.site-header{position:sticky;top:0;background:rgba(15,17,22,.95);backdrop-filter:blur(8px);border-bottom:1px solid var(--line);z-index:20}
.site-header .bar{height:64px;display:flex;align-items:center;justify-content:space-between}
.logo{font-weight:700;letter-spacing:.4px}
.nav a{margin-left:18px;opacity:.9}
.nav a:hover{opacity:1}

/* hero */
.hero{position:relative;overflow:hidden;border-radius:16px;border:1px solid var(--line);background:var(--panel);margin:24px 0}
.hero-inner{position:relative;z-index:2;padding:48px 24px 72px;max-width:720px}
.hero h1{margin:0 0 8px;font-size:40px;line-height:1.1}
.hero p{margin:0 0 16px;color:var(--muted)}
.btn{display:inline-block;padding:10px 16px;background:var(--brand);color:#06233a;border-radius:10px;font-weight:700}
.hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.25;filter:grayscale(.05)}
@media(min-width:960px){.hero-inner{padding:72px 56px 96px}}

/* cards */
.grid{display:grid;gap:16px;margin:24px 0;grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}
.card{display:block;position:relative;border:1px solid var(--line);border-radius:14px;overflow:hidden;background:#14161b;transition:transform .12s ease, box-shadow .12s ease}
.card:hover{transform:translateY(-2px)}
.card img{display:block;width:100%;height:160px;object-fit:cover;filter:grayscale(.15) contrast(1.04)}
.card span{display:block;padding:12px 14px;font-weight:600}

/* footer */
.site-footer{border-top:1px solid var(--line);margin-top:36px}
.site-footer .inner{padding:16px 0;color:var(--muted);text-align:center}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} /></head>
      <body>
        <header className="site-header">
          <div className="container bar">
            <a href="/" className="logo">Lou Gehrig Fan Club</a>
            <nav className="nav">
              <a href="/member">Join</a>
              <a href="/charities">Charities</a>
              <a href="/milestones">Milestones</a>
              <a href="/qna">Q&amp;A</a>
              <a href="/news">News</a>
              <a href="/calendar">Calendar</a>
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
            </nav>
          </div>
        </header>

        <main className="container" style={{ paddingTop: 16, paddingBottom: 24 }}>
          {children}
        </main>

        <footer className="site-footer">
          <div className="container inner">
            © {new Date().getFullYear()} Lou Gehrig Fan Club • A zero-profit initiative supporting ALS research.
          </div>
        </footer>
      </body>
    </html>
  );
}
