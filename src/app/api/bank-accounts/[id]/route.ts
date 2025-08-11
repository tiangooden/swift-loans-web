import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/config/prisma';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const data = await request.json();
    try {
        const updatedAccount = await prisma.bank_accounts.update({
            where: { id: parseInt(id) },
            data: {
                bank_name: data.bank_name,
                account_number: data.account_number,
                account_type: data.account_type,
                is_primary: data.is_primary,
            },
        });
        return NextResponse.json(updatedAccount);
    } catch (error) {
        console.error(`Error updating bank account ${id}:`, error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        await prisma.bank_accounts.update({
            where: { id: parseInt(id) },
            data: {
                is_deleted: true,
                deleted_at: new Date(),
            },
        });
        return NextResponse.json({ message: 'Bank account deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error(`Error deleting bank account ${id}:`, error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}