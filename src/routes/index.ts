import { Router } from "express";
import authRoute from "./authRoutes";
import projectRoute from "./projectRoutes";
import apiRoute from "./apiKeyRoutes";

const router = Router();

router.use("/auth", authRoute);
router.use("/project", projectRoute);
router.use("/api", apiRoute);

export default router;
