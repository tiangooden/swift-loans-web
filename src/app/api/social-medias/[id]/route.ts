import { NextRequest, NextResponse } from 'next/server';
import getCurrentUser from '@/app/shared/get-user';
import { SocialMediasRepository } from '../social_medias.repository';
import { socialMediasSchema } from '../schema';
import { withValidateBody } from '@/app/shared/withValidateBody';

export const PUT =
    withValidateBody(socialMediasSchema)
        (
            async (request: NextRequest, { data }: { data: any }) => {
                const user = await getCurrentUser();
                const { id } = data;
                const updatedSocialMedia = await SocialMediasRepository.update({
                    where: { id },
                    data: { ...data, updated_at: new Date() },
                });
                return NextResponse.json(updatedSocialMedia);
            }
        )

export async function DELETE(request: NextRequest, { data }: { data: any }) {
    // const user = await getCurrentUser();
    const { id } = data;
    await SocialMediasRepository.delete({ id });
    return NextResponse.json({ message: 'Social media account deleted successfully' }, { status: 200 });
}