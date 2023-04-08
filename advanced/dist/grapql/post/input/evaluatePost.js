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
exports.EvaluatePostReq = exports.EvaluatePostType = void 0;
const type_graphql_1 = require("type-graphql");
var EvaluatePostType;
(function (EvaluatePostType) {
    EvaluatePostType["UPVOTE"] = "UPVOTE";
    EvaluatePostType["DOWNVOTE"] = "DOWNVOTE";
})(EvaluatePostType = exports.EvaluatePostType || (exports.EvaluatePostType = {}));
(0, type_graphql_1.registerEnumType)(EvaluatePostType, { name: "EvaluatePostType" });
let EvaluatePostReq = class EvaluatePostReq {
};
__decorate([
    (0, type_graphql_1.Field)(() => EvaluatePostType, {
        nullable: true,
        defaultValue: EvaluatePostType.UPVOTE,
    }),
    __metadata("design:type", String)
], EvaluatePostReq.prototype, "type", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: false }),
    __metadata("design:type", String)
], EvaluatePostReq.prototype, "post_id", void 0);
EvaluatePostReq = __decorate([
    (0, type_graphql_1.InputType)()
], EvaluatePostReq);
exports.EvaluatePostReq = EvaluatePostReq;
//# sourceMappingURL=evaluatePost.js.map