"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const apiKeyController_1 = require("../controllers/apiKeyController");
const router = (0, express_1.Router)();
router.post("/create", isAuthenticated_1.isAuthenticated, apiKeyController_1.createApiKey);
exports.default = router;
