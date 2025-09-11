import { NextResponse } from 'next/server';
import { RedisKey } from 'ioredis';
import { getCache, setCache } from './cache';
import getSessionUser from './getSessionUser';

export function withRedisCacheAdd(ttl = 60, cacheKey: RedisKey) {
    return (handler: (...args: any[]) => Promise<NextResponse>) =>
        async (...args: any[]) => {
            const { id } = await getSessionUser();
            const userCacheKey = `user:${id}:${cacheKey}`;
            const cached = await getCache(userCacheKey);
            if (cached) {
                return NextResponse.json(JSON.parse(cached));
            }
            const response = await handler(...args);
            const data = await response.json();
            await setCache(userCacheKey, JSON.stringify(data), ttl);
            return response;
        };
}
