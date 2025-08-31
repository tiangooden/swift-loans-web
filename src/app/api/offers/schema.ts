import z from "zod";

export const createOfferSchema = z.object({
    principal: z.number().positive("Amount must be positive"),
    interest_rate: z.number().positive("Interest rate must be positive"),
    term_in_days: z.number().int().positive("Term must be a positive integer"),
});