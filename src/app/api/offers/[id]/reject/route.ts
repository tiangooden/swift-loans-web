import { NextResponse, NextRequest } from 'next/server';
import { OffersRepository } from '../../offers.repository';
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
        status: OFFER_STATUS.REJECTED,
        updated_at: new Date(),
      },
    });
    return NextResponse.json({ message: 'Offer rejected successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error rejecting offer:', error);
    return NextResponse.json({ error: 'Failed to reject offer' }, { status: 500 });
  }
}