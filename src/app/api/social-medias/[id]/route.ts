import { NextResponse } from 'next/server';
import { SocialMediasRepository } from '../social_medias.repository';
import { socialMediasSchema } from '../schema';
import { withValidateBody } from '@/app/lib/withValidateBody';

export const PUT =
    withValidateBody(socialMediasSchema)
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

export async function DELETE({ data }: { data: any }) {
    const { id } = data;
    await SocialMediasRepository.delete({ id });
    return NextResponse.json({ message: 'Social media account deleted successfully' }, { status: 200 });
}