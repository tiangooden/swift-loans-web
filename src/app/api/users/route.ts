import { NextResponse } from 'next/server';
import { UsersRepository } from '@/app/api/users/users.repository';
import { createUserSchema } from './schema';
import { withValidateBody } from '@/app/lib/withValidateBody';
import { withRedisCacheAdd } from '@/app/lib/withRedisCacheAdd';
import { CACHE_KEY, CACHE_TIME } from '@/app/lib/constants';
import getOrCreateSessionUser from '@/app/lib/getOrCreateSessionUser';

export const GET =
    withRedisCacheAdd(CACHE_TIME.GENERAL, `${CACHE_KEY.user}`)
        (
            async () => {
                const user = await getOrCreateSessionUser();
                if (!user) {
                    return NextResponse.json({ error: 'User not found' }, { status: 404 });
                }
                return NextResponse.json(user);
            }
        );

export const POST =
    withValidateBody(createUserSchema)
        (
            withRedisCacheAdd(CACHE_TIME.GENERAL, `${CACHE_KEY.user}`)
                (
                    async ({ data }: { data: any }) => {
                        const newUser = await UsersRepository.create(data);
                        return NextResponse.json(newUser, { status: 201 });
                    }
                )
        );