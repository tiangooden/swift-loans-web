import { NextResponse } from 'next/server';
import { OffersRepository } from '../../../offers.repository';

export async function PATCH({data, params }: { data: any, params: { id: string } }) {
  const { id } = await params;
  const { key } = data;
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
    return NextResponse.json({ error: 'Failed to update offer' }, { status: 500 });
  }
}