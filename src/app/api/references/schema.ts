import z from "zod";

export const referencesSchema = z.object({
    name: z.string().min(2, "Reference name required"),
    email: z.email("Invalid email address"),
    relationship: z.string().min(2, "Relationship required"),
    phone: z.string().regex(/^\+?[0-9]{7,15}$/, "Invalid phone number"),
});