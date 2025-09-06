import { NextResponse } from 'next/server';
import { SocialMediasRepository } from '../social_medias.repository';
import { socialMediasSchema } from '../schema';
import { withValidateBody } from '@/app/lib/withValidateBody';
import { withRedisCacheDel } from '@/app/lib/withRedisCacheDel';
import { CACHE_KEY } from '@/app/lib/constants';

export const PUT =
    withValidateBody(socialMediasSchema)
        (
            withRedisCacheDel(`${CACHE_KEY.socialMedias}`)
                (
                    async ({ data }: { data: any }) => {
                        const { id } = data;
                        const updatedSocialMedia = await SocialMediasRepository.update({
                            where: { id },
                            data: { ...data, updated_at: new Date() },
                        });
                        return NextResponse.json(updatedSocialMedia);
                    }
                )
        )

export const DELETE =
    withRedisCacheDel(`${CACHE_KEY.socialMedias}`)
        (
            async ({ data }: { data: any }) => {
                const { id } = data;
                await SocialMediasRepository.delete({ id });
                return NextResponse.json({ message: 'Social media account deleted successfully' }, { status: 200 });
            }
        )
