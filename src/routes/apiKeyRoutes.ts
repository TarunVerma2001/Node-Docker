import { Router } from "express";

import { isAuthenticated } from "../middlewares/isAuthenticated";
import { createApiKey } from "../controllers/apiKeyController";

const router = Router();

router.post("/create", isAuthenticated, createApiKey);

export default router;
