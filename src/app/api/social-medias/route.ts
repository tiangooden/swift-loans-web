import { NextResponse } from 'next/server';
import { socialMediasSchema } from './schema';
import persistSessionUserIfNotExists from '@/app/lib/getOrCreateSessionUser';
import { SocialMediasRepository } from './social_medias.repository';
import { withValidateBody } from '@/app/lib/withValidateBody';

export async function GET() {
    const user = await persistSessionUserIfNotExists();
    const socialMedias = await SocialMediasRepository.findMany({
        where: { user_id: user.id },
    });
    return NextResponse.json(socialMedias[0] || {});
}

export const POST =
    withValidateBody(socialMediasSchema)
        (
            async ({ data }: { data: any }) => {
                const user = await persistSessionUserIfNotExists();
                const newSocialMedia = await SocialMediasRepository.create({
                    ...data,
                    user_id: user.id,
                });
                return NextResponse.json(newSocialMedia, { status: 201 });
            }
        );