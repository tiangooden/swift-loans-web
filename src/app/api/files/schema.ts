import z from "zod";

export const documentsSchema = z.object({
  name: z.string().min(1, "Name is required."),
  type: z.string().min(1, "Type is required."),
  size: z.number().int("Size must be an integer.").positive("Size must be a positive number."),
  key: z.string().optional(),
  verified: z.boolean().optional(),
});