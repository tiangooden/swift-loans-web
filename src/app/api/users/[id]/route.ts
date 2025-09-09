import { NextResponse } from 'next/server';
import { UsersRepository } from '@/app/api/users/users.repository';
import { withValidateBody } from '@/app/lib/withValidateBody';
import { CACHE_KEY } from '@/app/lib/constants';
import { withRedisCacheDel } from '@/app/lib/withRedisCacheDel';
import getOrCreateSessionUser from '@/app/lib/getOrCreateSessionUser';
import { updateUserSchema } from '../schema';

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
