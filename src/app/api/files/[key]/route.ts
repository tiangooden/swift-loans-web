import { NextRequest, NextResponse } from 'next/server';
import { DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import s3Client from '@/app/shared/s3client';
import { DocumentsRepository } from '@/app/api/files/documents.repository';

export async function GET(req: NextRequest, { params }: { params: { key: string } }) {
  try {
    const { key } = params;
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    });
    const signed_url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL expires in 1 hour
    return NextResponse.json({ signed_url });
  } catch (error) {
    console.error('Error generating signed URL for download:', error);
    return NextResponse.json({ error: 'Failed to generate signed URL' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { key: string } }) {
  try {
    const { key } = await params;
    const documents = await DocumentsRepository.findMany({ where: { key } });
    await DocumentsRepository.delete({ id: documents[0].id });
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    });
    await s3Client.send(command);
    return NextResponse.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}