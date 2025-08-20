import { NextResponse, NextRequest } from 'next/server';
import { OffersRepository } from '@/app/repository/offers.repository';
import { OFFER_STATUS } from '@/app/shared/constants';

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
        updated_at: new Date(),
      },
    });
    return NextResponse.json({ message: 'Offer accepted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error accepting offer:', error);
    return NextResponse.json({ error: 'Failed to accept offer' }, { status: 500 });
  }
}