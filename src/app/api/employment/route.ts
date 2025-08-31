import { NextRequest, NextResponse } from 'next/server';
import getCurrentUser from '@/app/shared/get-user';
import { EmploymentsRepository } from './employments.repository';
import { withValidateBody } from '@/app/shared/withValidateBody';
import { employmentsSchema } from './schema';

export async function GET(request: Request) {
    const user = await getCurrentUser();
    const employmentDetails = await EmploymentsRepository.find({
        where: {
            user_id: user.id,
        },
    });
    return NextResponse.json(employmentDetails[0] || {});
}

export const PUT =
    withValidateBody(employmentsSchema)
        (
            async (request: NextRequest, { data }: { data: any }) => {
                const user = await getCurrentUser();
                const existingEmployment = await EmploymentsRepository.find({
                    where: {
                        user_id: user.id,
                    },
                });
                let updatedEmployment;
                if (existingEmployment && existingEmployment.length) {
                    updatedEmployment = await EmploymentsRepository.update({
                        where: {
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
                } else {
                    updatedEmployment = await EmploymentsRepository.create({
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
                }
                return NextResponse.json(updatedEmployment);
            }
        );