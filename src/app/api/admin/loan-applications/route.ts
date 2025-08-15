import { NextRequest, NextResponse } from 'next/server';
import { LoanApplicationsRepository } from '@/app/repository/loan_applications.repository';
import { prisma } from '@/app/shared/prisma';
// import getCurrentUser from '@/app/shared/get-user';

export async function GET(request: NextRequest) {
    // const user = await getCurrentUser();
    // if (!user || !user.roles.includes('admin')) {
    // return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    // }
    const loanApplications = await LoanApplicationsRepository.findMany({
        where: {
            is_deleted: false,
        },
        include: {
            users: {
                select: {
                    first_name: true,
                    last_name: true,
                    email: true
                }
            }
        },
        orderBy: { submitted_at: 'desc' },
    });
    return NextResponse.json(loanApplications);
}