export default function Home() {
  return (
    <main className="container">
      <section className="hero">
        <div className="hero-content">
          <h1>Lou Gehrig Fan Club</h1>
          <p>Celebrate the Iron Horse with photos, stories, milestones, and community events.</p>
          <a className="btn" href="/member">Join the Club</a>
        </div>
        <img className="hero-img" src="https://images.unsplash.com/photo-1521417531039-76a83fbf13fb?q=80&w=1600&auto=format&fit=crop" alt="" />
      </section>

      <section className="grid">
        <a className="card" href="/weekly"><img src="https://placehold.co/640x360" alt="" /><span>Weekly Photo Matchup</span></a>
        <a className="card" href="/member"><img src="https://placehold.co/640x360" alt="" /><span>Fan Card + Join/Login</span></a>
        <a className="card" href="/charities"><img src="https://placehold.co/640x360" alt="" /><span>Donations & Charities</span></a>
        <a className="card" href="/milestones"><img src="https://placehold.co/640x360" alt="" /><span>Milestones</span></a>
        <a className="card" href="/news"><img src="https://placehold.co/640x360" alt="" /><span>Q&A + News</span></a>
        <a className="card" href="/calendar"><img src="https://placehold.co/640x360" alt="" /><span>Unified Calendar</span></a>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} Lou Gehrig Fan Club • A zero-profit initiative supporting ALS research.
      </footer>

      <style jsx>{`
        :root{
          --bg:#0b0c10; --panel:#121316; --ink:#e7e9ee; --muted:#a6adbb; --brand:#4cc9f0; --line:#23262e;
        }
        .container{max-width:1100px;margin:0 auto;padding:24px;color:var(--ink)}
        .hero{position:relative;overflow:hidden;border-radius:16px;border:1px solid var(--line);background:#0f1116}
        .hero-content{position:relative;z-index:2;padding:48px 24px 72px;max-width:720px}
        .hero h1{margin:0 0 8px;font-size:40px;line-height:1.1}
        .hero p{margin:0 0 16px;color:var(--muted)}
        .btn{display:inline-block;padding:10px 16px;background:var(--brand);color:#06233a;border-radius:10px;font-weight:700}
        .hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.25;filter:grayscale(.1)}
        .grid{display:grid;gap:16px;margin:24px 0;grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}
        .card{display:block;position:relative;border:1px solid var(--line);border-radius:14px;overflow:hidden;background:#14161b}
        .card img{display:block;width:100%;height:160px;object-fit:cover;filter:grayscale(.2) contrast(1.05)}
        .card span{display:block;padding:12px 14px;font-weight:600}
        .footer{border-top:1px solid var(--line);margin-top:36px;padding:16px;color:var(--muted);text-align:center}
        @media(min-width:960px){.hero-content{padding:72px 56px 96px}}
      `}</style>
    </main>
  );
}
