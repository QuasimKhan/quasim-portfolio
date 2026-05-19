import { Router } from "express";
import { createBlogController, getBlogBySlugController, getBlogsController } from "./blog.controller.js";

const router = Router();

router.post("/", createBlogController);
router.get("/", getBlogsController)
router.get("/:slug", getBlogBySlugController)

export default router;