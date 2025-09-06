import { NextResponse } from 'next/server';
import { UsersRepository } from '@/app/api/users/users.repository';
import { updateUserSchema } from './schema';
import { withValidateBody } from '@/app/lib/withValidateBody';
import { withRedisCacheAdd } from '@/app/lib/withRedisCacheAdd';
import { CACHE_KEY, CACHE_TIME } from '@/app/lib/constants';
import { withRedisCacheDel } from '@/app/lib/withRedisCacheDel';
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

export const PUT =
    withValidateBody(updateUserSchema)
        (
            withRedisCacheDel(`${CACHE_KEY.user}`)
                (
                    async ({ data }: { data: any }) => {
                        const user = await getOrCreateSessionUser();
                        const updatedUser = await UsersRepository.update({
                            where: { id: user.id },
                            data: { ...data, dob: new Date(data.dob), updated_at: new Date() }
                        });
                        if (!updatedUser) {
                            return NextResponse.json({ error: 'User not found' }, { status: 404 });
                        }
                        return NextResponse.json(updatedUser);
                    }
                )
        );