"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiKey = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../db/prisma"));
const apiKey_1 = require("../schema/apiKey");
const library_1 = require("@prisma/client/runtime/library");
const createApiKey = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { projectId } = req.body;
        const apiKey = yield bcryptjs_1.default.hash(projectId, 12);
        const isValid = apiKey_1.createApiKeySchema.safeParse(req.body);
        if (isValid.error) {
            return res.status(400).json({
                error: "Provided input are not valid",
            });
        }
        yield prisma_1.default.apiKey.create({
            data: {
                projectId,
                apiKey,
            },
        });
        return res.status(200).json({
            message: "Successfully Created Api Key for this Project",
            apiKey: apiKey,
        });
    }
    catch (err) {
        if (err instanceof library_1.PrismaClientKnownRequestError) {
            return res.status(404).json({
                message: "No Project with such Project Id",
            });
        }
        err.status = err.status || 403;
        next(err);
    }
});
exports.createApiKey = createApiKey;
