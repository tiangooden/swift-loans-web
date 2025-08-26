import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/shared/get-user';
import { EmploymentsRepository } from './employments.repository';

export async function GET(request: Request) {
    const user = await getCurrentUser();
    const employmentDetails = await EmploymentsRepository.find({
        where: {
            user_id: user.id,
        },
    });
    if (!employmentDetails || employmentDetails.length === 0) {

        return NextResponse.json({ message: 'Employment details not found' }, { status: 404 });
    }
    return NextResponse.json(employmentDetails[0]);
}

export async function PUT(request: Request) {
    const user = await getCurrentUser();
    const existingEmployment = await EmploymentsRepository.find({
        where: {
            user_id: user.id,
        },
    });
    let updatedEmployment;
    const body = await request.json();
    if (existingEmployment && existingEmployment.length) {
        updatedEmployment = await EmploymentsRepository.update({
            where: {
                user_id: user.id,
            },
            data: {
                employer_name: body.employer_name,
                employer_phone_number: body.employer_phone_number,
                job_title: body.job_title,
                date_of_employment: body.date_of_employment ? new Date(body.date_of_employment) : undefined,
                gross_salary: body.gross_salary,
                payday_day: body.payday_day,
                pay_cycle: body.pay_cycle,
                total_expenses_per_cycle: body.total_expenses_per_cycle,
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
            employer_name: body.employer_name,
            employer_phone_number: body.employer_phone_number,
            job_title: body.job_title,
            date_of_employment: body.date_of_employment ? new Date(body.date_of_employment) : undefined,
            gross_salary: body.gross_salary,
            payday_day: body.payday_day,
            pay_cycle: body.pay_cycle,
            total_expenses_per_cycle: body.total_expenses_per_cycle,
        });
    }
    return NextResponse.json(updatedEmployment);
}