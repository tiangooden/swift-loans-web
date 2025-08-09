import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/config/prisma';

export async function GET(request: NextRequest, { params }: { params: { email: string } }) {
    const { email } = params;

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    try {
        const user = await prisma.users.findUnique({
            where: { identity: email },
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

export async function PUT(request: NextRequest, { params }: { params: { email: string } }) {
    const { email } = params;
    const data = await request.json();

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    try {
        const updatedUser = await prisma.users.update({
            where: { identity: email },
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