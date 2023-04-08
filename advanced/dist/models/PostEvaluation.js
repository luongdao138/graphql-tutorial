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
exports.PostEvaluation = void 0;
const core_1 = require("@mikro-orm/core");
const type_graphql_1 = require("type-graphql");
const evaluatePost_1 = require("../grapql/post/input/evaluatePost");
const Post_1 = require("./Post");
const User_1 = require("./User");
let PostEvaluation = class PostEvaluation {
    constructor() {
        this.created_at = new Date();
    }
};
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: false }),
    (0, core_1.Property)({ primary: true, type: "varchar" }),
    __metadata("design:type", String)
], PostEvaluation.prototype, "user_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: false }),
    (0, core_1.Property)({ primary: true, type: "varchar" }),
    __metadata("design:type", String)
], PostEvaluation.prototype, "post_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User, { nullable: false }),
    (0, core_1.ManyToOne)(() => User_1.User, { cascade: [core_1.Cascade.REMOVE, core_1.Cascade.PERSIST] }),
    __metadata("design:type", User_1.User)
], PostEvaluation.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Post_1.Post, { nullable: false }),
    (0, core_1.ManyToOne)(() => Post_1.Post, { cascade: [core_1.Cascade.REMOVE, core_1.Cascade.PERSIST] }),
    __metadata("design:type", Post_1.Post)
], PostEvaluation.prototype, "post", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => evaluatePost_1.EvaluatePostType, { nullable: false }),
    (0, core_1.Enum)({ items: () => evaluatePost_1.EvaluatePostType, nullable: false }),
    __metadata("design:type", String)
], PostEvaluation.prototype, "value", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int, { nullable: true }),
    (0, core_1.Property)({ type: "datetime" }),
    __metadata("design:type", Object)
], PostEvaluation.prototype, "created_at", void 0);
PostEvaluation = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, core_1.Entity)({ tableName: "post_evaluation" })
], PostEvaluation);
exports.PostEvaluation = PostEvaluation;
//# sourceMappingURL=PostEvaluation.js.map