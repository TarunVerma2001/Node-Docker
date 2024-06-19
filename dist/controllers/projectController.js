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
exports.createProject = exports.getProject = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const project_1 = require("../schema/project");
const getProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.body;
        let { apiKey } = req.query;
        const apiKeyRes = yield prisma_1.default.apiKey.findFirst({
            where: { apiKey: apiKey },
        });
        if (!apiKeyRes) {
            return res.status(404).json({
                error: "No Such api_key Exist",
            });
        }
        const project = yield prisma_1.default.project.findFirst({ where: { id: id } });
        if (!project) {
            return res.status(404).json({
                error: "No Project with this Project Id Exist",
            });
        }
        if (apiKeyRes.projectId == id) {
            return res.status(200).json({
                message: "Here is the Project you requested for",
                data: project,
            });
        }
        else {
            return res.status(404).json({
                error: "No Project with this pair of api_key and projectId Exist",
            });
        }
    }
    catch (err) {
        err.status = err.status || 403;
        next(err);
    }
});
exports.getProject = getProject;
const createProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { name, description } = req.body;
        const isValid = project_1.createProjectSchema.safeParse(req.body);
        if (isValid.error) {
            return res.status(400).json({
                error: "Provided input are not valid",
            });
        }
        name = name.toLowerCase();
        const project = yield prisma_1.default.project.create({
            data: {
                name,
                description,
            },
        });
        return res.status(200).json({
            message: "Successfully Created the Project",
            data: project,
        });
    }
    catch (err) {
        err.status = err.status || 403;
        next(err);
    }
});
exports.createProject = createProject;
