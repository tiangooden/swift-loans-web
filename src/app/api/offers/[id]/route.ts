import { NextResponse } from 'next/server';
import persistSessionUserIfNotExists from '@/app/lib/getOrCreateSessionUser';
import { OffersRepository } from '../offers.repository';
import { withValidateBody } from '@/app/lib/withValidateBody';
import { ApplicationsRepository } from '../../applications/applications.repository';
import { APPLICATION_STATUS, OFFER_STATUS } from '@/app/lib/constants';
import { createOfferSchema } from '../schema';

export async function GET({ params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const loanOffers = await OffersRepository.findMany({
      where: {
        application: {
          id: id
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    return NextResponse.json(loanOffers);
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const POST =
  withValidateBody(createOfferSchema)
    (
      async ({ data, params }: { data: any, params: any }) => {
        const user = await persistSessionUserIfNotExists();
        const { id } = params;
        const existingApplication = await ApplicationsRepository.findById(id);
        if (!existingApplication || existingApplication.user_id !== user.id) {
          return NextResponse.json({ error: 'Application not found or unauthorized' }, { status: 404 });
        }
        try {
          await ApplicationsRepository.update({
            where: { id: id },
            data: {
              status: APPLICATION_STATUS.COUNTERED,
            },
          });
          const newOffer = await OffersRepository.create({
            application: {
              connect: {
                id: id,
              }
            },
            ...data,
            status: OFFER_STATUS.SUBMITTED,
          });
          return NextResponse.json(newOffer, { status: 201 });
        }
        catch (error) {
          return NextResponse.json({ error: 'Failed to process counter offer' }, { status: 500 });
        }
      }
    );

export async function DELETE({ params }: { params: { id: string } }) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: 'Offer ID is required' }, { status: 400 });
  }
  try {
    await OffersRepository.delete({ id: id });
    return NextResponse.json({ message: 'Offer deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete offer' }, { status: 500 });
  }
}
