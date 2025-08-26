import { NextRequest, NextResponse } from 'next/server';
import getCurrentUser from '@/app/shared/get-user';
import { BankAccountsRepository } from '../bank_accounts.repository';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const user = await getCurrentUser();
    const { id } = await params;
    const data = await request.json();
    const updatedAccount = await BankAccountsRepository.update({
        where: { id: id },
        data,
    });
    return NextResponse.json(updatedAccount);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const user = await getCurrentUser();
    const { id } = await params;
    await BankAccountsRepository.update({
        where: { id: id },
        data: {
            is_deleted: true,
            deleted_at: new Date(),
        },
    });
    return NextResponse.json({ message: 'Bank account deleted successfully' }, { status: 200 });
}