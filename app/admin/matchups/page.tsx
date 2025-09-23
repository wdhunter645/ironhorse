import { createClient } from '@/lib/supabase/server';

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
  created_at: string;
  photo_a: Photo | null;
  photo_b: Photo | null;
}

export default async function MatchupsPage() {
  const supabase = createClient();
  
  // Get matchups with photo details
  const { data: matchups, error } = await supabase
    .from('matchups')
    .select(`
      id,
      starts_at,
      ends_at,
      status,
      created_at,
      photo_a(id, title, url),
      photo_b(id, title, url)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to load matchups:', error);
  }

  const typedMatchups = matchups as Matchup[] | null;

  return (
    <div className="prose">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Matchups</h1>
        <a href="/admin/matchups/new" className="btn">Create New Matchup</a>
      </div>
      
      <p>Manage weekly photo matchups and view voting results.</p>

      {!typedMatchups || typedMatchups.length === 0 ? (
        <div style={{
          padding: 24,
          background: 'var(--panel)',
          border: '1px solid var(--line)',
          borderRadius: 8,
          textAlign: 'center'
        }}>
          <p>No matchups yet. Create your first matchup!</p>
          <a href="/admin/matchups/new" className="btn">Create Matchup</a>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 16 }}>
          {typedMatchups.map((matchup) => (
            <div
              key={matchup.id}
              style={{
                padding: 20,
                background: 'var(--panel)',
                border: '1px solid var(--line)',
                borderRadius: 12
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontSize: 12,
                      fontWeight: 600,
                      background: matchup.status === 'active' ? '#264a26' : 
                                 matchup.status === 'closed' ? '#4a2626' : '#3d3d26',
                      color: 'white'
                    }}>
                      {matchup.status?.toUpperCase()}
                    </span>
                    <span style={{ fontSize: 14, opacity: 0.7 }}>
                      {new Date(matchup.starts_at).toLocaleDateString()} - {new Date(matchup.ends_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 600, marginBottom: 8 }}>Photo A</div>
                      {matchup.photo_a ? (
                        <div>
                          <img 
                            src={matchup.photo_a.url} 
                            alt={matchup.photo_a.title || 'Photo A'}
                            style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 6 }}
                          />
                          <div style={{ fontSize: 12, marginTop: 4, opacity: 0.7 }}>
                            {matchup.photo_a.title || 'Untitled'}
                          </div>
                        </div>
                      ) : (
                        <div style={{ 
                          width: 120, 
                          height: 80, 
                          background: 'var(--line)', 
                          borderRadius: 6,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 12,
                          opacity: 0.5
                        }}>
                          No Photo
                        </div>
                      )}
                    </div>

                    <div style={{ alignSelf: 'center', fontSize: 20, fontWeight: 600 }}>VS</div>

                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 600, marginBottom: 8 }}>Photo B</div>
                      {matchup.photo_b ? (
                        <div>
                          <img 
                            src={matchup.photo_b.url} 
                            alt={matchup.photo_b.title || 'Photo B'}
                            style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 6 }}
                          />
                          <div style={{ fontSize: 12, marginTop: 4, opacity: 0.7 }}>
                            {matchup.photo_b.title || 'Untitled'}
                          </div>
                        </div>
                      ) : (
                        <div style={{ 
                          width: 120, 
                          height: 80, 
                          background: 'var(--line)', 
                          borderRadius: 6,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 12,
                          opacity: 0.5
                        }}>
                          No Photo
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <a
                    href={`/admin/matchups/${matchup.id}`}
                    style={{
                      padding: '6px 12px',
                      fontSize: 12,
                      background: 'var(--brand)',
                      color: '#06233a',
                      borderRadius: 4,
                      textDecoration: 'none'
                    }}
                  >
                    Edit & Results
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}