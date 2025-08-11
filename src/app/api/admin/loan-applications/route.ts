import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { LoanApplicationsRepository } from '@/app/repository/loan_applications.repository';
import { UsersRepository } from '@/app/repository/users.repository';

export async function GET(request: NextRequest) {
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //     return NextResponse.json({ error: 'Unauthorized - No session found' }, { status: 401 });
    // }
    // const { id, provider } = session.user as any;
    // const user = await UsersRepository.findByProviderId(`${provider}|${id}`);
    // if (!user) {
    //     return NextResponse.json({ error: 'User not found' }, { status: 404 });
    // }
    // if (!user || !user.roles.includes('admin')) {
    // return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    // }
    const loanApplications = await LoanApplicationsRepository.findMany({
        orderBy: { submitted_at: 'desc' },
    });
    return NextResponse.json(loanApplications);
}