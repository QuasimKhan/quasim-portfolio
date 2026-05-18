import { Router } from "express";
import blogRoutes from "../modules/blogs/blog.routes.js";

const router = Router();

router.use("/blogs", blogRoutes);

export default router;