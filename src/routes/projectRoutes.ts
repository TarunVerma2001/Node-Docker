import { Router } from "express";
import { createProject, getProject } from "../controllers/projectController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = Router();

router.post("/get", isAuthenticated, getProject);
router.post("/create", isAuthenticated, createProject);

export default router;
