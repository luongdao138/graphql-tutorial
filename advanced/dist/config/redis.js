"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRedisDB = exports.redisClient = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const index_1 = __importDefault(require("./index"));
let redisClient;
exports.redisClient = redisClient;
function connectRedisDB() {
    exports.redisClient = redisClient = new ioredis_1.default({
        host: index_1.default.redis.host,
        port: index_1.default.redis.port,
    });
}
exports.connectRedisDB = connectRedisDB;
//# sourceMappingURL=redis.js.map