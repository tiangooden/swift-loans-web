import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/config/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    try {
        const sessionUser = (session as any).user;
        const { id, provider } = sessionUser;
        const user = await prisma.users.findUnique({
            where: { identity: `${provider}|${id}` },
            select: { id: true },
        });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        const bankAccounts = await prisma.bank_accounts.findMany({
            where: { user_id: user.id, is_deleted: false },
        });
        return NextResponse.json(bankAccounts);
    } catch (error) {
        console.error('Error fetching bank accounts:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const data = await request.json();
    const { userEmail, ...accountData } = data;
    if (!userEmail) {
        return NextResponse.json({ error: 'User email is required' }, { status: 400 });
    }
    try {
        const sessionUser = (session as any).user;
        const { id, provider } = sessionUser;
        const user = await prisma.users.findUnique({
            where: { identity: `${provider}|${id}` },
            select: { id: true },
        });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        const newAccount = await prisma.bank_accounts.create({
            data: {
                ...accountData,
                user_id: user.id,
            },
        });
        return NextResponse.json(newAccount, { status: 201 });
    } catch (error) {
        console.error('Error adding bank account:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}