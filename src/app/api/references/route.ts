import { NextResponse } from 'next/server';
import getOrCreateSessionUser from '@/app/lib/getOrCreateSessionUser';
import { ReferencesRepository } from './references.repository';
import { referencesSchema } from './schema';
import { withValidateBody } from '@/app/lib/withValidateBody';
import { withRedisCacheAdd } from '@/app/lib/withRedisCacheAdd';
import { CACHE_TIME, CACHE_KEY } from '@/app/lib/constants';
import { withRedisCacheDel } from '@/app/lib/withRedisCacheDel';

export const GET =
  withRedisCacheAdd(CACHE_TIME.GENERAL, `${CACHE_KEY.references}`)
    (
      async () => {
        try {
          const user = await getOrCreateSessionUser();
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
    )

export const POST =
  withValidateBody(referencesSchema)
    (
      withRedisCacheDel(`${CACHE_KEY.references}`)
        (
          async ({ data }: { data: any }) => {
            try {
              const user = await getOrCreateSessionUser();
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
        )
    );