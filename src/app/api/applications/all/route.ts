import { NextRequest, NextResponse } from 'next/server';
import { ApplicationsRepository } from '@/app/repository/applications.repository';

export async function GET(request: NextRequest) {
    const loanApplications = await ApplicationsRepository.findMany({
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