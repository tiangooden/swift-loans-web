import { LoanApplicationsRepository } from '@/app/repository/loan_applications.repository';
import { LoanOffersRepository } from '@/app/repository/loan_offers.repository';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const { loanDetails } = await request.json();
    await LoanApplicationsRepository.update({
      where: { id: id },
      data: {
        status: 'countered',
        updated_at: new Date(),
      },
    });
    await LoanOffersRepository.create({
      ...loanDetails,
      application_id: id,
      status: 'submitted',
      created_at: new Date(),
      updated_at: new Date(),
    });
    return NextResponse.json({ message: 'Loan application approved and offer created successfully' });
  } catch (error) {
    console.error('Error approving loan application:', error);
    return NextResponse.json({ message: 'Failed to approve loan application' }, { status: 500 });
  }
}
