import { NextRequest, NextResponse } from 'next/server';
import { ApplicationsRepository } from '../../../repository/applications.repository';
import getCurrentUser from '@/app/shared/get-user';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const user = await getCurrentUser();
    // if (!user || !user.roles.includes('admin')) {
    //     return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    // }
    const body = await request.json();
    const { amount_requested, term_in_days, purpose } = body;
    if (!amount_requested || !term_in_days /*|| !purpose*/) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const existingApplication = await ApplicationsRepository.findById(params.id);
    if (!existingApplication || existingApplication.user_id !== user.id) {
        return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }
    const updatedApplication = await ApplicationsRepository.update({
        where: { id: params.id },
        data: {
            amount_requested: parseFloat(amount_requested),
            term_in_days: parseInt(term_in_days),
            purpose,
            updated_at: new Date(),
        },
    });
    return NextResponse.json(updatedApplication);
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    const user = await getCurrentUser();
    // if (!user || !user.roles.includes('admin')) {
    //     return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    // }
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
        return NextResponse.json({ error: 'Missing status field' }, { status: 400 });
    }

    const existingApplication = await ApplicationsRepository.findById(id);
    if (!existingApplication || existingApplication.user_id !== user.id) {
        return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    const updatedApplication = await ApplicationsRepository.update({
        where: { id: id },
        data: {
            status: status,
            updated_at: new Date(),
        },
    });
    return NextResponse.json(updatedApplication);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const user = await getCurrentUser();
    const { id } = await params;
    const existingApplication = await ApplicationsRepository.findById(id);
    if (!existingApplication || existingApplication.user_id !== user.id) {
        return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }
    await ApplicationsRepository.update({
        where: { id: id },
        data: {
            is_deleted: true,
            deleted_at: new Date(),
        },
    });
    return NextResponse.json({ message: 'Application deleted successfully' });
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;
    // const user = await getCurrentUser();
    const loanApplication = await ApplicationsRepository.findById(id, {
        offers: {
            orderBy: {
                created_at: 'desc',
            }
        }
    });
    if (!loanApplication) {
        return NextResponse.json({ error: 'Loan application not found' }, { status: 404 });
    }
    // Check if the user is the owner of the application or an admin
    // const isAdmin = user.roles.includes('admin');
    // if (loanApplication.user_id !== user.id && !isAdmin) {
    //     return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    // }
    return NextResponse.json(loanApplication);
}
