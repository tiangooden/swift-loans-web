import { NextRequest, NextResponse } from 'next/server';
import { ApplicationsRepository } from './applications.repository';
import { UsersRepository } from '../users/users.repository';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { UnauthorizedError } from '@/app/shared/http-errors';
import { validateSchema } from '@/app/shared/validation';
import { withValidateBody } from '@/app/shared/withValidateBody';
import { createApplicationRequestSchema, createApplicationSchema } from './schema';
import { withRedisCacheAdd } from '@/app/shared/withRedisCacheAdd';
import { withRedisCacheDel } from '@/app/shared/withRedisCacheDel';
import { CACHE_KEY } from '@/app/shared/constants';

export const GET = (withRedisCacheAdd(60, `${CACHE_KEY.applications}`))(get);

async function get() {
    const session = await getServerSession(authOptions);
    if (!session) {
        throw new UnauthorizedError('No session found');
    }
    const { id, provider } = session.user as any;
    const user = await UsersRepository.findByProviderId(`${provider}|${id}`);

    const applications = await ApplicationsRepository.findMany({
        where: { user_id: user?.id, is_deleted: false },
        orderBy: { submitted_at: 'desc' },
    });
    return NextResponse.json(applications);
}

export const POST =
    withValidateBody(createApplicationRequestSchema)
        (
            withRedisCacheDel(`${CACHE_KEY.applications}`)
                (

                    async function post(request: NextRequest) {
                        const session = await getServerSession(authOptions);
                        if (!session) {
                            return NextResponse.json({ error: 'No session found' }, { status: 401 });
                        }
                        const { id, provider } = session.user as any;
                        const user = await UsersRepository.findByProviderId(`${provider}|${id}`, {
                            alias: true,
                            first_name: true,
                            middle_name: true,
                            last_name: true,
                            email: true,
                            dob: true,
                            phone_number: true,
                            trn: true,
                            street_address: true,
                            city: true,
                            country: true,
                            status: true,
                            social_medias: true,
                            employment: true,
                            references: true,
                            bank_account: true,
                            documents: true,
                        });
                        try {
                            validateSchema(user, createApplicationSchema);
                        } catch (e: any) {
                            return NextResponse.json(e.errors, { status: 400 });
                        }
                        const data = await request.json();;
                        const application = await ApplicationsRepository.create({
                            ...data,
                            user: { connect: { id: user?.id } },
                            details: JSON.stringify(user)
                        });
                        return NextResponse.json(application, { status: 201 });
                    }
                )
        );
