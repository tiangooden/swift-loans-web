import { NextRequest, NextResponse } from 'next/server';
import z, { ZodSchema } from 'zod';

export function withValidateParams<T extends ZodSchema<any>>(schema: T) {
    return (handler: ({ params }: { params: any }) => Promise<NextResponse>) =>
        async (req: NextRequest, { params }: { params: any }) => {
            try {
                schema.parse(params);
                return handler({ params });
            } catch (e: any) {
                return NextResponse.json(
                    e.issues.map(({ message, path }: { message: string, path: string[] }) => ({ message, path })),
                    { status: 400 }
                );
            }
        };
}
