import { NextRequest, NextResponse } from 'next/server';
import { ApplicationsRepository } from '../../applications/applications.repository';

export async function GET(request: NextRequest) {
    const loanApplications = await ApplicationsRepository.findMany({
        where: {
            is_deleted: false,
        },
        select: {
            id: true,
            term_in_days: true,
            status: true,
            amount_requested: true,
            user: {
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