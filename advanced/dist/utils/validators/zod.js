"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = exports.OrderValidator = exports.PaginationValidator = void 0;
const zod_1 = require("zod");
const errors_1 = require("../errors");
exports.PaginationValidator = zod_1.z.object({
    cursor: zod_1.z.string().nullable().optional(),
    take: zod_1.z.number().min(1).max(50).default(25),
});
exports.OrderValidator = zod_1.z.object({
    order: zod_1.z.enum(["DESC", "ASC"]).default("DESC"),
});
function validator(input, schema) {
    const validationResult = schema.safeParse(input);
    if (validationResult.success)
        return validationResult.data;
    throw new errors_1.CustomGraphQLError({
        code: errors_1.ApolloErrorCode.BAD_USER_INPUT,
        message: "Input validation failed",
        detail: validationResult.error.flatten(),
    });
}
exports.validator = validator;
//# sourceMappingURL=zod.js.map