import z from "zod";

export const bankAccountsSchema = z.object({
    bank_name: z.string().min(2, "Bank name required"),
    account_number: z.string().regex(/^\d{8,16}$/, "Account number must be 8-16 digits"),
    account_type: z.enum(["savings", "checking"]),
});