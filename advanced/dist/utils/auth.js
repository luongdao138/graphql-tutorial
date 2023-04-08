"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUtil = void 0;
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../constants/user");
const setting_1 = __importDefault(require("../config/setting"));
const cache_1 = require("./cache");
const redis_1 = require("../config/redis");
const dayjs_1 = __importDefault(require("dayjs"));
class AuthUtil {
    constructor() {
        this.cacheUtil = new cache_1.CacheUtil();
    }
    async hashPwd(password) {
        return await argon2_1.default.hash(password);
    }
    async verifyPwd(hasedPwd, pwd) {
        return await argon2_1.default.verify(hasedPwd, pwd);
    }
    async generateAccessToken(userId) {
        const newToken = jsonwebtoken_1.default.sign({ user_id: userId }, setting_1.default.jwt.secret, {
            expiresIn: setting_1.default.jwt.ttl,
        });
        const listTokenKey = `${user_1.WHITE_LIST_ACCESS_TOKEN_PATTERN}${userId}`;
        const allTokens = await redis_1.redisClient.lrange(listTokenKey, 0, -1);
        for (const token of allTokens) {
            const jsonToken = JSON.parse(token);
            if ((0, dayjs_1.default)().unix() > jsonToken.expiredAt) {
                await redis_1.redisClient.lrem(listTokenKey, 1, token);
            }
        }
        await redis_1.redisClient.lpush(listTokenKey, JSON.stringify({
            token: newToken,
            expiredAt: (0, dayjs_1.default)().add(setting_1.default.jwt.ttl, "seconds").unix(),
        }));
        return newToken;
    }
    async deleteToken(userId, token) {
        if (!token)
            return;
        const listTokenKey = `${user_1.WHITE_LIST_ACCESS_TOKEN_PATTERN}${userId}`;
        await redis_1.redisClient.lrem(listTokenKey, 1, token);
    }
}
exports.AuthUtil = AuthUtil;
//# sourceMappingURL=auth.js.map