import { LoanApplicationsRepository } from '@/app/repository/loan_applications.repository';
import { LoanOffersRepository } from '@/app/repository/loan_offers.repository';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { applicationId, loanDetails } = await request.json();
    await LoanApplicationsRepository.update({
      where: { id: applicationId },
      data: { status: 'approved' },
    });
    await LoanOffersRepository.create({
      ...loanDetails,
      application_id: applicationId,
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