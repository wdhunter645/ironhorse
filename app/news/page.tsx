import { createClient } from '@/lib/supabase/server';

export default async function NewsPage() {
  const supabase = createClient();
  
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('kind', 'news')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Failed to load news:', error);
  }

  return (
    <div className="prose">
      <h1>News</h1>
      <p>Latest news and updates about Lou Gehrig and ALS research.</p>
      
      {!posts || posts.length === 0 ? (
        <div style={{
          padding: 24,
          background: 'var(--panel)',
          border: '1px solid var(--line)',
          borderRadius: 8,
          textAlign: 'center'
        }}>
          <p>News articles are being updated. Please check back soon.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 20 }}>
          {posts.map((post) => (
            <article
              key={post.id}
              style={{
                padding: 24,
                background: 'var(--panel)',
                border: '1px solid var(--line)',
                borderRadius: 12
              }}
            >
              <div style={{ 
                fontSize: 14, 
                opacity: 0.7, 
                marginBottom: 8 
              }}>
                {new Date(post.published_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              
              <h2 style={{ margin: '0 0 16px', fontSize: 24 }}>{post.title}</h2>
              
              {post.body && (
                <div style={{ 
                  fontSize: 16, 
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap'
                }}>
                  {post.body}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
