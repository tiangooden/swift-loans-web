import z from "zod";
import { bankAccountsSchema } from "../bank-accounts/schema";
import { employmentsSchema } from "../employment/schema";
import { documentsSchema } from "../files/schema";
import { referencesSchema } from "../references/schema";
import { socialMediasSchema } from "../social-medias/schema";

export const createApplicationRequestSchema = z.object({
    amount_requested: z.float64().min(5000).max(30000),
    term_in_days: z.int().min(1).max(31),
    purpose: z.string().min(2).max(160)
});

export const createApplicationSchema = z.object({
    first_name: z.string().min(2),
    middle_name: z.string().min(1),
    last_name: z.string().min(2),
    email: z.email(),
    dob: z.coerce.date({ error: "Invalid date format", }),
    phone_number: z.string().regex(/^\+?[0-9]{7,15}$/, "Invalid phone number format"),
    trn: z.string().regex(/^\d{9}$/, "TRN must be 9 digits"),
    street_address: z.string().min(3, "Street address too short"),
    city: z.string().min(2, "City is required"),
    country: z.string().min(2, "Country is required"),
    social_medias: z.array(socialMediasSchema).min(1, "Must provide at least 1 social media"),
    employment: z.array(employmentsSchema).min(1, "Must provide employment details"),
    references: z.array(referencesSchema).min(2, "Must provide at least 2 references"),
    bank_account: z.array(bankAccountsSchema).min(1, "Must provide bank account details"),
    documents: z.array(documentsSchema).min(1, "Must provide documents"),
});