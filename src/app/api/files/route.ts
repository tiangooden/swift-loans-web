import { NextRequest, NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { Buffer } from 'buffer';
import s3Client from '@/app/lib/s3client';
import getCurrentUser from '@/app/lib/get-user';
import cuid from 'cuid';
import { DocumentsRepository } from './documents.repository';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const documents = await DocumentsRepository.findMany({ where: { user_id: user.id } });
    return NextResponse.json(documents);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const id = cuid();
    await Promise.all(files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: id,
        Body: buffer,
        ContentType: file.type,
      });
      await s3Client.send(command);
      await DocumentsRepository.create({
        key: id,
        name: file.name,
        type: file.type,
        size: file.size,
        user: {
          connect: {
            id: user.id
          }
        },
      });;
    }));
    return NextResponse.json({ key: id, });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
