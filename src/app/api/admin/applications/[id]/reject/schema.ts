import { z } from 'zod';

export const rejectApplicationSchema = z.object({
  decision_reason: z.string().min(1, 'Reason for rejection is required.'),
});