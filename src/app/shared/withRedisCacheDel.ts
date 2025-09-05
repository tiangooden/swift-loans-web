import { NextRequest, NextResponse } from "next/server";
import redis from "./redis";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export function withRedisCacheDel(keys: string | string[]) {
    return (handler: (req: NextRequest, ...args: any[]) => Promise<NextResponse>) =>
        async (req: NextRequest, ...args: any[]) => {
            const session = await getServerSession(authOptions);
            if (!session) {
                return NextResponse.json({ error: 'Unauthorized - No session found' }, { status: 401 });
            }
            const { id } = session.user as any;
            const response = await handler(req, ...args);
            try {
                if (Array.isArray(keys)) {
                    for (const key of keys) {
                        const userCacheKey = `user:${id}:${key}`;
                        await redis.del(userCacheKey);
                    }
                } else {
                    const userCacheKey = `user:${id}:${keys}`;
                    await redis.del(userCacheKey);
                }
            } catch (e) {
                console.error("Redis purge failed:", e);
            }
            return response;
        };
}
