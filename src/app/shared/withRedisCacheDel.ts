import { NextRequest, NextResponse } from "next/server";
import redis from "./redis";

export function withRedisCacheDel(
    keys: string | string[]
) {
    return (
        handler: (req: NextRequest) => Promise<NextResponse>
    ) => async (req: NextRequest) => {
        const response = await handler(req);
        try {
            if (Array.isArray(keys)) {
                for (const key of keys) {
                    await redis.del(key);
                }
            } else {
                await redis.del(keys);
            }
        } catch (e) {
            console.error("Redis purge failed:", e);
        }
        return response;
    };
}
