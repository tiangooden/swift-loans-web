import { ApplicationsRepository } from '@/app/repository/applications.repository';
import { LoanOffersRepository } from '@/app/repository/offers.repository';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;
  try {
    const { amount, term, interest_rate } = await request.json();
    await ApplicationsRepository.update({
      where: { id: id },
      data: { status: 'approved' },
    });
    await LoanOffersRepository.create({
      principal: amount,
      term_in_days: term,
      interest_rate: interest_rate,
      applications: { connect: { id } },
      status: 'approved',
      created_at: new Date(),
      updated_at: new Date(),
    });
    return NextResponse.json({ message: 'Loan application approved and offer created successfully' });
  } catch (error) {
    console.error('Error approving loan application:', error);
    return NextResponse.json({ message: 'Failed to approve loan application' }, { status: 500 });
  }
}