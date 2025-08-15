import { LoanApplicationsRepository } from '@/app/repository/loan_applications.repository';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    // Fetch loan application with related user, employment, and bank account data
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
            employment_details: {
              select: {
                employer_name: true,
                job_title: true,
                employment_type: true,
              }
            },
            bank_accounts: {
              where: { is_primary: true },
              select: {
                id: true,
                bank_name: true,
                account_type: true,
                account_number: true,
                is_primary: true
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

    console.log(application);

    // Transform the data to match expected format with nested structure
    const formattedApplication = {
      id: app.id,
      amount_requested: app.amount_requested,
      term_in_days: app.term_in_days,
      status: app.status,
      submitted_at: app.created_at,
      purpose: app.purpose,
      users: {
        first_name: app.users.first_name,
        last_name: app.users.last_name,
        email: app.users.email,
        phone: app.users.phone_number,
        address: app.users.street_address,
        city: app.users.city,
        state: app.users.state,
        zip_code: app.users.zip_code,
        dob: app.users.dob,
        trn: app.users.trn,
        employment: app.users.employment_details ? {
          employer_name: app.users.employment_details.employer_name,
          job_title: app.users.employment_details.job_title,
          start_date: app.users.employment_details.start_date,
          monthly_salary: app.users.employment_details.monthly_salary,
          employment_type: app.users.employment_details.employment_type,
          supervisor_name: app.users.employment_details.supervisor_name,
          supervisor_phone: app.users.employment_details.supervisor_phone
        } : null,
        bank_accounts: app.users.bank_accounts.length > 0 ? {
          bank_name: app.users.bank_accounts[0].bank_name,
          account_type: app.users.bank_accounts[0].account_type,
          account_number: app.users.bank_accounts[0].account_number,
          routing_number: app.users.bank_accounts[0].routing_number,
          is_primary: app.users.bank_accounts[0].is_primary
        } : null
      }
    };

    return NextResponse.json(formattedApplication);
  } catch (error) {
    console.error('Error fetching loan application:', error);
    return NextResponse.json(
      { error: 'Failed to fetch loan application' },
      { status: 500 }
    );
  }
}