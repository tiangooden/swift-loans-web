import { NextResponse } from 'next/server';
import persistSessionUserIfNotExists from '@/app/lib/getOrCreateSessionUserFromRepo';
import { ReferencesRepository } from '../references.repository';
import { referencesSchema } from '../schema';
import { withValidateBody } from '@/app/lib/withValidateBody';
import { CACHE_KEY } from '@/app/lib/constants';
import { withRedisCacheDel } from '@/app/lib/withRedisCacheDel';

export const PUT =
  withValidateBody(referencesSchema)
    (
      withRedisCacheDel(`${CACHE_KEY.references}`)
        (
          async ({ data }: { data: any }) => {
            try {
              const user = await persistSessionUserIfNotExists();
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
        )
    );

export const DELETE =
  withRedisCacheDel(`${CACHE_KEY.references}`)
    (
      async ({ params }: { params: { id: string } }) => {
        const { id } = await params;
        try {
          const user = await persistSessionUserIfNotExists();
          if (!user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
          }

          if (!id) {
            return NextResponse.json({ message: 'Reference ID is required' }, { status: 400 });
          }

          await ReferencesRepository.update({
            where: {
              id,
              user_id: user.id,
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
    );