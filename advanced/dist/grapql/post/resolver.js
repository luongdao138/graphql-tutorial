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
exports.PostResolver = void 0;
const pagination_cursor_1 = require("../../utils/pagination-cursor");
const type_graphql_1 = require("type-graphql");
const auth_1 = require("../../middlewares/auth");
const Post_1 = require("../../models/Post");
const User_1 = require("../../models/User");
const zod_1 = require("../../utils/validators/zod");
const type_1 = require("../common/type");
const getUserPosts_1 = require("../user/args/getUserPosts");
const createPost_1 = require("./input/createPost");
const updatePost_1 = require("./input/updatePost");
const evaluatePost_1 = require("./input/evaluatePost");
let UserPostResponse = class UserPostResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [Post_1.Post]),
    __metadata("design:type", Array)
], UserPostResponse.prototype, "data", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_1.ReponsePaginationCursor, { nullable: false }),
    __metadata("design:type", Object)
], UserPostResponse.prototype, "pagination", void 0);
UserPostResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserPostResponse);
let PostResolver = class PostResolver {
    getPost(id, { em }) {
        return em.findOneOrFail(Post_1.Post, { id });
    }
    async createPost(newPostReq, { em, req }) {
        const userId = req.user_id;
        const post = em.create(Post_1.Post, Object.assign(Object.assign({}, newPostReq), { user: userId }));
        em.persist(post);
        await em.flush();
        return post;
    }
    async updatePost(id, data, { em, req }) {
        const userId = req.user_id;
        const post = await em.findOneOrFail(Post_1.Post, { id: id, user: userId });
        if (data.title) {
            post.title = data.title;
            await em.flush();
        }
        return post;
    }
    async deletePost(id, { em }) {
        const post = em.getReference(Post_1.Post, id);
        if (!(post === null || post === void 0 ? void 0 : post.id))
            return false;
        await em.remove(post).flush();
        return true;
    }
    async user(post, { em }) {
        var _a;
        const userId = (_a = post.user) === null || _a === void 0 ? void 0 : _a.id;
        return await em.findOne(User_1.User, { id: userId });
    }
    async getUserPosts(userId, params, { em }) {
        const validated = (0, zod_1.validator)(params, zod_1.PaginationValidator.merge(zod_1.OrderValidator));
        const { cursor, take } = validated;
        const whereOpts = { user: userId };
        if (cursor) {
            const decryptedCursor = (0, pagination_cursor_1.decryptCursor)(cursor);
            whereOpts.id = { $lte: decryptedCursor };
        }
        const posts = await em.find(Post_1.Post, whereOpts, {
            limit: take + 1,
            orderBy: { id: "DESC" },
        });
        const hasMore = posts.length === take + 1;
        let nextToken = null;
        if (hasMore) {
            const nextCursorRecord = posts[take];
            nextToken = (0, pagination_cursor_1.encryptCursor)(nextCursorRecord.id);
            posts.pop();
        }
        return {
            data: posts,
            pagination: {
                hasMore,
                limit: take,
                nextToken,
            },
        };
    }
    async evaluatePost({ em }, data) {
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => Post_1.Post, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getPost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Post_1.Post, { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(auth_1.AuthGuard),
    __param(0, (0, type_graphql_1.Arg)("data", { nullable: false })),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createPost_1.CreatePostReq, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Post_1.Post, { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(auth_1.AuthGuard),
    __param(0, (0, type_graphql_1.Arg)("id", () => String, { nullable: false })),
    __param(1, (0, type_graphql_1.Arg)("data", () => updatePost_1.UpdatePostReq, { nullable: false })),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updatePost_1.UpdatePostReq, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "updatePost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(auth_1.AuthGuard),
    __param(0, (0, type_graphql_1.Arg)("id", () => String, { nullable: false })),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deletePost", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => User_1.User),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Post_1.Post, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "user", null);
__decorate([
    (0, type_graphql_1.Query)(() => UserPostResponse, { nullable: false }),
    (0, type_graphql_1.UseMiddleware)(auth_1.AuthGuard),
    __param(0, (0, type_graphql_1.Arg)("userId", { nullable: false })),
    __param(1, (0, type_graphql_1.Args)()),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, getUserPosts_1.UserPostParams, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getUserPosts", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean, { nullable: false }),
    (0, type_graphql_1.UseMiddleware)(auth_1.AuthGuard),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, evaluatePost_1.EvaluatePostReq]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "evaluatePost", null);
PostResolver = __decorate([
    (0, type_graphql_1.Resolver)((of) => Post_1.Post)
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=resolver.js.map