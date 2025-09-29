import AuthButton from "./AuthButton";

export default function Nav() {
  return (
    <header className="site-header">
      <div className="container bar">
        <a href="/" className="logo">ironhorse</a>
        <nav className="nav">
          <a href="/weekly">Weekly</a>
          <a href="/member">Member</a>
          <a href="/charities">Charities</a>
          <a href="/milestones">Milestones</a>
          <a href="/qna">Q&amp;A</a>
          <a href="/news">News</a>
          <a href="/calendar">Calendar</a>
          <a href="/admin">Admin</a>
          <AuthButton />
        </nav>
      </div>
    </header>
  );
}