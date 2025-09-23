import { createClient } from '@/lib/supabase/server';

export default async function PostsPage() {
  const supabase = createClient();
  
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Failed to load posts:', error);
  }

  return (
    <div className="prose">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>News & Q&A Posts</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" style={{ fontSize: 14, padding: '6px 12px' }}>
            + News Post
          </button>
          <button className="btn" style={{ fontSize: 14, padding: '6px 12px' }}>
            + Q&A Post
          </button>
        </div>
      </div>
      
      <p>Manage news articles and Q&A content for the public site.</p>

      {!posts || posts.length === 0 ? (
        <div style={{
          padding: 24,
          background: 'var(--panel)',
          border: '1px solid var(--line)',
          borderRadius: 8,
          textAlign: 'center'
        }}>
          <p>No posts yet. Create your first post!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                padding: 16,
                background: 'var(--panel)',
                border: '1px solid var(--line)',
                borderRadius: 8,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: 4,
                    fontSize: 12,
                    fontWeight: 600,
                    background: post.kind === 'news' ? '#264a26' : '#3d3d26',
                    color: 'white'
                  }}>
                    {post.kind?.toUpperCase()}
                  </span>
                  <span style={{ fontSize: 14, opacity: 0.7 }}>
                    {new Date(post.published_at).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>{post.title}</h3>
                {post.body && (
                  <p style={{ 
                    margin: 0, 
                    fontSize: 14, 
                    opacity: 0.8,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {post.body}
                  </p>
                )}
              </div>
              
              <div style={{ display: 'flex', gap: 8, marginLeft: 16 }}>
                <button style={{
                  padding: '4px 8px',
                  fontSize: 12,
                  background: 'transparent',
                  color: 'var(--ink)',
                  border: '1px solid var(--line)',
                  borderRadius: 4,
                  cursor: 'pointer'
                }}>
                  Edit
                </button>
                <button style={{
                  padding: '4px 8px',
                  fontSize: 12,
                  background: '#4a2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer'
                }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}