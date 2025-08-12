import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { UsersRepository } from '@/app/repository/users.repository';
import { EmploymentDetailsRepository } from '@/app/repository/employment_details.repository';

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const { id, provider } = (session as any).user;
    const user = await UsersRepository.findByProviderId(`${provider}|${id}`);
    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    const employmentDetails = await EmploymentDetailsRepository.find({
        where: {
            user_id: user.id,
        },
    });
    if (!employmentDetails) {
        return NextResponse.json({ message: 'Employment details not found' }, { status: 404 });
    }
    return NextResponse.json(employmentDetails[0]);
}

export async function PUT(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized - No session found' }, { status: 401 });
    }
    const { id, provider } = session.user as any;
    const user = await UsersRepository.findByProviderId(`${provider}|${id}`);
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const existingEmployment = await EmploymentDetailsRepository.find({
        where: {
            user_id: user.id,
        },
    });
    let updatedEmployment;
    const body = await request.json();
    if (existingEmployment) {
        updatedEmployment = await EmploymentDetailsRepository.update({
            where: {
                user_id: user.id,
            },
            data: {
                employer_name: body.employer_name,
                job_title: body.job_title,
                employment_type: body.employment_type,
                monthly_income: body.monthly_income,
                payday_day: body.payday_day,
                updated_at: new Date(),
            },
        });
    } else {
        updatedEmployment = await EmploymentDetailsRepository.create({
            users: {
                connect: {
                    id: user.id,
                },
            },
            employer_name: body.employer_name,
            job_title: body.job_title,
            employment_type: body.employment_type,
            monthly_income: body.monthly_income,
            payday_day: body.payday_day,
        });
    }
    return NextResponse.json(updatedEmployment);
}