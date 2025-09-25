'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/member`
        }
      });

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('Check your email for a magic link to sign in!');
      }
    } catch (error) {
      setMessage('An unexpected error occurred. Please try again.');
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="prose" style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1>Sign In</h1>
      <p>Enter your email to receive a magic link for sign in.</p>
      
      <form onSubmit={handleSignIn} style={{ marginTop: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: 8 }}>
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: 6,
              border: '1px solid var(--line)',
              background: 'var(--panel)',
              color: 'var(--ink)'
            }}
            placeholder="your@email.com"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="btn"
          style={{ marginTop: 8 }}
        >
          {isLoading ? 'Sending...' : 'Send Magic Link'}
        </button>
      </form>

      {message && (
        <div style={{ 
          marginTop: 16, 
          padding: 12, 
          borderRadius: 6, 
          background: 'var(--panel)', 
          border: '1px solid var(--line)' 
        }}>
          {message}
        </div>
      )}
    </div>
  );
}