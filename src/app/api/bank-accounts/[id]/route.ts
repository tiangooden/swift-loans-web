import { NextRequest, NextResponse } from 'next/server';
import { BankAccountsRepository } from '@/app/repository/bank_accounts.repository';
import getCurrentUser from '@/app/util/get-user';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const user = await getCurrentUser();
    const { id } = await params;
    const data = await request.json();
    const updatedAccount = await BankAccountsRepository.update({
        where: { id: parseInt(id) },
        data: {
            bank_name: data.bank_name,
            account_number: data.account_number,
            account_type: data.account_type,
            is_primary: data.is_primary,
        },
    });
    return NextResponse.json(updatedAccount);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const user = await getCurrentUser();
    const { id } = await params;
    await BankAccountsRepository.update({
        where: { id: parseInt(id) },
        data: {
            is_deleted: true,
            deleted_at: new Date(),
        },
    });
    return NextResponse.json({ message: 'Bank account deleted successfully' }, { status: 200 });
}