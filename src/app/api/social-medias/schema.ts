import z from "zod";

export const socialMediasSchema = z.object({
    platform: z.string().min(2, "Platform name required"),
    handle: z.string().min(2, "Handle required"),
});