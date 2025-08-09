import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/app/config/prisma';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.users.findUnique({
            where: { identity: session?.user?.email },
            select: { id: true },
        });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const applications = await prisma.loan_applications.findMany({
            where: { user_id: user.id, is_deleted: false },
            orderBy: { submitted_at: 'desc' },
        });

        return NextResponse.json(applications);
    } catch (error) {
        console.error('Error fetching loan applications:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.users.findUnique({
            where: { identity: session?.user?.email },
            select: { id: true },
        });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const body = await request.json();
        const { amount_requested, term_in_days, purpose } = body;

        if (!amount_requested || !term_in_days /*|| !purpose*/) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        const application = await prisma.loan_applications.create({
            data: {
                amount_requested: parseFloat(amount_requested),
                term_in_days: parseInt(term_in_days),
                purpose,
                users: { connect: { id: user.id } },
            },
        });

        return NextResponse.json(application, { status: 201 });
    } catch (error) {
        console.error('Error creating loan application:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}