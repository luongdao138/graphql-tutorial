"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
const registerSchema = zod_1.z.object({
    username: zod_1.z.string().nonempty().min(2).max(30),
    password: zod_1.z.string().nonempty().min(6).max(30),
});
exports.registerSchema = registerSchema;
const loginSchema = zod_1.z.object({
    username: zod_1.z.string().nonempty(),
    password: zod_1.z.string().nonempty(),
});
exports.loginSchema = loginSchema;
//# sourceMappingURL=auth.js.map