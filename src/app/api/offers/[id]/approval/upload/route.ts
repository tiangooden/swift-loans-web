import { NextResponse, NextRequest } from 'next/server';
import { OffersRepository } from '@/app/repository/offers.repository';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;
  const { key } = await request.json();
  if (!id) {
    return NextResponse.json({ error: 'Offer ID is required' }, { status: 400 });
  }
  try {
    await OffersRepository.update({
      where: { id: id },
      data: {
        approval_file_key: key,
        updated_at: new Date(),
      },
    });
    return NextResponse.json({ message: 'Offer updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error rejecting offer:', error);
    return NextResponse.json({ error: 'Failed to update offer' }, { status: 500 });
  }
}