import { z } from 'zod';

export const loanApplicationSchema = z.object({
  amount_requested: z.coerce.number().min(1, 'Amount requested is required'),
  term_in_days: z.coerce.number().min(1, 'Term in days is required'),
  purpose: z.string().min(1, 'Purpose is required'),
});