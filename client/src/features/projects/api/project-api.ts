import type { ApiResponse } from "@/types/api.types";
import type { Project } from "../types/project.types";
import { axiosInstance } from "@/lib/axios";

export const getProjects = async (): Promise<ApiResponse<Project[]>> => {
    const response = await axiosInstance.get<ApiResponse<Project[]>>("/projects")

    return response.data
}