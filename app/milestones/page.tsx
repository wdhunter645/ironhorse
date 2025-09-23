import { createClient } from '@/lib/supabase/server';

export default async function MilestonesPage() {
  const supabase = createClient();
  
  const { data: milestones, error } = await supabase
    .from('milestones')
    .select('*')
    .order('happened_on', { ascending: false });

  if (error) {
    console.error('Failed to load milestones:', error);
  }

  return (
    <div className="prose">
      <h1>Lou Gehrig Milestones</h1>
      <p>Key moments and achievements in the life and career of the Iron Horse.</p>
      
      {!milestones || milestones.length === 0 ? (
        <div style={{
          padding: 24,
          background: 'var(--panel)',
          border: '1px solid var(--line)',
          borderRadius: 8,
          textAlign: 'center'
        }}>
          <p>Milestone information is being updated. Please check back soon.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 20 }}>
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              style={{
                padding: 20,
                background: 'var(--panel)',
                border: '1px solid var(--line)',
                borderRadius: 12,
                display: 'flex',
                gap: 20,
                alignItems: 'flex-start'
              }}
            >
              <div style={{ 
                minWidth: 120,
                textAlign: 'center',
                padding: 12,
                background: 'var(--bg)',
                borderRadius: 8
              }}>
                <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--brand)' }}>
                  {new Date(milestone.happened_on).toLocaleDateString('en-US', { 
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
                <div style={{ fontSize: 14, opacity: 0.8 }}>
                  {new Date(milestone.happened_on).getFullYear()}
                </div>
              </div>
              
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 12px', fontSize: 18 }}>{milestone.title}</h3>
                {milestone.body && (
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>
                    {milestone.body}
                  </p>
                )}
              </div>
              
              {milestone.image_url && (
                <div style={{ minWidth: 120 }}>
                  <img 
                    src={milestone.image_url} 
                    alt={milestone.title}
                    style={{ 
                      width: 120, 
                      height: 80, 
                      objectFit: 'cover', 
                      borderRadius: 6 
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
