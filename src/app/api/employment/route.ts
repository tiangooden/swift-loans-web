import { NextResponse } from 'next/server';
import { EmploymentDetailsRepository as EmploymentRepository } from '@/app/employment/employments.repository';
import getCurrentUser from '@/app/shared/get-user';

export async function GET(request: Request) {
    const user = await getCurrentUser();
    const employmentDetails = await EmploymentRepository.find({
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
    const existingEmployment = await EmploymentRepository.find({
        where: {
            user_id: user.id,
        },
    });
    let updatedEmployment;
    const body = await request.json();
    if (existingEmployment && existingEmployment.length) {
        updatedEmployment = await EmploymentRepository.update({
            where: {
                user_id: user.id,
            },
            data: {
                employer_name: body.employer_name,
                job_title: body.job_title,
                monthly_income: body.monthly_income,
                payday_day: body.payday_day,
                updated_at: new Date(),
            },
        });
    } else {
        updatedEmployment = await EmploymentRepository.create({
            user: {
                connect: {
                    id: user.id,
                }
            },
            employer_name: body.employer_name,
            job_title: body.job_title,
            monthly_income: body.monthly_income,
            payday_day: body.payday_day,
        });
    }
    return NextResponse.json(updatedEmployment);
}