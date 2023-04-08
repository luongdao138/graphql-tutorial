import Redis from "ioredis";
import appConfig from "./index";

let redisClient: Redis;

function connectRedisDB() {
  redisClient = new Redis({
    host: appConfig.redis.host,
    port: appConfig.redis.port,
    // password: appConfig.redis.password,
  });
}

export { redisClient, connectRedisDB };
