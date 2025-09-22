export default function Header() {
  return (
    <header className="site-header">
      <div className="container bar">
        <a href="/" className="logo">Lou Gehrig Fan Club</a>
        <nav className="nav">
          <a href="/member">Join</a>
          <a href="/charities">Charities</a>
          <a href="/milestones">Milestones</a>
          <a href="/qna">Q&A</a>
          <a href="/news">News</a>
          <a href="/calendar">Calendar</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </nav>
      </div>
    </header>
  );
}
