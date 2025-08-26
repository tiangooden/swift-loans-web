import { NextRequest, NextResponse } from 'next/server';
import getCurrentUser from '@/app/shared/get-user';
import prisma from '@/app/shared/prisma';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const user = await getCurrentUser();
    const { id } = await params;
    const data = await request.json();
    const updatedSocialMedia = await prisma.social_medias.update({
        where: { id: id },
        data: {
            platform: data.platform,
            username: data.username,
        },
    });
    return NextResponse.json(updatedSocialMedia);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const user = await getCurrentUser();
    const { id } = await params;
    await prisma.social_medias.delete({
        where: { id: id },
    });
    return NextResponse.json({ message: 'Social media account deleted successfully' }, { status: 200 });
}