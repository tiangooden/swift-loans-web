export interface BankAccount {
  id?: number;
  user_id?: number | null;
  bank_name: string | null;
  branch_name: string | null;
  account_name: string | null;
  account_number: string | null;
  account_type: string | null;
}