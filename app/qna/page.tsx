import { createClient } from '@/lib/supabase/server';

export default async function QnAPage() {
  const supabase = createClient();
  
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('kind', 'qna')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Failed to load Q&A:', error);
  }

  return (
    <div className="prose">
      <h1>Questions & Answers</h1>
      <p>Frequently asked questions about Lou Gehrig and his legacy.</p>
      
      {!posts || posts.length === 0 ? (
        <div style={{
          padding: 24,
          background: 'var(--panel)',
          border: '1px solid var(--line)',
          borderRadius: 8,
          textAlign: 'center'
        }}>
          <p>Q&A content is being updated. Please check back soon.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 16 }}>
          {posts.map((post: any) => (
            <details
              key={post.id}
              style={{
                padding: 20,
                background: 'var(--panel)',
                border: '1px solid var(--line)',
                borderRadius: 12,
                cursor: 'pointer'
              }}
            >
              <summary style={{ 
                fontSize: 18, 
                fontWeight: 600, 
                marginBottom: 12,
                listStyle: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                {post.title}
                <span style={{ fontSize: 24, opacity: 0.5 }}>+</span>
              </summary>
              
              {post.body && (
                <div style={{ 
                  fontSize: 16, 
                  lineHeight: 1.6,
                  paddingTop: 12,
                  borderTop: '1px solid var(--line)',
                  whiteSpace: 'pre-wrap'
                }}>
                  {post.body}
                </div>
              )}
              
              <div style={{ 
                fontSize: 14, 
                opacity: 0.7, 
                marginTop: 12,
                paddingTop: 8,
                borderTop: '1px solid var(--line)'
              }}>
                Published {new Date(post.published_at).toLocaleDateString()}
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
