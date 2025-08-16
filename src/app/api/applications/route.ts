import { NextRequest, NextResponse } from 'next/server';
import { LoanApplicationsRepository } from '@/app/repository/loan_applications.repository';
import getCurrentUser from '@/app/shared/get-user';

export async function GET() {
    const user = await getCurrentUser();
    const applications = await LoanApplicationsRepository.findMany({
        where: { user_id: user.id, is_deleted: false },
        orderBy: { submitted_at: 'desc' },
    });
    return NextResponse.json(applications);
}

export async function POST(request: NextRequest) {
    const user = await getCurrentUser();
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