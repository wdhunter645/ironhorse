import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/uploads', label: 'Uploads' },
  { href: '/admin/matchups', label: 'Matchups' },
  { href: '/admin/posts', label: 'News/Q&A' },
  { href: '/admin/milestones', label: 'Milestones' },
  { href: '/admin/charities', label: 'Charities' },
  { href: '/admin/events', label: 'Events' },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/');
  }

  // Check admin emails
  const adminEmails = process.env.ADMIN_EMAILS || '';
  const adminEmailList = adminEmails.split(',').map(email => email.trim().toLowerCase());
  const userEmail = session.user?.email?.toLowerCase();

  if (!userEmail || !adminEmailList.includes(userEmail)) {
    redirect('/');
  }

  return (
    <div style={{ display: 'flex', gap: 24, minHeight: 'calc(100vh - 200px)' }}>
      {/* Sidebar */}
      <aside style={{
        width: 250,
        background: 'var(--panel)',
        border: '1px solid var(--line)',
        borderRadius: 12,
        padding: 20,
        height: 'fit-content',
        position: 'sticky',
        top: 80
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 18 }}>Admin Panel</h3>
        <nav>
          {sidebarLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              style={{
                display: 'block',
                padding: '8px 12px',
                margin: '4px 0',
                borderRadius: 6,
                background: 'transparent',
                border: '1px solid transparent',
                transition: 'all 0.15s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--line)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        
        <div style={{ 
          marginTop: 24, 
          paddingTop: 16, 
          borderTop: '1px solid var(--line)',
          fontSize: 14,
          opacity: 0.8
        }}>
          Signed in as:<br />
          <strong>{session.user.email}</strong>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  );
}