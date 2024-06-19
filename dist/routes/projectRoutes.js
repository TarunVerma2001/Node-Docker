"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectController_1 = require("../controllers/projectController");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const router = (0, express_1.Router)();
router.post("/get", isAuthenticated_1.isAuthenticated, projectController_1.getProject);
router.post("/create", isAuthenticated_1.isAuthenticated, projectController_1.createProject);
exports.default = router;
