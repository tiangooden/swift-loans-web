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
    const user = await getCurrentUser();
    const data = await request.json();
    const application = await ApplicationsRepository.create({
        ...data,
        user: { connect: { id: user.id } },
    });
    return NextResponse.json(application, { status: 201 });
}