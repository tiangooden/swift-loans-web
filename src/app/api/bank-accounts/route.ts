import { NextRequest, NextResponse } from 'next/server';
import getCurrentUser from '@/app/lib/get-user';
import { BankAccountsRepository } from './bank_accounts.repository';
import { withValidateBody } from '@/app/lib/withValidateBody';
import { bankAccountSchema } from './schema';

export async function GET() {
    const user = await getCurrentUser();
    const bankAccounts = await BankAccountsRepository.find({
        where: { user_id: user.id, is_deleted: false },
    });
    return NextResponse.json(bankAccounts[0] || {});
}

export const POST =
    withValidateBody(bankAccountSchema)
        (
            async ({ data }: { data: any }) => {
                const user = await getCurrentUser();
                const newAccount = await BankAccountsRepository.create({
                    ...data,
                    user_id: user.id,
                });
                return NextResponse.json(newAccount, { status: 201 });
            }
        );