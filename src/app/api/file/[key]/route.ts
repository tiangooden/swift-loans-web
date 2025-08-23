import { NextRequest, NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export async function GET(req: NextRequest, { params }: { params: { key: string } }) {
  try {
    const { key } = await params;
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    });
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL expires in 1 hour
    return NextResponse.json({ signedUrl });
  } catch (error) {
    console.error('Error generating signed URL for download:', error);
    return NextResponse.json({ error: 'Failed to generate signed URL' }, { status: 500 });
  }
}