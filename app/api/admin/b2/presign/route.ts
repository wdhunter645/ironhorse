import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    // Check admin auth
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adminEmails = process.env.ADMIN_EMAILS || '';
    const adminEmailList = adminEmails.split(',').map(email => email.trim().toLowerCase());
    const userEmail = session.user?.email?.toLowerCase();

    if (!userEmail || !adminEmailList.includes(userEmail)) {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Check required B2 environment variables
    const requiredEnvVars = ['B2_KEY_ID', 'B2_APP_KEY', 'B2_BUCKET', 'B2_ENDPOINT', 'PUBLIC_B2_BASE_URL'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.log('Missing B2 environment variables:', missingVars);
      return Response.json({ 
        error: 'B2 configuration incomplete', 
        missing: missingVars 
      }, { status: 500 });
    }

    const { fileName, contentType } = await request.json();

    if (!fileName || !contentType) {
      return Response.json({ error: 'fileName and contentType required' }, { status: 400 });
    }

    // Generate unique key
    const timestamp = Date.now();
    const key = `uploads/${timestamp}-${fileName}`;

    // Initialize S3-compatible client for B2
    const s3Client = new S3Client({
      endpoint: process.env.B2_ENDPOINT,
      region: 'us-east-1', // B2 uses this as default
      credentials: {
        accessKeyId: process.env.B2_KEY_ID!,
        secretAccessKey: process.env.B2_APP_KEY!,
      },
    });

    // Create presigned PUT URL
    const command = new PutObjectCommand({
      Bucket: process.env.B2_BUCKET,
      Key: key,
      ContentType: contentType,
    });

    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour
    const publicUrl = `${process.env.PUBLIC_B2_BASE_URL}/${key}`;

    return Response.json({
      presignedUrl,
      publicUrl,
      key
    });

  } catch (error) {
    console.error('Presign error:', error);
    return Response.json({ error: 'Failed to generate presigned URL' }, { status: 500 });
  }
}