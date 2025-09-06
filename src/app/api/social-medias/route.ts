import { NextResponse } from 'next/server';
import { socialMediasSchema } from './schema';
import getOrCreateSessionUser from '@/app/lib/getOrCreateSessionUser';
import { SocialMediasRepository } from './social_medias.repository';
import { withValidateBody } from '@/app/lib/withValidateBody';
import { withRedisCacheAdd } from '@/app/lib/withRedisCacheAdd';
import { CACHE_KEY, CACHE_TIME } from '@/app/lib/constants';
import { withRedisCacheDel } from '@/app/lib/withRedisCacheDel';

export const GET =
    withRedisCacheAdd(CACHE_TIME.GENERAL, `${CACHE_KEY.socialMedias}`)
        (
            async () => {
                const user = await getOrCreateSessionUser();
                const socialMedias = await SocialMediasRepository.findMany({
                    where: { user_id: user.id },
                });
                return NextResponse.json(socialMedias[0] || {});
            }
        );

export const POST =
    withValidateBody(socialMediasSchema)
        (
            withRedisCacheDel(`${CACHE_KEY.socialMedias}`)
                (
                    async ({ data }: { data: any }) => {
                        const user = await getOrCreateSessionUser();
                        const newSocialMedia = await SocialMediasRepository.create({
                            ...data,
                            user_id: user.id,
                        });
                        return NextResponse.json(newSocialMedia, { status: 201 });
                    }
                )
        );