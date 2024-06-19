"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z
    .object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
    name: zod_1.z.string(),
})
    .strict();
exports.signInSchema = zod_1.z
    .object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
})
    .strict();
