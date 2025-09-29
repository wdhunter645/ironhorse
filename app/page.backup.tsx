export default function Home() {
  return (
    <>
      <section className="hero">
        <img src="/hero.jpg" alt="" className="hero-img" />
        <div className="hero-inner">
          <h1>Lou Gehrig Fan Club</h1>
          <p>Celebrate the Iron Horse with photos, stories, milestones, and community events.</p>
          <a className="btn" href="/member">Join the Club</a>
        </div>
      </section>

      <section className="grid">
        <a className="card" href="/weekly"><img src="/weekly.jpg" alt="" /><span>Weekly Photo Matchup</span></a>
        <a className="card" href="/member"><img src="/join.jpg" alt="" /><span>Fan Card + Join/Login</span></a>
        <a className="card" href="/charities"><img src="/charities.jpg" alt="" /><span>Donations & Charities</span></a>
        <a className="card" href="/milestones"><img src="/milestones.jpg" alt="" /><span>Milestones</span></a>
        <a className="card" href="/news"><img src="/news.jpg" alt="" /><span>News & Q&A</span></a>
        <a className="card" href="/calendar"><img src="/calendar.jpg" alt="" /><span>Unified Calendar</span></a>
      </section>
    </>
  );
}
