import { z } from 'zod';

export const createOfferSchema = z.object({
  amount: z.coerce.number().min(1, 'Amount is required'),
  interest_rate: z.coerce.number().min(1, 'Interest rate is required'),
  term: z.coerce.number().min(1, 'Term is required'),
  status: z.string().optional(),
});

export const counterOfferSchema = z.object({
  amount: z.coerce.number().min(1, 'Counter offer amount is required'),
  interest_rate: z.coerce.number().min(0.01, 'Counter offer interest rate is required'),
  term: z.coerce.number().min(1, 'Counter offer term is required'),
});
