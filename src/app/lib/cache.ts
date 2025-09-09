import redis from "./redis";

export const getCache = async (key: string): Promise<string | null> => {
    return await redis.get(key);
}

export const setCache = async (key: string, value: string, ttl?: number): Promise<string> => {
    return await redis.set(key, value, 'EX', ttl || 60);
}

export const delCache = async (key: string | string[]): Promise<void> => {
    Array.isArray(key) ? await redis.del(...key) : await redis.del(key);
}
