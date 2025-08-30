import { NextRequest, NextResponse } from 'next/server';
import z, { ZodSchema } from 'zod';

export function withValidateBody<T extends ZodSchema<any>>(schema: T) {
    return (handler: (req: NextRequest, { data }: { data: any }) =>
        Promise<NextResponse>) =>
        async (req: NextRequest) => {
            try {
                const data = await req.json();
                schema.parse(data);
                return handler(req, { data });
            } catch (e: any) {
                return NextResponse.json(
                    e.issues.map(({ message, path }: { message: string, path: string[] }) => ({ message, path })),
                    { status: 400 }
                );
            }
        };
}
