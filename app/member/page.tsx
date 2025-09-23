import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function MemberPage() {
  const supabase = createClient();
  
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/member/signin');
  }

  return (
    <div className="prose">
      <h1>Member Area</h1>
      <p>Welcome back, {session.user.email}!</p>
      
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <a className="card" href="/member/profile">
          <span>Profile</span>
        </a>
        <a className="card" href="/weekly">
          <span>Weekly Matchup</span>
        </a>
        <a className="card" href="/charities">
          <span>Charities</span>
        </a>
      </div>
    </div>
  );
}
