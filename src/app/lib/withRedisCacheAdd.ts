import { NextResponse } from 'next/server';
import { RedisKey } from 'ioredis';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getCache, setCache } from './cache';

export function withRedisCacheAdd(ttl = 60, cacheKey: RedisKey) {
    return (handler: (...args: any[]) => Promise<NextResponse>) =>
        async (...args: any[]) => {
            const session = await getServerSession(authOptions);
            if (!session) {
                return NextResponse.json({ error: 'Unauthorized - No session found' }, { status: 401 });
            }
            const { id } = session.user as any;
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
