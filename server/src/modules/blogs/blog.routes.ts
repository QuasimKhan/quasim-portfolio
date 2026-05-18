import { Router } from "express";
import { createBlogController } from "./blog.controller.js";

const router = Router();

router.post("/", createBlogController);

export default router;