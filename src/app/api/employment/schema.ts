import z from "zod";
import { PAY_CYCLE } from "../../lib/constants";

export const employmentsSchema = z.object({
    employer_name: z.string().min(2, "Employer name required"),

    employer_phone_number: z
        .string()
        .nonempty("Employer phone number is required")
        .regex(/^\+?[0-9]{7,15}$/, "Invalid phone number format"),

    job_title: z.string().min(2, "Job title required"),

    date_of_employment: z.date({ error: "Invalid date format", }),

    gross_salary: z
        .number({ message: "Gross salary is required" })
        .positive("Gross salary must be greater than 0"),

    payday_day: z
        .number({ message: "Payday is required" })
        .int()
        .min(1, "Payday must be at least 1")
        .max(31, "Payday must be at most 31"),

    pay_cycle: z.enum(
        [PAY_CYCLE.WEEKLY, PAY_CYCLE.FORTNIGHTLY, PAY_CYCLE.MONTHLY],
        { message: "Pay cycle is required" }
    ),

    total_expenses_per_cycle: z
        .number({ message: "Total expenses per cycle is required" })
        .min(0, "Total expenses per cycle must be 0 or greater"),
});
