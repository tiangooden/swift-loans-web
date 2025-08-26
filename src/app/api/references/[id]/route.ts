import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/shared/get-user';
import { ReferencesRepository } from '../references.repository';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const references = await ReferencesRepository.findMany({
      where: { id },
    });
    return NextResponse.json(references[0] || {});
  } catch (error) {
    console.error('Error fetching references:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    if (!id) {
      return NextResponse.json({ message: 'Reference ID is required' }, { status: 400 });
    }

    const updatedReference = await ReferencesRepository.update({
      where: {
        id,
        user_id: user.id, // Ensure user can only update their own references
      },
      data
    });

    return NextResponse.json(updatedReference);
  } catch (error) {
    console.error('Error updating reference:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ message: 'Reference ID is required' }, { status: 400 });
    }

    await ReferencesRepository.update({
      where: {
        id,
        user_id: user.id, // Ensure user can only delete their own references
      },
      data: {
        is_deleted: true,
        deleted_at: new Date(),
      },
    });

    return NextResponse.json({ message: 'Reference deleted successfully' });
  } catch (error) {
    console.error('Error deleting reference:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}