import { NextRequest, NextResponse } from 'next/server';
import getCurrentUser from '@/app/shared/get-user';
import { SocialMediasRepository } from '../social_medias.repository';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const user = await getCurrentUser();
    const { id } = await params;
    const body = await request.json();
    const updatedSocialMedia = await SocialMediasRepository.update({
        where: { id },
        data: body,
    });
    return NextResponse.json(updatedSocialMedia);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const user = await getCurrentUser();
    const { id } = await params;
    await SocialMediasRepository.delete({ id });
    return NextResponse.json({ message: 'Social media account deleted successfully' }, { status: 200 });
}