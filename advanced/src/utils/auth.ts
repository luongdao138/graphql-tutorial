import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { WHITE_LIST_ACCESS_TOKEN_PATTERN } from "../constants/user";
import settings from "../config/setting";
import { CacheUtil } from "./cache";
import { redisClient } from "../config/redis";
import dayjs from "dayjs";
import { JSONToken } from "src";

export class AuthUtil {
  private cacheUtil: CacheUtil;

  constructor() {
    this.cacheUtil = new CacheUtil();
  }

  async hashPwd(password: string) {
    return await argon2.hash(password);
  }

  async verifyPwd(hasedPwd: string, pwd: string) {
    return await argon2.verify(hasedPwd, pwd);
  }

  async generateAccessToken(userId: string | number) {
    const newToken = jwt.sign({ user_id: userId }, settings.jwt.secret, {
      expiresIn: settings.jwt.ttl,
    });

    const listTokenKey = `${WHITE_LIST_ACCESS_TOKEN_PATTERN}${userId}`;

    // testing
    const allTokens = await redisClient.lrange(listTokenKey, 0, -1);

    // remove all expired tokens
    for (const token of allTokens) {
      const jsonToken = JSON.parse(token) as JSONToken;
      if (dayjs().unix() > jsonToken.expiredAt) {
        await redisClient.lrem(listTokenKey, 1, token);
      }
    }

    // save new token to redis
    await redisClient.lpush(
      listTokenKey,
      JSON.stringify({
        token: newToken,
        expiredAt: dayjs().add(settings.jwt.ttl, "seconds").unix(),
      })
    );

    return newToken;
  }

  async deleteToken(userId: string, token?: string): Promise<void> {
    if (!token) return;

    const listTokenKey = `${WHITE_LIST_ACCESS_TOKEN_PATTERN}${userId}`;
    await redisClient.lrem(listTokenKey, 1, token);
  }
}
