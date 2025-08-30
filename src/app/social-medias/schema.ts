import { z } from 'zod';

export const socialMediaSchema = z.object({
  platform: z.string().min(1, 'Platform is required'),
  username: z.string().min(1, 'Username is required'),
});