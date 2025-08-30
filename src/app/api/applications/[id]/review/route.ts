import { NextRequest, NextResponse } from 'next/server';
import { ApplicationsRepository } from '../../applications.repository';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const application = await ApplicationsRepository.findById(id, {
      status: true,
      amount_requested: true,
      term_in_days: true,
      purpose: true,
      user: {
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
              gross_salary: true,
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
      },
      offers: {
        orderBy: {
          created_at: 'desc',
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
    return NextResponse.json(
      { error: 'Failed to fetch loan application' },
      { status: 500 }
    );
  }
}
