import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { LoanApplicationsRepository } from '@/app/repository/loan_applications.repository';
import { UsersRepository } from '@/app/repository/users.repository';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const sessionUser = session.user as any;
        const { id, provider } = sessionUser;
        const user = await UsersRepository.findByProviderId(`${provider}|${id}`);
        // if (!user || !user.roles.includes('admin')) {
        // return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        // }
        const loanApplications = await LoanApplicationsRepository.findMany({
            orderBy: { submitted_at: 'desc' },
        });
        return NextResponse.json(loanApplications);
    } catch (error) {
        console.error('Error fetching loan applications for admin:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}