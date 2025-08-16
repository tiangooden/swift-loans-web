export interface LoanApplication {
  id: string;
  amount_requested: number;
  term_in_days: number;
  status: string;
  created_at: string;
  purpose: string;
  employment_status: string;
  monthly_income: number;
  credit_score: number;
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
    bank_accounts: [{
      bank_name: string;
      account_type: string;
      account_number: string;
      routing_number: string;
      is_primary: boolean;
    }] | null;
    employments: {
      employer_name: string;
      job_title: string;
      start_date: string;
      monthly_income: number;
      employment_type: string;
      payday_day: string;
    } | null;
  };
}

export interface LoanOffer {
  id: string;
  amount_offered: number;
  interest_rate: number;
  term_in_days: number;
  monthly_payment: number;
  total_interest: number;
  total_amount: number;
  status: string;
  created_at: string;
}