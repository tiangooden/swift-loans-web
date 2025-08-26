import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/shared/get-user';
import { ReferencesRepository } from './references.repository';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const references = await ReferencesRepository.findMany({
      where: {
        user_id: user.id,
        is_deleted: false,
      },
    });

    return NextResponse.json(references);
  } catch (error) {
    console.error('Error fetching references:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { name, email, phone, relationship } = await request.json();

    if (!name || !phone || !relationship) {
      return NextResponse.json({ message: 'Name, phone, and relationship are required' }, { status: 400 });
    }

    const newReference = await ReferencesRepository.create({
      user: {
        connect: {
          id: user.id,
        }
      },
      name,
      email,
      phone,
      relationship,
    });

    return NextResponse.json(newReference, { status: 201 });
  } catch (error) {
    console.error('Error creating reference:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}