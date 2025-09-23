export default function AdminDashboard() {
  return (
    <div className="prose">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the Lou Gehrig Fan Club admin panel. Use the sidebar to manage content and uploads.</p>
      
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        <a className="card" href="/admin/uploads">
          <span>Manage Uploads</span>
        </a>
        <a className="card" href="/admin/matchups">
          <span>Photo Matchups</span>
        </a>
        <a className="card" href="/admin/posts">
          <span>News & Q&A</span>
        </a>
        <a className="card" href="/admin/milestones">
          <span>Milestones</span>
        </a>
        <a className="card" href="/admin/charities">
          <span>Charities</span>
        </a>
        <a className="card" href="/admin/events">
          <span>Events</span>
        </a>
      </div>

      <div style={{ 
        marginTop: 32,
        padding: 16,
        background: 'var(--panel)',
        border: '1px solid var(--line)',
        borderRadius: 8
      }}>
        <h3>Quick Links</h3>
        <ul>
          <li><a href="/weekly">View Public Weekly Matchup</a></li>
          <li><a href="/member">View Member Area</a></li>
          <li><a href="/">View Public Homepage</a></li>
        </ul>
      </div>
    </div>
  );
}