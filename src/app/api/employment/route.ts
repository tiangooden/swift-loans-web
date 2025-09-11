import { NextResponse } from 'next/server';
import getOrCreateSessionUser from '@/app/lib/getOrCreateSessionUser';
import { CACHE_TIME } from '@/app/lib/constants';
import { withRedisCacheAdd } from '@/app/lib/withRedisCacheAdd';
import { withRedisCacheDel } from '@/app/lib/withRedisCacheDel';
import { withValidateBody } from '@/app/lib/withValidateBody';
import { EmploymentsRepository } from './employments.repository';
import { employmentsSchema } from './schema';

export const GET =
    withRedisCacheAdd(CACHE_TIME.GENERAL, 'employment')
        (
            async () => {
                const user = await getOrCreateSessionUser();
                const employmentDetails = await EmploymentsRepository.find({
                    where: {
                        user_id: user.id,
                    },
                });
                return NextResponse.json(employmentDetails[0] || {});
            }
        );

export const POST =
    withValidateBody(employmentsSchema)
        (
            withRedisCacheDel('employment')
                (
                    async ({ data }: { data: any }) => {
                        const user = await getOrCreateSessionUser();
                        const newEmployment = await EmploymentsRepository.create({
                            user: {
                                connect: {
                                    id: user.id,
                                }
                            },
                            employer_name: data.employer_name,
                            employer_phone_number: data.employer_phone_number,
                            job_title: data.job_title,
                            date_of_employment: data.date_of_employment ? new Date(data.date_of_employment) : undefined,
                            gross_salary: data.gross_salary,
                            payday_day: data.payday_day,
                            pay_cycle: data.pay_cycle,
                            total_expenses_per_cycle: data.total_expenses_per_cycle,
                        });
                        return NextResponse.json(newEmployment);
                    }
                )
        );