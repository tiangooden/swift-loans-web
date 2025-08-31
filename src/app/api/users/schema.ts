import z from "zod";

export const createUserSchema = z.object({
    first_name: z.string().min(2),
    middle_name: z.string().optional(),
    last_name: z.string().min(2),
    alias: z.string().optional(),
    email: z.email(),
    dob: z.date({ error: "Invalid date format" }),
    phone_number: z.string().regex(/^\+?[0-9]{7,15}$/, "Invalid phone number format"),
    trn: z.string().regex(/^\d{9}$/, "TRN must be 9 digits"),
    street_address: z.string().min(3, "Street address too short"),
    city: z.string().min(2, "City is required"),
    country: z.string().min(2, "Country is required"),
});

export const updateUserSchema = createUserSchema;