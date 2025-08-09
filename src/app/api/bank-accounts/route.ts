import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/config/prisma';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('email');

    if (!userEmail) {
        return NextResponse.json({ error: 'User email is required' }, { status: 400 });
    }

    try {
        const user = await prisma.users.findUnique({
            where: { identity: userEmail },
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
    const data = await request.json();
    const { userEmail, ...accountData } = data;

    if (!userEmail) {
        return NextResponse.json({ error: 'User email is required' }, { status: 400 });
    }

    try {
        const user = await prisma.users.findUnique({
            where: { identity: userEmail },
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