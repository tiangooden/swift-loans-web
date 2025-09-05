import { APPLICATION_STATUS, INTEREST_RATE } from '@/app/lib/constants';
import { NextResponse } from 'next/server';
import { ApplicationsRepository } from '../../applications.repository';
import { OffersRepository } from '@/app/api/offers/offers.repository';

export async function PATCH({ params }: { params: { id: string } }) {
  const { id } = await params;
  try {
    const application = await ApplicationsRepository.update({
      where: { id: id },
      data: { status: APPLICATION_STATUS.APPROVED, updated_at: new Date() },
    });
    await OffersRepository.create({
      principal: application.amount_requested,
      term_in_days: application.term_in_days,
      interest_rate: INTEREST_RATE[application.term_in_days?.toString() ?? '14'],
      application: { connect: { id } },
      status: APPLICATION_STATUS.APPROVED,
    });
    return NextResponse.json({ message: 'Loan application approved and offer created successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to approve loan application' }, { status: 500 });
  }
}