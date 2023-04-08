"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheUtil = void 0;
const redis_1 = require("../config/redis");
class CacheUtil {
    constructor() {
        this.redisClient = redis_1.redisClient;
    }
    async set(key, value, ttl) {
        if (ttl) {
            await this.redisClient.set(key, JSON.stringify(value), "EX", ttl);
        }
        else {
            await this.redisClient.set(key, JSON.stringify(value));
        }
    }
    async get(cacheKey) {
        try {
            const cached = await this.redisClient.get(cacheKey);
            if (cached) {
                return JSON.parse(cached);
            }
        }
        catch (err) {
            await this.redisClient.del(cacheKey);
        }
        return null;
    }
}
exports.CacheUtil = CacheUtil;
//# sourceMappingURL=cache.js.map