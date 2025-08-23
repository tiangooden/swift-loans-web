import { ApplicationsRepository } from '@/app/repository/applications.repository';
import { OffersRepository } from '@/app/repository/offers.repository';
import { APPLICATION_STATUS, INTEREST_RATE } from '@/app/shared/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;
  try {
    const application = await ApplicationsRepository.update({
      where: { id: id },
      data: { status: APPLICATION_STATUS.APPROVED },
    });
    await OffersRepository.create({
      principal: application.amount_requested,
      term_in_days: application.term_in_days,
      interest_rate: INTEREST_RATE[application.term_in_days?.toString() ?? '14'],
      application: { connect: { id } },
      status: APPLICATION_STATUS.APPROVED,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return NextResponse.json({ message: 'Loan application approved and offer created successfully' });
  } catch (error) {
    console.error('Error approving loan application:', error);
    return NextResponse.json({ message: 'Failed to approve loan application' }, { status: 500 });
  }
}