'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: any, session: any) => {
        setUser(session?.user || null);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return <span style={{ opacity: 0.7 }}>Loading...</span>;
  }

  if (user) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 14, opacity: 0.9 }}>{user.email}</span>
        <button
          onClick={handleSignOut}
          style={{
            padding: '4px 8px',
            fontSize: 14,
            background: 'transparent',
            border: '1px solid var(--line)',
            borderRadius: 4,
            color: 'var(--ink)',
            cursor: 'pointer'
          }}
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <a href="/member/signin" style={{ fontSize: 14 }}>
      Sign In
    </a>
  );
}