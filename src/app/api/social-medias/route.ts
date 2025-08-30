import { NextRequest, NextResponse } from 'next/server';
import { socialMediasSchema } from './schema';
import getCurrentUser from '@/app/shared/get-user';
import { SocialMediasRepository } from './social_medias.repository';
import { withValidateBody } from '@/app/shared/withValidateBody';

export async function GET(request: NextRequest) {
    const user = await getCurrentUser();
    const socialMedias = await SocialMediasRepository.findMany({
        where: { user_id: user.id },
    });
    return NextResponse.json(socialMedias[0] || {});
}

export const POST =
    withValidateBody(socialMediasSchema)
        (
            async (request: NextRequest, { data }: { data: any }) => {
                const user = await getCurrentUser();
                const newSocialMedia = await SocialMediasRepository.create({
                    ...data,
                    user_id: user.id,
                });
                return NextResponse.json(newSocialMedia, { status: 201 });
            }
        );