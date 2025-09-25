import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const supabase = createClient();
  
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/member/signin');
  }

  return (
    <div className="prose">
      <h1>Profile</h1>
      <p>Welcome to your profile page!</p>
      
      <div style={{ 
        padding: 16, 
        background: 'var(--panel)', 
        border: '1px solid var(--line)', 
        borderRadius: 8 
      }}>
        <h3>Account Information</h3>
        <p><strong>Email:</strong> {session.user.email}</p>
        <p><strong>User ID:</strong> {session.user.id}</p>
        <p><strong>Last Sign In:</strong> {new Date(session.user.last_sign_in_at || '').toLocaleString()}</p>
      </div>

      <div style={{ marginTop: 24 }}>
        <a href="/member" className="btn">← Back to Member Home</a>
      </div>
    </div>
  );
}