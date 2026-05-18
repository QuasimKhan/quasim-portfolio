import { Request, Response } from "express";
import { createBlogSchema } from "./blog.validation.js";
import { createBlog } from "./blog.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const createBlogController = asyncHandler(async (req: Request, res: Response) => {
    const validatedData =
        createBlogSchema.parse(req.body);

    const blog = await createBlog(validatedData);

    res.status(201).json({
        success: true,
        data: blog,
    });
})