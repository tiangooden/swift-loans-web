import { NextRequest, NextResponse } from 'next/server';
import { BankAccountsRepository } from '@/app/bank-accounts/bank_accounts.repository';
import getCurrentUser from '@/app/shared/get-user';

export async function GET(request: NextRequest) {
    const user = await getCurrentUser();
    const bankAccounts = await BankAccountsRepository.find({
        where: { user_id: user.id, is_deleted: false },
    });
    return NextResponse.json(bankAccounts);
}

export async function POST(request: NextRequest) {
    const user = await getCurrentUser();
    const body = await request.json();
    const newAccount = await BankAccountsRepository.create({
        ...body,
        user_id: user.id,
    });
    return NextResponse.json(newAccount, { status: 201 });
}