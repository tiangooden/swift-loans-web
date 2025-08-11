import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UsersRepository } from '@/app/repository/users.repository';
import { LoanApplicationsRepository } from '@/app/repository/loan_applications.repository';

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized - No session found' }, { status: 401 });
    }
    const { id, provider } = session.user as any;
    const user = await UsersRepository.findByProviderId(`${provider}|${id}`);
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const applications = await LoanApplicationsRepository.findMany({
        where: { user_id: user.id, is_deleted: false },
        orderBy: { submitted_at: 'desc' },
    });
    return NextResponse.json(applications);
}

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized - No session found' }, { status: 401 });
    }
    const { id, provider } = session.user as any;
    const user = await UsersRepository.findByProviderId(`${provider}|${id}`);
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const body = await request.json();
    const { amount_requested, term_in_days, purpose } = body;
    if (!amount_requested || !term_in_days /*|| !purpose*/) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const application = await LoanApplicationsRepository.create({
        amount_requested: parseFloat(amount_requested),
        term_in_days: parseInt(term_in_days),
        purpose,
        users: { connect: { id: user.id } },
    });
    return NextResponse.json(application, { status: 201 });
}