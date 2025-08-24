export interface LoanApplication {
  id: string;
  amount_requested: number;
  term_in_days: number;
  status: string;
  created_at: string;
  purpose: string;
  monthly_income: number;
  users: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    street_address: string;
    city: string;
    state: string;
    zip_code: string;
    date_of_birth: string;
    ssn: string;
    bank_account: {
      bank_name: string;
      branch_name: string;
      account_name: string;
      account_type: string;
      account_number: string;
    } | null;
    employment: {
      employer_name: string;
      job_title: string;
      start_date: string;
      monthly_income: number;
      payday_day: number;
    } | null;
  },
  offers: [];
}

export interface AdminLoanOffersProps {
  applicationId: string,
  offers: any[];
}
