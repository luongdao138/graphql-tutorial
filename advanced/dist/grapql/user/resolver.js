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
exports.UserResolver = void 0;
const pagination_cursor_1 = require("../../utils/pagination-cursor");
const type_graphql_1 = require("type-graphql");
const auth_1 = require("../../middlewares/auth");
const Post_1 = require("../../models/Post");
const User_1 = require("../../models/User");
const zod_1 = require("../../utils/validators/zod");
const getUserPosts_1 = require("./args/getUserPosts");
let UserResolver = class UserResolver {
    async posts(params, user, { em }) {
        const validated = (0, zod_1.validator)(params, zod_1.PaginationValidator.merge(zod_1.OrderValidator));
        const { cursor, take } = validated;
        const whereOpts = { user: user.id };
        if (cursor) {
            const decryptedCursor = (0, pagination_cursor_1.decryptCursor)(cursor);
            whereOpts.id = { $lte: decryptedCursor };
        }
        const posts = await em.find(Post_1.Post, whereOpts, {
            limit: take,
            orderBy: { id: "DESC" },
        });
        return posts;
    }
};
__decorate([
    (0, type_graphql_1.FieldResolver)(() => [Post_1.Post]),
    (0, type_graphql_1.UseMiddleware)(auth_1.AuthGuard),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Root)()),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getUserPosts_1.UserPostParams,
        User_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "posts", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)((of) => User_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=resolver.js.map