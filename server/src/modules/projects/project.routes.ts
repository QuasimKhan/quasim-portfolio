import { Router } from "express";
import { createProjectController, getProjectsController } from "./project.controller.js";

const router = Router()


router.post("/", createProjectController);
router.get("/", getProjectsController)


export default router;