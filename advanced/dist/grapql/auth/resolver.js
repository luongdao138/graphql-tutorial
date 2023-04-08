"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
const auth_1 = require("../../utils/auth");
const type_graphql_1 = require("type-graphql");
const register_1 = require("./input/register");
const User_1 = require("../../models/User");
const login_1 = require("./input/login");
const errors_1 = require("../../utils/errors");
const zod_1 = require("../../utils/validators/zod");
const auth_2 = require("../../utils/validators/auth");
const auth_3 = require("../../middlewares/auth");
let LoginResponse = class LoginResponse {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], LoginResponse.prototype, "token", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User, { nullable: false }),
    __metadata("design:type", User_1.User)
], LoginResponse.prototype, "user", void 0);
LoginResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], LoginResponse);
let AuthResolver = class AuthResolver {
    constructor() {
        this.authUtil = new auth_1.AuthUtil();
    }
    async me({ em, req }) {
        const userId = (0, auth_3.validatorReq)(req);
        const user = await em.findOneOrFail(User_1.User, { id: userId });
        return user;
    }
    async register(data, { em }) {
        const validated = (0, zod_1.validator)(data, auth_2.registerSchema);
        const existing = await em.findOne(User_1.User, { username: validated.username });
        if (existing) {
            throw new errors_1.CustomGraphQLError({
                code: errors_1.ApolloErrorCode.DUPLICATE_ERROR,
                message: "User already exists!",
            });
        }
        const hashedPwd = await this.authUtil.hashPwd(validated.password);
        const user = em.create(User_1.User, {
            username: validated.username,
            password_hash: hashedPwd,
        });
        await em.persistAndFlush(user);
        return user;
    }
    async login(data, { em, res }) {
        const validated = (0, zod_1.validator)(data, auth_2.loginSchema);
        const existing = await em.findOne(User_1.User, { username: validated.username });
        if (!existing) {
            throw new errors_1.CustomGraphQLError({
                code: errors_1.ApolloErrorCode.BAD_REQUEST,
                message: "Credentials not valid!",
            });
        }
        const isValid = await this.authUtil.verifyPwd(existing.password_hash, validated.password);
        if (!isValid) {
            throw new errors_1.CustomGraphQLError({
                code: errors_1.ApolloErrorCode.BAD_REQUEST,
                message: "Credentials not valid!",
            });
        }
        const token = await this.authUtil.generateAccessToken(existing.id);
        return {
            token,
            user: existing,
        };
    }
    async logout({ req }) {
        const userId = req.user_id;
        if (!userId)
            return;
        await this.authUtil.deleteToken(userId, req.token);
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => User_1.User, { nullable: false }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_1.RegisterReq, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => LoginResponse, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_1.LoginReq, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "logout", null);
AuthResolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=resolver.js.map