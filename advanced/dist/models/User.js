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
exports.User = void 0;
const core_1 = require("@mikro-orm/core");
const type_graphql_1 = require("type-graphql");
const Base_1 = require("./Base");
const Post_1 = require("./Post");
const generate_id_1 = require("../utils/generate-id");
let User = class User extends Base_1.CustomBaseEntity {
    constructor() {
        super(...arguments);
        this.id = (0, generate_id_1.generateEntityId)("", "usr");
    }
};
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: false }),
    (0, core_1.PrimaryKey)({ type: "varchar" }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    (0, core_1.Property)({ type: "varchar", unique: true, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, core_1.Property)({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password_hash", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Post_1.Post], { nullable: false }),
    (0, core_1.OneToMany)(() => Post_1.Post, (post) => post.user),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
User = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, core_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map