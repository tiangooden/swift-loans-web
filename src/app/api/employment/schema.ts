import z from "zod";

export const employmentsSchema = z.object({
    company: z.string().min(2, "Company name required"),
    position: z.string().min(2, "Position required"),
    start_date: z.coerce.date({ error: "Invalid start date" }),
    end_date: z.coerce.date().optional(),
});