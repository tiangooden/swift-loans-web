import { NextRequest, NextResponse } from 'next/server';
import redis from './redis';
import { RedisKey } from 'ioredis';

export function withRedisCacheAdd(ttl = 60, cacheKey: RedisKey) {
    return (handler: (req: NextRequest) => Promise<NextResponse>) => async (req: NextRequest) => {
        const cached = await redis.get(cacheKey);
        if (cached) {
            return NextResponse.json(JSON.parse(cached));
        }
        const response = await handler(req);
        const data = await response.json();
        await redis.set(cacheKey, JSON.stringify(data), 'EX', ttl);
        return response;
    };
}
