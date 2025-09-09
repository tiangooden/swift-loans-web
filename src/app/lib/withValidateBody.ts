import { NextRequest, NextResponse } from 'next/server';
import z, { ZodSchema } from 'zod';

export function withValidateBody<T extends ZodSchema<any>>(schema: T) {
    return (handler: ({ req, data, params }: { req: NextRequest, data: any, params: any }) => Promise<NextResponse>) =>
        async (req: NextRequest, { params }: { params: any }) => {
            try {
                const data = await req.json();
                schema.parse(data);
                return handler({ req, data, params });
            } catch (e: any) {
                return NextResponse.json(
                    e.issues.map(({ message, path }: { message: string, path: string[] }) => ({ message, path })),
                    { status: 400 }
                );
            }
        };
}
