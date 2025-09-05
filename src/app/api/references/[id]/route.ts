import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/lib/get-user';
import { ReferencesRepository } from '../references.repository';
import { referencesSchema } from '../schema';
import { withValidateBody } from '@/app/lib/withValidateBody';

export async function GET({ params }: { params: { id: string } }) {
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
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export const PUT =
  withValidateBody(referencesSchema)
    (
      async ({ data }: { data: any }) => {
        try {
          const user = await getCurrentUser();
          if (!user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
          }
          const { id } = data;
          let updatedReference;
          try {
            updatedReference = await ReferencesRepository.update({
              where: {
                id,
                user_id: user.id,
              },
              data: { ...data, updated_at: new Date() }
            });
          } catch (e: any) {
          }
          return NextResponse.json(updatedReference);
        } catch (error) {
          return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
        }
      }
    );

export async function DELETE({ params }: { params: { id: string } }) {
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
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}