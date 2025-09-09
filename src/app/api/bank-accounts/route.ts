import { NextResponse } from 'next/server';
import getOrCreateSessionUser from '@/app/lib/getOrCreateSessionUser';
import { BankAccountsRepository } from './bank_accounts.repository';
import { withValidateBody } from '@/app/lib/withValidateBody';
import { bankAccountSchema } from './schema';
import { withRedisCacheAdd } from '@/app/lib/withRedisCacheAdd';
import { CACHE_TIME } from '@/app/lib/constants';
import { withRedisCacheDel } from '@/app/lib/withRedisCacheDel';

export const GET =
    withRedisCacheAdd(CACHE_TIME.GENERAL, 'bank_accounts')
        (
            async () => {
                const user = await getOrCreateSessionUser();
                const bankAccounts = await BankAccountsRepository.find({
                    where: { user_id: user.id, is_deleted: false },
                });
                return NextResponse.json(bankAccounts[0] || {});
            }
        );

export const POST =
    withValidateBody(bankAccountSchema)
        (
            withRedisCacheDel('bank_accounts')
                (
                    async ({ data }: { data: any }) => {
                        const user = await getOrCreateSessionUser();
                        const newAccount = await BankAccountsRepository.create({
                            ...data,
                            user_id: user.id,
                        });
                        return NextResponse.json(newAccount, { status: 201 });
                    }
                )
        );