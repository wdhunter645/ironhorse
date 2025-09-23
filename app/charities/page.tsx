import { createClient } from '@/lib/supabase/server';

export default async function CharitiesPage() {
  const supabase = createClient();
  
  const { data: charities, error } = await supabase
    .from('charities')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to load charities:', error);
  }

  return (
    <div className="prose">
      <h1>Donations & Charities</h1>
      <p>Supporting ALS research and organizations that continue Lou Gehrig&apos;s legacy.</p>
      
      {!charities || charities.length === 0 ? (
        <div style={{
          padding: 24,
          background: 'var(--panel)',
          border: '1px solid var(--line)',
          borderRadius: 8,
          textAlign: 'center'
        }}>
          <p>Charity information is being updated. Please check back soon.</p>
        </div>
      ) : (
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {charities.map((charity) => (
            <div
              key={charity.id}
              style={{
                padding: 20,
                background: 'var(--panel)',
                border: '1px solid var(--line)',
                borderRadius: 12
              }}
            >
              <h3 style={{ margin: '0 0 12px', fontSize: 18 }}>{charity.name}</h3>
              {charity.blurb && (
                <p style={{ margin: '0 0 16px', fontSize: 14, opacity: 0.9 }}>
                  {charity.blurb}
                </p>
              )}
              {charity.url && (
                <a
                  href={charity.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ fontSize: 14 }}
                >
                  Learn More & Donate
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
