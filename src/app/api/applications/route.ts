import { NextRequest, NextResponse } from 'next/server';
import getCurrentUser from '@/app/shared/get-user';
import { ApplicationsRepository } from './applications.repository';

export async function GET() {
    const user = await getCurrentUser();
    const applications = await ApplicationsRepository.findMany({
        where: { user_id: user.id, is_deleted: false },
        orderBy: { submitted_at: 'desc' },
    });
    return NextResponse.json(applications);
}

export async function POST(request: NextRequest) {
    const user = await getCurrentUser(); const body = await request.json();
    const { amount_requested, term_in_days, purpose } = body;
    const application = await ApplicationsRepository.create({
        amount_requested: parseFloat(amount_requested),
        term_in_days: parseInt(term_in_days),
        purpose,
        user: { connect: { id: user.id } },
    });
    return NextResponse.json(application, { status: 201 });
}