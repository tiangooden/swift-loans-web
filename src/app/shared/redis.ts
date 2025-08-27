import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

export const getJSON = async (key: string): Promise<string | null> => {
    const cache = await redis.get(key);
    try {
        return JSON.parse(cache!);
    } catch (e) {
        return null;
    }
}
export const setJSON = async (key: string, value: object): Promise<string> =>
    await redis.set(key, JSON.stringify(value), "EX", Number(process.env.REDIS_CACHE_TIME || 3600));

export const del = async (key: string): Promise<number> =>
    await redis.del(key);

export default redis;