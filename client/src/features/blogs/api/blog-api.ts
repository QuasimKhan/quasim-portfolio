import { axiosInstance } from "@/lib/axios";

import type { Blog } from "@/features/blogs/types/blog.types";

import type { ApiResponse } from "@/types/api.types";

import type { CreateBlogInput } from "@/features/admin/schemas/create-blog-schema";

export const getBlogs =
    async (): Promise<
        ApiResponse<Blog[]>
    > => {

        const response =
            await axiosInstance.get<
                ApiResponse<Blog[]>
            >("/blogs");

        return response.data;
    };

export const getBlogBySlug =
    async (
        slug: string
    ): Promise<
        ApiResponse<Blog>
    > => {

        const response =
            await axiosInstance.get<
                ApiResponse<Blog>
            >(`/blogs/${slug}`);

        return response.data;
    };

export const getBlogById =
    async (
        id: string
    ): Promise<
        ApiResponse<Blog>
    > => {

        const response =
            await axiosInstance.get<
                ApiResponse<Blog>
            >(`/blogs/id/${id}`);

        return response.data;
    };

export const createBlog =
    async (
        payload: CreateBlogInput
    ): Promise<
        ApiResponse<Blog>
    > => {

        const response =
            await axiosInstance.post<
                ApiResponse<Blog>
            >(
                "/blogs",
                payload
            );

        return response.data;
    };

export const updateBlog =
    async ({
        id,
        payload,
    }: {
        id: string;

        payload:
        Partial<CreateBlogInput>;
    }): Promise<
        ApiResponse<Blog>
    > => {

        const response =
            await axiosInstance.patch<
                ApiResponse<Blog>
            >(
                `/blogs/id/${id}`,
                payload
            );

        return response.data;
    };