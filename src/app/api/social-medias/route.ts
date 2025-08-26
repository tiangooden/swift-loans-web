import { NextRequest, NextResponse } from 'next/server';
import getCurrentUser from '@/app/shared/get-user';
import { SocialMediasRepository } from './social_medias.repository';

export async function GET(request: NextRequest) {
    const user = await getCurrentUser();
    const socialMedias = await SocialMediasRepository.findMany({
        where: { user_id: user.id },
    });
    return NextResponse.json(socialMedias[0] || {});
}

export async function POST(request: NextRequest) {
    const user = await getCurrentUser();
    const body = await request.json();
    const newSocialMedia = await SocialMediasRepository.create({
        ...body,
        user_id: user.id,
    });
    return NextResponse.json(newSocialMedia, { status: 201 });
}