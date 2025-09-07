import redis from "./redis";

export async function getCache(key: string) {
    return JSON.parse(await redis.get(key) || '{}');
}

export async function setCache(key: string, value: string, ttl: number) {
    return redis.set(key, JSON.stringify(value), 'EX', ttl);
}

export async function delCache(key: string | string[]) {
    return Array.isArray(key) ? redis.del(...key) : redis.del(key);
}
