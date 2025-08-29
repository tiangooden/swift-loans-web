import z from "zod";

export const documentsSchema = z.object({
    type: z.string().min(2, "Document type required"),
    url: z.url("Invalid document URL"),
});