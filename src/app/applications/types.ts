export interface LoanApplication {
  offers: any;
  id: string;
  amount_requested: number;
  term_in_days: number;
  purpose: string;
  status: string;
  submitted_at: string;
  decided_at?: string;
  decision_reason?: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  documents?: {
    id: number;
    name: string;
    url: string;
    created_at: string;
  }[];
  employments?: {
    employer_name: string;
    job_title: string;
    gross_salary: number;
    employment_length: string;
  }[];
  bank_account?: {
    bank_name: string;
    account_type: string;
    last_four: string;
  }[];
}

export interface LoanOffer {
  id: number;
  principal: number;
  interest_rate: number;
  fee_amount: number;
  repayment_date: string;
  total_due: number;
  offer_status: string;
  created_at: string;
}

export interface ApplicationFormProps {
  data: {
    id: string;
    amount_requested: number;
    term_in_days: number;
    purpose: string;
  } | null;
  errors: string[];
  saving: boolean;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}