import { Router } from "express";

import {
    createBlogController,
    getBlogBySlugController,
    getBlogsController,
    updateBlogController,
} from "./blog.controller.js";

const router = Router();

router.post(
    "/",
    createBlogController
);

router.get(
    "/",
    getBlogsController
);

router.get(
    "/:slug",
    getBlogBySlugController
);

router.patch(
    "/id/:id",
    updateBlogController
);

export default router;