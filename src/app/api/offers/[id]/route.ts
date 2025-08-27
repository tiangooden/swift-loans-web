import { NextRequest, NextResponse } from 'next/server';
import getCurrentUser from '@/app/shared/get-user';
import { OffersRepository } from '../offers.repository';
import { ApplicationsRepository } from '../../applications/applications.repository';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: 'Offer ID is required' }, { status: 400 });
  }
  try {
    await OffersRepository.delete({ id: id });
    return NextResponse.json({ message: 'Offer deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting offer:', error);
    return NextResponse.json({ error: 'Failed to delete offer' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  const { id } = await params;
  const { amount, interest_rate, term, status } = await request.json();
  if (!amount || !interest_rate || !term) {
    return NextResponse.json({ error: 'Missing required offer fields' }, { status: 400 });
  }
  const existingApplication = await ApplicationsRepository.findById(id);
  if (!existingApplication || existingApplication.user_id !== user.id) {
    return NextResponse.json({ error: 'Application not found or unauthorized' }, { status: 404 });
  }
  try {
    await ApplicationsRepository.update({
      where: { id: id },
      data: {
        status: status,
        updated_at: new Date(),
      },
    });
    const newOffer = await OffersRepository.create({
      application: {
        connect: {
          id: id,
        }
      },
      principal: parseFloat(amount),
      interest_rate: parseFloat(interest_rate),
      term_in_days: parseInt(term),
      status: status,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return NextResponse.json(newOffer, { status: 201 });
  } catch (error) {
    console.error('Error processing counter offer:', error);
    return NextResponse.json({ error: 'Failed to process counter offer' }, { status: 500 });
  }
}
