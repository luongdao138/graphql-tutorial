import { Redis } from "ioredis";
import { redisClient } from "../config/redis";

export class CacheUtil {
  private redisClient: Redis;

  constructor() {
    this.redisClient = redisClient;
  }

  async set<T>(key: string, value: T, ttl?: number) {
    if (ttl) {
      await this.redisClient.set(key, JSON.stringify(value), "EX", ttl);
    } else {
      await this.redisClient.set(key, JSON.stringify(value));
    }
  }

  async get<T>(cacheKey: string): Promise<T | null> {
    try {
      const cached = await this.redisClient.get(cacheKey);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (err) {
      await this.redisClient.del(cacheKey);
    }
    return null;
  }
}
