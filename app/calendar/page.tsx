import { createClient } from '@/lib/supabase/server';

export default async function CalendarPage() {
  const supabase = createClient();
  
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .order('starts_at', { ascending: true });

  if (error) {
    console.error('Failed to load events:', error);
  }

  // Separate upcoming and past events
  const now = new Date();
  const upcomingEvents = events?.filter((event: any) => new Date(event.starts_at) >= now) || [];
  const pastEvents = events?.filter((event: any) => new Date(event.starts_at) < now) || [];

  return (
    <div className="prose">
      <h1>Calendar & Events</h1>
      <p>Upcoming events, commemorations, and community gatherings.</p>
      
      {/* Upcoming Events */}
      <section style={{ marginBottom: 40 }}>
        <h2>Upcoming Events</h2>
        {upcomingEvents.length === 0 ? (
          <div style={{
            padding: 24,
            background: 'var(--panel)',
            border: '1px solid var(--line)',
            borderRadius: 8,
            textAlign: 'center'
          }}>
            <p>No upcoming events scheduled. Check back soon for updates.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {upcomingEvents.map((event: any) => (
              <div
                key={event.id}
                style={{
                  padding: 20,
                  background: 'var(--panel)',
                  border: '1px solid var(--line)',
                  borderRadius: 12,
                  borderLeft: '4px solid var(--brand)'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: 12 
                }}>
                  <h3 style={{ margin: 0, fontSize: 20 }}>{event.title}</h3>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: 4,
                    fontSize: 12,
                    fontWeight: 600,
                    background: '#264a26',
                    color: 'white'
                  }}>
                    UPCOMING
                  </span>
                </div>
                
                <div style={{ 
                  fontSize: 14, 
                  opacity: 0.8, 
                  marginBottom: 8,
                  display: 'flex',
                  gap: 20,
                  flexWrap: 'wrap'
                }}>
                  <div>
                    📅 {new Date(event.starts_at).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div>
                    🕐 {new Date(event.starts_at).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                    {event.ends_at && (
                      ` - ${new Date(event.ends_at).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit'
                      })}`
                    )}
                  </div>
                  {event.location && (
                    <div>📍 {event.location}</div>
                  )}
                </div>
                
                {event.body && (
                  <p style={{ 
                    margin: 0, 
                    fontSize: 16, 
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap'
                  }}>
                    {event.body}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section>
          <h2>Past Events</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {pastEvents.map((event: any) => (
              <div
                key={event.id}
                style={{
                  padding: 16,
                  background: 'var(--panel)',
                  border: '1px solid var(--line)',
                  borderRadius: 8,
                  opacity: 0.8
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: 8 
                }}>
                  <h4 style={{ margin: 0, fontSize: 16 }}>{event.title}</h4>
                  <span style={{ fontSize: 14, opacity: 0.7 }}>
                    {new Date(event.starts_at).toLocaleDateString()}
                  </span>
                </div>
                
                {event.location && (
                  <div style={{ fontSize: 14, opacity: 0.7 }}>
                    📍 {event.location}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
