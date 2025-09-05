import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/lib/get-user';
import { ReferencesRepository } from './references.repository';
import { referencesSchema } from './schema';
import { withValidateBody } from '@/app/lib/withValidateBody';

export async function GET() {
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
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export const POST =
  withValidateBody(referencesSchema)
    (
      async ({ data }: { data: any }) => {
        try {
          const user = await getCurrentUser();
          if (!user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
          }
          const { name, email, phone, relationship } = data;
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
          return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
        }
      }
    );