import { NextResponse } from 'next/server';
import getOrCreateSessionUser from '@/app/lib/getOrCreateSessionUser';
import { EmploymentsRepository } from '../employments.repository';
import { withValidateBody } from '@/app/lib/withValidateBody';
import { employmentsSchema } from '../schema';
import { withRedisCacheDel } from '@/app/lib/withRedisCacheDel';

export const PUT =
    withValidateBody(employmentsSchema)
        (
            withRedisCacheDel('employment')
                (
                    async ({ data, params }: { data: any, params: { id: string } }) => {
                        const user = await getOrCreateSessionUser();
                        const updatedEmployment = await EmploymentsRepository.update({
                            where: {
                                id: params.id,
                                user_id: user.id,
                            },
                            data: {
                                employer_name: data.employer_name,
                                employer_phone_number: data.employer_phone_number,
                                job_title: data.job_title,
                                date_of_employment: data.date_of_employment ? new Date(data.date_of_employment) : undefined,
                                gross_salary: data.gross_salary,
                                payday_day: data.payday_day,
                                pay_cycle: data.pay_cycle,
                                total_expenses_per_cycle: data.total_expenses_per_cycle,
                                updated_at: new Date(),
                            },
                        });
                        return NextResponse.json(updatedEmployment);
                    }
                )
        );