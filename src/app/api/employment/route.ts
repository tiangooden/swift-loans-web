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
    const data = await request.json();
    if (existingEmployment && existingEmployment.length) {
        updatedEmployment = await EmploymentsRepository.update({
            where: {
                user_id: user.id,
            },
            data: {
                ...data,
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
            ...data,
        });
    }
    return NextResponse.json(updatedEmployment);
}