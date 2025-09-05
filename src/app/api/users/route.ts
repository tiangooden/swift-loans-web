import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UsersRepository } from '@/app/api/users/users.repository';
import { updateUserSchema } from './schema';
import { withValidateBody } from '@/app/shared/withValidateBody';
import { withRedisCacheAdd } from '@/app/shared/withRedisCacheAdd';
import { CACHE_KEY } from '@/app/shared/constants';
import { withRedisCacheDel } from '@/app/shared/withRedisCacheDel';

export const GET =
    withRedisCacheAdd(60, `${CACHE_KEY.user}`)
        (
            async function GET(request: NextRequest) {
                const session = await getServerSession(authOptions);
                if (!session) {
                    return NextResponse.json({ error: 'Unauthorized - No session found' }, { status: 401 });
                }
                const { id, provider } = session.user as any;

                const user = await UsersRepository.findByProviderId(`${provider}|${id}`);
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
                    async (request: NextRequest, { data }: { data: any }) => {
                        const session = await getServerSession(authOptions);
                        if (!session) {
                            return NextResponse.json({ error: 'Unauthorized - No session found' }, { status: 401 });
                        }
                        const { id, provider } = session.user as any;
                        const updatedUser = await UsersRepository.update({
                            where: { identity: `${provider}|${id}` },
                            data: { ...data, dob: new Date(data.dob), updated_at: new Date() }
                        });
                        if (!updatedUser) {
                            return NextResponse.json({ error: 'User not found' }, { status: 404 });
                        }
                        return NextResponse.json(updatedUser);
                    }
                )
        );