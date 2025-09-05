import { NextRequest, NextResponse } from 'next/server';
import redis from './redis';
import { RedisKey } from 'ioredis';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export function withRedisCacheAdd(ttl = 60, cacheKey: RedisKey) {
    return (handler: (req: NextRequest, ...args: any[]) => Promise<NextResponse>) =>
        async (req: NextRequest, ...args: any[]) => {
            const session = await getServerSession(authOptions);
            if (!session) {
                return NextResponse.json({ error: 'Unauthorized - No session found' }, { status: 401 });
            }
            const { id } = session.user as any;
            const userCacheKey = `user:${id}:${cacheKey}`;
            const cached = await redis.get(userCacheKey);
            if (cached) {
                return NextResponse.json(JSON.parse(cached));
            }
            const response = await handler(req, ...args);
            const data = await response.json();
            await redis.set(userCacheKey, JSON.stringify(data), 'EX', ttl);
            return response;
        };
}
