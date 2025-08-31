import { NextRequest, NextResponse } from 'next/server';
import getCurrentUser from '@/app/shared/get-user';
import { BankAccountsRepository } from './bank_accounts.repository';
import { withValidateBody } from '@/app/shared/withValidateBody';
import { bankAccountSchema } from './schema';

export async function GET(request: NextRequest) {
    const user = await getCurrentUser();
    const bankAccounts = await BankAccountsRepository.find({
        where: { user_id: user.id, is_deleted: false },
    });
    return NextResponse.json(bankAccounts[0] || {});
}

export const POST =
    withValidateBody(bankAccountSchema)
        (
            async (request: NextRequest) => {
                const user = await getCurrentUser();
                const body = await request.json();
                const newAccount = await BankAccountsRepository.create({
                    ...body,
                    user_id: user.id,
                });
                return NextResponse.json(newAccount, { status: 201 });
            }
        );