import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/config/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    try {
        if (!session) {
            throw new Error('Unauthorized - No session found');
        }
        const sessionUser = session.user as any;
        const { id, provider } = sessionUser;
        const user = await prisma.users.findUnique({
            where: { identity: `${provider}|${id}` },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const data = await request.json();
    try {
        if (!session) {
            throw new Error('Unauthorized - No session found');
        }
        const sessionUser = session.user as any;
        const { id, provider } = sessionUser;
        const updatedUser = await prisma.users.update({
            where: { identity: `${provider}|${id}` },
            data: {
                first_name: data.first_name,
                middle_name: data.middle_name,
                last_name: data.last_name,
                dob: data.dob ? new Date(data.dob) : null,
                phone_number: data.phone_number,
                trn: data.trn,
                street_address: data.street_address,
                city: data.city,
                country: data.country,
            },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Error updating user profile:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}