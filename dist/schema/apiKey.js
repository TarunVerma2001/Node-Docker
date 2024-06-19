"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiKeySchema = void 0;
const zod_1 = require("zod");
exports.createApiKeySchema = zod_1.z
    .object({
    projectId: zod_1.z.string(),
})
    .strict();
