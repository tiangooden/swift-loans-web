import z, { ZodObject } from "zod";
import { BadRequestError } from "./httpErrors";

export const validateSchema = (data: unknown, schema: ZodObject) => {
    try {
        schema.parse(data);
    } catch (e: any) {
        throw new BadRequestError('Validation failed',
            e.issues.map(({ message, path }: { message: string, path: string[] }) => ({ message, path })));
    }
}
