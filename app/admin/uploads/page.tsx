'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Upload {
  id: string;
  key: string;
  url: string;
  width?: number;
  height?: number;
  created_at: string;
}

export default function UploadsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [message, setMessage] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };

  const getImageDimensions = (file: File): Promise<{ width: number; height: number } | null> => {
    return new Promise((resolve) => {
      if (!file.type.startsWith('image/')) {
        resolve(null);
        return;
      }

      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = () => resolve(null);
      img.src = URL.createObjectURL(file);
    });
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setMessage('');

    try {
      // Step 1: Get presigned URL
      const presignResponse = await fetch('/api/admin/b2/presign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type
        })
      });

      if (!presignResponse.ok) {
        const error = await presignResponse.json();
        throw new Error(error.error || 'Failed to get presigned URL');
      }

      const { presignedUrl, publicUrl, key } = await presignResponse.json();

      // Step 2: Upload to B2
      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload to B2');
      }

      // Step 3: Get image dimensions if it's an image
      const dimensions = await getImageDimensions(file);

      // Step 4: Save to media_assets table
      const supabase = createClient();
      const { error: dbError } = await supabase
        .from('media_assets')
        .insert({
          key,
          url: publicUrl,
          width: dimensions?.width,
          height: dimensions?.height
        });

      if (dbError) {
        console.error('Database error:', dbError);
        setMessage('Upload succeeded but failed to save to database');
      } else {
        setMessage('Upload successful!');
        setFile(null);
        loadRecentUploads(); // Refresh the list
      }

    } catch (error) {
      console.error('Upload error:', error);
      setMessage(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  const loadRecentUploads = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('media_assets')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Failed to load uploads:', error);
      } else {
        setUploads(data || []);
      }
    } catch (error) {
      console.error('Failed to load uploads:', error);
    }
  };

  // Load recent uploads on component mount
  useEffect(() => {
    loadRecentUploads();
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setMessage('URL copied to clipboard!');
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <div className="prose">
      <h1>Upload Management</h1>
      <p>Upload files to B2 storage and manage media assets.</p>

      {/* Upload Form */}
      <div style={{
        padding: 24,
        background: 'var(--panel)',
        border: '1px solid var(--line)',
        borderRadius: 12,
        marginBottom: 24
      }}>
        <h3>Upload New File</h3>
        
        <div style={{ marginBottom: 16 }}>
          <input
            type="file"
            onChange={handleFileSelect}
            accept="image/*,video/*,.pdf,.doc,.docx"
            style={{
              width: '100%',
              padding: 8,
              borderRadius: 6,
              border: '1px solid var(--line)',
              background: 'var(--bg)',
              color: 'var(--ink)'
            }}
          />
        </div>

        {file && (
          <div style={{ marginBottom: 16, fontSize: 14, opacity: 0.8 }}>
            Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="btn"
          style={{ opacity: (!file || uploading) ? 0.5 : 1 }}
        >
          {uploading ? 'Uploading...' : 'Upload File'}
        </button>

        {message && (
          <div style={{
            marginTop: 16,
            padding: 12,
            borderRadius: 6,
            background: message.includes('failed') ? '#4a2626' : '#264a26',
            border: '1px solid var(--line)'
          }}>
            {message}
          </div>
        )}
      </div>

      {/* Recent Uploads */}
      <div>
        <h3>Recent Uploads</h3>
        {uploads.length === 0 ? (
          <p style={{ opacity: 0.7 }}>No uploads yet. Upload your first file above!</p>
        ) : (
          <div style={{ display: 'grid', gap: 12 }}>
            {uploads.map((upload) => (
              <div
                key={upload.id}
                style={{
                  padding: 16,
                  background: 'var(--panel)',
                  border: '1px solid var(--line)',
                  borderRadius: 8,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{upload.key}</div>
                  <div style={{ fontSize: 14, opacity: 0.7 }}>
                    {upload.width && upload.height && `${upload.width}x${upload.height} • `}
                    {new Date(upload.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => copyToClipboard(upload.url)}
                    style={{
                      padding: '4px 8px',
                      fontSize: 12,
                      background: 'var(--brand)',
                      color: '#06233a',
                      border: 'none',
                      borderRadius: 4,
                      cursor: 'pointer'
                    }}
                  >
                    Copy URL
                  </button>
                  <a
                    href={upload.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '4px 8px',
                      fontSize: 12,
                      background: 'transparent',
                      color: 'var(--ink)',
                      border: '1px solid var(--line)',
                      borderRadius: 4,
                      textDecoration: 'none'
                    }}
                  >
                    View
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}