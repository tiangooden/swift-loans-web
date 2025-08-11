import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UsersRepository } from '@/app/repository/users.repository';
import { BankAccountsRepository } from '@/app/repository/bank_accounts.repository';

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized - No session found' }, { status: 401 });
    }
    const { id, provider } = session.user as any;
    const user = await UsersRepository.findByProviderId(`${provider}|${id}`);
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const bankAccounts = await BankAccountsRepository.findMany({
        where: { user_id: user.id, is_deleted: false },
    });
    return NextResponse.json(bankAccounts);
}

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized - No session found' }, { status: 401 });
    }
    const { id, provider } = session.user as any;
    const user = await UsersRepository.findByProviderId(`${provider}|${id}`);
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const { accountData } = await request.json();
    const newAccount = await BankAccountsRepository.create({
        ...accountData,
        user_id: user.id,
    });
    return NextResponse.json(newAccount, { status: 201 });
}