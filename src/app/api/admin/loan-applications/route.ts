import { NextRequest, NextResponse } from 'next/server';
import { LoanApplicationsRepository } from '@/app/loan-applications/loan_applications.repository';
import getCurrentUser from '@/app/shared/get-user';

export async function GET(request: NextRequest) {
    const user = await getCurrentUser();
    // if (!user || !user.roles.includes('admin')) {
    // return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    // }
    const loanApplications = await LoanApplicationsRepository.findMany({
        orderBy: { submitted_at: 'desc' },
    });
    return NextResponse.json(loanApplications);
}