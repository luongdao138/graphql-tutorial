"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorReq = exports.AuthGuard = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../utils/errors");
const redis_1 = require("../config/redis");
const setting_1 = __importDefault(require("../config/setting"));
const user_1 = require("../constants/user");
const AuthGuard = ({ context }, next) => {
    const userId = context.req.user_id;
    if (!userId) {
        throw new errors_1.CustomGraphQLError({
            code: errors_1.ApolloErrorCode.UNAUTHORIZED,
            message: "Unauthorized",
        });
    }
    return next();
};
exports.AuthGuard = AuthGuard;
function validatorReq(req) {
    const userId = req.user_id;
    if (!userId) {
        throw new errors_1.CustomGraphQLError({
            code: errors_1.ApolloErrorCode.UNAUTHORIZED,
            message: "Unauthorized",
        });
    }
    return userId;
}
exports.validatorReq = validatorReq;
async function default_1(req, rest, next) {
    var _a;
    const authorizationHeader = req.headers["authorization"];
    const token = (_a = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(" ")) === null || _a === void 0 ? void 0 : _a[1];
    if (!token) {
        return next();
    }
    jsonwebtoken_1.default.verify(token, setting_1.default.jwt.secret, async (error, data) => {
        if (error) {
            return next();
        }
        const userId = String(data.user_id);
        const listTokenKey = `${user_1.WHITE_LIST_ACCESS_TOKEN_PATTERN}${userId}`;
        const allTokens = await redis_1.redisClient.lrange(listTokenKey, 0, -1);
        const existToken = allTokens.find((item) => {
            const jsonItem = JSON.parse(item);
            return jsonItem.token === token;
        });
        if (!existToken) {
            return next();
        }
        req.token = existToken;
        req.user_id = userId;
        return next();
    });
}
exports.default = default_1;
//# sourceMappingURL=auth.js.map