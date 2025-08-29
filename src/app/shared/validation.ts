import z, { ZodObject } from "zod";
import { BadRequestError } from "./http-errors";

export const validateSchema = (data: unknown, schema: ZodObject) => {
    try {
        schema.parse(data);
    } catch (e: any) {
        throw new BadRequestError(e.issues.map((i: any) => i.message));
    }
}
