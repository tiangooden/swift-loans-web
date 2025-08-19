import { NextRequest, NextResponse } from 'next/server';
import { LoanApplicationsRepository } from '@/app/repository/loan_applications.repository';

export async function GET(request: NextRequest) {
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