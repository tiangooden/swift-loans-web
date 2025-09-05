import { z } from 'zod';

export const counterOfferSchema = z.object({
  principal: z.number().positive('Principal must be a positive number'),
  interest_rate: z.number().positive('Interest rate must be a positive number'),
  term_in_days: z.number().int().positive('Term must be a positive integer'),
});
