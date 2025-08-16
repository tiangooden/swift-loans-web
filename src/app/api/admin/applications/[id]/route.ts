import { LoanApplicationsRepository } from '@/app/repository/loan_applications.repository';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const application = await LoanApplicationsRepository.findMany({
      where: { id: parseInt(id) },
      include: {
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
            employments: {
              select: {
                employer_name: true,
                job_title: true,
                employment_type: true,
                monthly_income: true,
                payday_day: true,
              }
            },
            bank_accounts: {
              select: {
                id: true,
                bank_name: true,
                account_type: true,
                account_number: true,
              },
              take: 1
            }
          }
        }
      }
    });
    const app = application[0] as any;
    if (!app) {
      return NextResponse.json(
        { error: 'Loan application not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(app);
  } catch (error) {
    console.error('Error fetching loan application:', error);
    return NextResponse.json(
      { error: 'Failed to fetch loan application' },
      { status: 500 }
    );
  }
}