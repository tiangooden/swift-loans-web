import { NextResponse } from 'next/server';
import { prisma } from '@/app/config/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    try {
        const sessionUser = (session as any).user;
        const { id, provider } = sessionUser;
        const user = await prisma.users.findUnique({
            where: {
                identity: `${provider}|${id}`,
            },
            select: {
                id: true,
            },
        });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        const employmentDetails = await prisma.employment_details.findUnique({
            where: {
                user_id: user.id,
            },
        });
        if (!employmentDetails) {
            return NextResponse.json({ message: 'Employment details not found' }, { status: 404 });
        }
        return NextResponse.json(employmentDetails);
    } catch (error) {
        console.error('Error fetching employment details:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    try {
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        const sessionUser = session.user as any;
        const { id, provider } = sessionUser;
        const user = await prisma.users.findUnique({
            where: {
                identity: `${provider}|${id}`,
            },
            select: {
                id: true,
            },
        });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        const existingEmployment = await prisma.employment_details.findUnique({
            where: {
                user_id: user.id,
            },
        });
        let updatedEmployment;
        if (existingEmployment) {
            updatedEmployment = await prisma.employment_details.update({
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
            updatedEmployment = await prisma.employment_details.create({
                data: {
                    user_id: user.id,
                    employer_name: body.employer_name,
                    job_title: body.job_title,
                    employment_type: body.employment_type,
                    monthly_income: body.monthly_income,
                    payday_day: body.payday_day,
                },
            });
        }
        return NextResponse.json(updatedEmployment);
    } catch (error) {
        console.error('Error updating employment details:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}