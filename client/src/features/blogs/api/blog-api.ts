import { axiosInstance } from "@/lib/axios";
import type { Blog } from "@/features/blogs/types/blog.types";
import type { ApiResponse } from "@/types/api.types";


export const getBlogs = async (): Promise<ApiResponse<Blog[]>> => {
    const response = await axiosInstance.get<ApiResponse<Blog[]>>("/blogs");

    return response.data;
}


export const getBlogByslug = async (slug: string): Promise<ApiResponse<Blog>> => {
    const response = await axiosInstance.get<ApiResponse<Blog>>(`/blogs/${slug}`)


    return response.data;
}