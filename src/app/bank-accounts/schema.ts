import { z } from 'zod';

export const bankAccountSchema = z.object({
  bank_name: z.string().min(1, 'Bank Name is required'),
  branch_name: z.string().min(1, 'Branch Name is required'),
  account_name: z.string().min(1, 'Account Name is required'),
  account_number: z.string().min(1, 'Account Number is required'),
  account_type: z.enum(['Savings', 'Checking'], { message: 'Account Type is required' }),
});