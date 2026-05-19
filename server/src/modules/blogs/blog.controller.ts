import { Request, Response } from "express";
import { createBlogSchema } from "./blog.validation.js";
import { createBlog, getBlogByslug, getBlogs } from "./blog.service.js";
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

export const getBlogsController = asyncHandler(async (req: Request, res: Response) => {
    const blogs = await getBlogs();
    res.status(200).json({
        success: true,
        data: blogs
    })



})


export const getBlogBySlugController = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;

    const blog =
        await getBlogByslug(slug as string);

    if (!blog) {
        return res.status(404).json({
            success: false,
            message:
                "Blog not found",
        });
    }

    res.status(200).json({
        success: true,
        data: blog,
    });
})