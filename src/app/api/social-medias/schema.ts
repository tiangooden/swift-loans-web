import z from "zod";

export const socialMediasSchema = z.object({
    platform: z.string().min(2, "Platform name required"),
    username: z.string().min(2, "Username required"),
});