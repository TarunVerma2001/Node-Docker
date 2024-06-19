"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const projectRoutes_1 = __importDefault(require("./projectRoutes"));
const apiKeyRoutes_1 = __importDefault(require("./apiKeyRoutes"));
const router = (0, express_1.Router)();
router.use("/auth", authRoutes_1.default);
router.use("/project", projectRoutes_1.default);
router.use("/api", apiKeyRoutes_1.default);
exports.default = router;
