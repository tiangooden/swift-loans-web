import { NextResponse } from 'next/server';
import { BankAccountsRepository } from '../bank_accounts.repository';
import { withValidateBody } from '@/app/lib/withValidateBody';
import { bankAccountSchema } from '../schema';

export const PUT =
    withValidateBody(bankAccountSchema)
        (
            async ({ data, params }: { params: { id: string }, data: any }) => {
                const { id } = await params;
                const updatedAccount = await BankAccountsRepository.update({
                    where: { id: id },
                    data: {
                        bank_name: data.bank_name,
                        branch_name: data.branch_name,
                        account_number: data.account_number,
                        account_name: data.account_name,
                        account_type: data.account_type,
                        updated_at: new Date(),
                    },
                });
                return NextResponse.json(updatedAccount);
            }
        );

export async function DELETE({ params }: { params: { id: string } }) {
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