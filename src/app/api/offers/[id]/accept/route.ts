import { NextResponse, NextRequest } from 'next/server';
import { OFFER_STATUS } from '@/app/shared/constants';
import { OffersRepository } from '../../offers.repository';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: 'Offer ID is required' }, { status: 400 });
  }

  try {
    await OffersRepository.update({
      where: { id: id },
      data: {
        status: OFFER_STATUS.ACCEPTED,
      },
    });
    return NextResponse.json({ message: 'Offer accepted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to accept offer' }, { status: 500 });
  }
}