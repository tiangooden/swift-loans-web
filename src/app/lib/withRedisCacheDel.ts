import { NextResponse } from "next/server";
import { delCache } from "./cache";
import getSessionUser from "./getSessionUser";

export function withRedisCacheDel(keys: string | string[]) {
    return (handler: (...args: any[]) => Promise<NextResponse>) =>
        async (...args: any[]) => {
            const { id } = await getSessionUser();
            const response = await handler(...args);
            try {
                if (Array.isArray(keys)) {
                    for (const key of keys) {
                        const userCacheKey = `user:${id}:${key}`;
                        await delCache(userCacheKey);
                    }
                } else {
                    const userCacheKey = `user:${id}:${keys}`;
                    await delCache(userCacheKey);
                }
            } catch (e) {
                console.error("Redis purge failed:", e);
            }
            return response;
        };
}
