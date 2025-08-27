import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UsersRepository } from '@/app/api/users/users.repository';
import { del, getJSON, setJSON } from '@/app/shared/redis';

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized - No session found' }, { status: 401 });
    }
    const { id, provider } = session.user as any;

    let cached = await getJSON(id);
    console.log(cached);
    if (cached) {
        return NextResponse.json(cached);
    }

    const user = await UsersRepository.findByProviderId(`${provider}|${id}`);
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await setJSON(id, user);
    return NextResponse.json(user);
}

export async function PUT(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const data = await request.json();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized - No session found' }, { status: 401 });
    }
    const { id, provider } = session.user as any;
    const updatedUser = await UsersRepository.update({
        where: { identity: `${provider}|${id}` },
        data: {
            first_name: data.first_name,
            middle_name: data.middle_name,
            last_name: data.last_name,
            alias: data.alias,
            email: data.email,
            dob: data.dob ? new Date(data.dob) : null,
            phone_number: data.phone_number,
            trn: data.trn,
            street_address: data.street_address,
            city: data.city,
            country: data.country,
        },
    });
    if (!updatedUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    await del(id);
    return NextResponse.json(updatedUser);
}