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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const core_1 = require("@mikro-orm/core");
const type_graphql_1 = require("type-graphql");
const Base_1 = require("./Base");
const User_1 = require("./User");
const generate_id_1 = require("../utils/generate-id");
const PostEvaluation_1 = require("./PostEvaluation");
let Post = class Post extends Base_1.CustomBaseEntity {
    constructor() {
        super(...arguments);
        this.id = (0, generate_id_1.generateEntityId)("", "post");
    }
};
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: false }),
    (0, core_1.PrimaryKey)({ type: "varchar" }),
    __metadata("design:type", String)
], Post.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    (0, core_1.Property)({ type: "text" }),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: false, defaultValue: 0 }),
    (0, core_1.Property)({ type: "int", default: 0 }),
    (0, core_1.Check)({ expression: "like_cnt >= 0" }),
    __metadata("design:type", Number)
], Post.prototype, "like_cnt", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: false, defaultValue: 0 }),
    (0, core_1.Property)({ type: "int", default: 0 }),
    (0, core_1.Check)({ expression: "comment_cnt >= 0" }),
    __metadata("design:type", Number)
], Post.prototype, "comment_cnt", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: false, defaultValue: 0 }),
    (0, core_1.Property)({ type: "int", default: 0 }),
    (0, core_1.Check)({ expression: "upvote_cnt >= 0" }),
    __metadata("design:type", Number)
], Post.prototype, "upvote_cnt", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: false, defaultValue: 0 }),
    (0, core_1.Property)({ type: "int", default: 0 }),
    (0, core_1.Check)({ expression: "downvote_cnt >= 0" }),
    __metadata("design:type", Number)
], Post.prototype, "downvote_cnt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [PostEvaluation_1.PostEvaluation], { nullable: true }),
    (0, core_1.OneToMany)(() => PostEvaluation_1.PostEvaluation, (pe) => pe.post),
    __metadata("design:type", PostEvaluation_1.PostEvaluation)
], Post.prototype, "evaluations", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User, { nullable: false }),
    (0, core_1.ManyToOne)({ entity: () => User_1.User, cascade: [core_1.Cascade.REMOVE, core_1.Cascade.PERSIST] }),
    __metadata("design:type", User_1.User)
], Post.prototype, "user", void 0);
Post = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, core_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map