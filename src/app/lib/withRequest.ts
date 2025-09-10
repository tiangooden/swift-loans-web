import { NextRequest, NextResponse } from 'next/server';

export function withRequest() {
    return (handler: ({ req, data, params }: { req: NextRequest, data: any, params: any }) => Promise<NextResponse>) =>
        async (req: NextRequest, { params }: { params: any }) => {
            try {
                const data = await req.json();
                return handler({ req, data, params });
            } catch (e: any) {
                return handler({ req, data: undefined, params });
            }
        };
}
