import { NextRequest, NextResponse } from 'next/server';
import getCurrentUser from '@/app/shared/get-user';
import prisma from '@/app/shared/prisma';

export async function GET(request: NextRequest) {
    const user = await getCurrentUser();
    const socialMedias = await prisma.social_medias.findMany({
        where: { user_id: user.id },
    });
    return NextResponse.json(socialMedias[0] || {});
}

export async function POST(request: NextRequest) {
    const user = await getCurrentUser();
    const body = await request.json();
    const newSocialMedia = await prisma.social_medias.create({
        data: {
            ...body,
            user_id: user.id,
        },
    });
    return NextResponse.json(newSocialMedia, { status: 201 });
}