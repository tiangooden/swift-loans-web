import { LoanApplicationsRepository } from '@/app/repository/loan_applications.repository';
import { LoanOffersRepository } from '@/app/repository/loan_offers.repository';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const application = await LoanApplicationsRepository.findById(id, {
      users: {
        select: {
          first_name: true,
          last_name: true,
          email: true,
          phone_number: true,
          street_address: true,
          city: true,
          dob: true,
          trn: true,
          employment: {
            select: {
              employer_name: true,
              job_title: true,
              monthly_income: true,
              payday_day: true,
            }
          },
          bank_account: {
            select: {
              id: true,
              bank_name: true,
              branch_name: true,
              account_name: true,
              account_number: true,
              account_type: true,
            }
          }
        }
      }
    });
    if (!application) {
      return NextResponse.json(
        { error: 'Loan application not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(application);
  } catch (error) {
    console.error('Error fetching loan application:', error);
    return NextResponse.json(
      { error: 'Failed to fetch loan application' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { applicationId, loanDetails } = await request.json();

    // Update application status to approved
    await LoanApplicationsRepository.update({
      where: { id: applicationId },
      data: { status: 'approved' },
    });

    // Create a new loan offer record
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

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const { decision_reason } = await request.json();

    await LoanApplicationsRepository.update({
      where: { id: id },
      data: { status: 'rejected', decision_reason: decision_reason, decided_at: new Date() },
    });

    return NextResponse.json({ message: 'Loan application rejected successfully' });
  } catch (error) {
    console.error('Error rejecting loan application:', error);
    return NextResponse.json({ message: 'Failed to reject loan application' }, { status: 500 });
  }
}