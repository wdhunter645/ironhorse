'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Photo {
  id: string;
  title: string | null;
  url: string;
}

interface Matchup {
  id: string;
  starts_at: string;
  ends_at: string;
  status: string;
  photo_a: Photo | null;
  photo_b: Photo | null;
}

interface VoteCounts {
  A: number;
  B: number;
}

export default function WeeklyPage() {
  const [matchup, setMatchup] = useState<Matchup | null>(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [userVote, setUserVote] = useState<string | null>(null);
  const [counts, setCounts] = useState<VoteCounts>({ A: 0, B: 0 });
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadActiveMatchup();
  }, []);

  const loadActiveMatchup = async () => {
    try {
      const supabase = createClient();
      const now = new Date().toISOString();
      
      // Get active matchup
      const { data: matchups, error } = await supabase
        .from('matchups')
        .select(`
          id,
          starts_at,
          ends_at,
          status,
          photo_a(id, title, url),
          photo_b(id, title, url)
        `)
        .eq('status', 'active')
        .lte('starts_at', now)
        .gte('ends_at', now)
        .order('starts_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Failed to load matchup:', error);
        setLoading(false);
        return;
      }

      if (matchups && matchups.length > 0) {
        const rawMatchup = matchups[0];
        const activeMatchup: Matchup = {
          id: rawMatchup.id,
          starts_at: rawMatchup.starts_at,
          ends_at: rawMatchup.ends_at,
          status: rawMatchup.status,
          photo_a: Array.isArray(rawMatchup.photo_a) ? rawMatchup.photo_a[0] || null : rawMatchup.photo_a,
          photo_b: Array.isArray(rawMatchup.photo_b) ? rawMatchup.photo_b[0] || null : rawMatchup.photo_b
        };
        setMatchup(activeMatchup);
        
        // Load vote counts
        const { data: votes } = await supabase
          .from('votes')
          .select('choice')
          .eq('matchup_id', activeMatchup.id);

        if (votes) {
          const voteCounts = votes.reduce((acc: any, vote: any) => {
            const choice = vote.choice as 'A' | 'B';
            acc[choice] = (acc[choice] || 0) + 1;
            return acc;
          }, { A: 0, B: 0 });
          setCounts(voteCounts);
        }

        // Check if user already voted (from cookie)
        const cookieValue = document.cookie
          .split('; ')
          .find(row => row.startsWith(`voted_${activeMatchup.id}=`));
        
        if (cookieValue) {
          setUserVote(cookieValue.split('=')[1]);
        }
      }
    } catch (error) {
      console.error('Error loading matchup:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (choice: 'A' | 'B') => {
    if (!matchup || userVote || voting) return;

    setVoting(true);
    setMessage('');

    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          matchupId: matchup.id,
          choice
        })
      });

      const result = await response.json();

      if (response.ok) {
        setUserVote(choice);
        setCounts(result.counts);
        setMessage('Vote recorded! Thank you for participating.');
      } else {
        setMessage(result.error || 'Failed to vote');
      }
    } catch (error) {
      setMessage('Failed to submit vote. Please try again.');
      console.error('Vote error:', error);
    } finally {
      setVoting(false);
    }
  };

  if (loading) {
    return (
      <div className="prose">
        <h1>Weekly Photo Matchup</h1>
        <p>Loading this week&apos;s matchup...</p>
      </div>
    );
  }

  if (!matchup) {
    return (
      <div className="prose">
        <h1>Weekly Photo Matchup</h1>
        <div style={{ 
          background: 'var(--panel)', 
          border: '1px solid var(--line)', 
          borderRadius: 14, 
          padding: 24, 
          marginTop: 24,
          textAlign: 'center'
        }}>
          <h2>No Active Matchup</h2>
          <p>
            There&apos;s no active photo matchup right now. Check back soon for the next challenge featuring 
            Lou Gehrig memorabilia and baseball history!
          </p>
        </div>
      </div>
    );
  }

  const totalVotes = counts.A + counts.B;
  const percentA = totalVotes > 0 ? Math.round((counts.A / totalVotes) * 100) : 0;
  const percentB = totalVotes > 0 ? Math.round((counts.B / totalVotes) * 100) : 0;

  return (
    <div className="prose">
      <h1>Weekly Photo Matchup</h1>
      <p>Vote for your favorite photo in this week&apos;s Lou Gehrig matchup!</p>
      
      <div style={{ 
        background: 'var(--panel)', 
        border: '1px solid var(--line)', 
        borderRadius: 14, 
        padding: 24, 
        marginTop: 24 
      }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2>This Week&apos;s Matchup</h2>
          <p style={{ fontSize: 14, opacity: 0.8 }}>
            Voting ends: {new Date(matchup.ends_at).toLocaleDateString()}
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr auto 1fr', 
          gap: 24, 
          alignItems: 'center',
          marginBottom: 24
        }}>
          {/* Photo A */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: 16 }}>
              <strong>Photo A</strong>
              {matchup.photo_a?.title && (
                <div style={{ fontSize: 14, opacity: 0.7, marginTop: 4 }}>
                  {matchup.photo_a.title}
                </div>
              )}
            </div>
            
            {matchup.photo_a ? (
              <img 
                src={matchup.photo_a.url} 
                alt={matchup.photo_a.title || 'Photo A'}
                style={{ 
                  width: '100%', 
                  maxWidth: 300, 
                  height: 200, 
                  objectFit: 'cover', 
                  borderRadius: 8,
                  border: userVote === 'A' ? '3px solid var(--brand)' : '1px solid var(--line)'
                }}
              />
            ) : (
              <div style={{ 
                width: '100%', 
                maxWidth: 300, 
                height: 200, 
                background: 'var(--line)', 
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.5
              }}>
                No Photo
              </div>
            )}

            {!userVote && (
              <button
                onClick={() => handleVote('A')}
                disabled={voting}
                className="btn"
                style={{ 
                  marginTop: 16, 
                  width: '100%', 
                  maxWidth: 200,
                  opacity: voting ? 0.5 : 1 
                }}
              >
                {voting ? 'Voting...' : 'Vote for A'}
              </button>
            )}

            {userVote && (
              <div style={{ marginTop: 16 }}>
                <div style={{ 
                  fontSize: 14, 
                  fontWeight: 600,
                  color: userVote === 'A' ? 'var(--brand)' : 'var(--muted)'
                }}>
                  {counts.A} votes ({percentA}%)
                  {userVote === 'A' && ' - Your choice!'}
                </div>
                <div style={{ 
                  width: '100%', 
                  maxWidth: 200, 
                  height: 8, 
                  background: 'var(--line)', 
                  borderRadius: 4, 
                  overflow: 'hidden',
                  margin: '8px auto 0'
                }}>
                  <div style={{ 
                    width: `${percentA}%`, 
                    height: '100%', 
                    background: userVote === 'A' ? 'var(--brand)' : 'var(--muted)',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
            )}
          </div>

          {/* VS */}
          <div style={{ 
            fontSize: 24, 
            fontWeight: 600, 
            color: 'var(--brand)',
            textAlign: 'center'
          }}>
            VS
          </div>

          {/* Photo B */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: 16 }}>
              <strong>Photo B</strong>
              {matchup.photo_b?.title && (
                <div style={{ fontSize: 14, opacity: 0.7, marginTop: 4 }}>
                  {matchup.photo_b.title}
                </div>
              )}
            </div>
            
            {matchup.photo_b ? (
              <img 
                src={matchup.photo_b.url} 
                alt={matchup.photo_b.title || 'Photo B'}
                style={{ 
                  width: '100%', 
                  maxWidth: 300, 
                  height: 200, 
                  objectFit: 'cover', 
                  borderRadius: 8,
                  border: userVote === 'B' ? '3px solid var(--brand)' : '1px solid var(--line)'
                }}
              />
            ) : (
              <div style={{ 
                width: '100%', 
                maxWidth: 300, 
                height: 200, 
                background: 'var(--line)', 
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.5
              }}>
                No Photo
              </div>
            )}

            {!userVote && (
              <button
                onClick={() => handleVote('B')}
                disabled={voting}
                className="btn"
                style={{ 
                  marginTop: 16, 
                  width: '100%', 
                  maxWidth: 200,
                  opacity: voting ? 0.5 : 1 
                }}
              >
                {voting ? 'Voting...' : 'Vote for B'}
              </button>
            )}

            {userVote && (
              <div style={{ marginTop: 16 }}>
                <div style={{ 
                  fontSize: 14, 
                  fontWeight: 600,
                  color: userVote === 'B' ? 'var(--brand)' : 'var(--muted)'
                }}>
                  {counts.B} votes ({percentB}%)
                  {userVote === 'B' && ' - Your choice!'}
                </div>
                <div style={{ 
                  width: '100%', 
                  maxWidth: 200, 
                  height: 8, 
                  background: 'var(--line)', 
                  borderRadius: 4, 
                  overflow: 'hidden',
                  margin: '8px auto 0'
                }}>
                  <div style={{ 
                    width: `${percentB}%`, 
                    height: '100%', 
                    background: userVote === 'B' ? 'var(--brand)' : 'var(--muted)',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {message && (
          <div style={{ 
            padding: 12, 
            borderRadius: 6, 
            background: message.includes('recorded') ? '#264a26' : '#4a2626',
            border: '1px solid var(--line)',
            textAlign: 'center',
            fontSize: 14
          }}>
            {message}
          </div>
        )}

        {userVote && (
          <div style={{ 
            textAlign: 'center', 
            marginTop: 16, 
            fontSize: 14, 
            opacity: 0.8 
          }}>
            Total votes: {totalVotes}
          </div>
        )}
      </div>
    </div>
  );
}