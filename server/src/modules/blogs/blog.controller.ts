import { Request, Response } from "express";
import { createBlogSchema } from "./blog.validation.js";
import { createBlog, getBlogByslug, getBlogs, updateBlog } from "./blog.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";

export const createBlogController = asyncHandler(async (req: Request, res: Response) => {
    const validatedData =
        createBlogSchema.parse(req.body);

    const blog = await createBlog(validatedData);

    res.status(201).json({
        success: true,
        data: blog,
    });
})

export const getBlogsController =
    asyncHandler(
        async (
            req: Request,
            res: Response
        ) => {

            const page =
                parseInt(
                    req.query.page as string
                ) || 1;

            const limit =
                parseInt(
                    req.query.limit as string
                ) || 6;

            const search =
                (req.query.search as string)
                || "";

            const language =
                (req.query.language as string)
                || "all";

            const {
                blogs,
                nextPage
            } = await getBlogs(
                page,
                limit,
                search,
                language
            );

            res.status(200).json({
                success: true,
                data: blogs,
                nextPage,
            });
        }
    );


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


export const updateBlogController = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const updatedBlog = await updateBlog(id as string, req.body)

    if (!updatedBlog) {
        throw new ApiError(
            404,
            "Blog not found"
        );
    }
    res.status(200).json({
        success: true,

        message:
            "Blog updated successfully",

        data: updatedBlog,
    });

})