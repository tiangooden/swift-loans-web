import { NextRequest, NextResponse } from 'next/server';
import z, { ZodSchema } from 'zod';

export function withValidateBody<T extends ZodSchema<any>>(schema: T) {
    return (handler: (req: NextRequest) => Promise<NextResponse>) => async (req: NextRequest) => {
        try {
            const body = await req.json();
            schema.parse(body);
            return handler(req);
        } catch (e: any) {
            return NextResponse.json(e.issues.map((i: any) => i.message), { status: 400 });
        }
    };
}
