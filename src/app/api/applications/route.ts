import { NextResponse } from 'next/server';
import { ApplicationsRepository } from './applications.repository';
import { UsersRepository } from '../users/users.repository';
import { validateSchema } from '@/app/lib/validation';
import { withValidateBody } from '@/app/lib/withValidateBody';
import { createApplicationRequestSchema, createApplicationSchema } from './schema';
import { withRedisCacheAdd } from '@/app/lib/withRedisCacheAdd';
import { withRedisCacheDel } from '@/app/lib/withRedisCacheDel';
import { CACHE_KEY } from '@/app/lib/constants';
import getSessionUser from '@/app/lib/getSessionUser';

export const GET =
    withRedisCacheAdd(60, `${CACHE_KEY.applications}`)
        (
            async () => {
                const user = await getSessionUser();
                const applications = await ApplicationsRepository.findMany({
                    where: { user_id: user?.id, is_deleted: false },
                    orderBy: { submitted_at: 'desc' },
                });
                return NextResponse.json(applications);
            }
        );

export const POST =
    withValidateBody(createApplicationRequestSchema)
        (
            withRedisCacheDel(`${CACHE_KEY.applications}`)
                (

                    async function post({ data }) {
                        const { id, provider } = await getSessionUser();
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
                        const application = await ApplicationsRepository.create({
                            ...data,
                            user: { connect: { id: user?.id } },
                            details: JSON.stringify(user)
                        });
                        return NextResponse.json(application, { status: 201 });
                    }
                )
        );
