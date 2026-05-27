import { Router } from "express";
import blogRoutes from "../modules/blogs/blog.routes.js";
import projectRoutes from "../modules/projects/project.routes.js"

const router = Router();

router.use("/blogs", blogRoutes);
router.use("/projects", projectRoutes)


export default router;