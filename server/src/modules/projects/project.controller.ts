import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createProjectSchema } from "./project.validation.js";
import { createProject, getProjects } from "./project.service.js";


export const createProjectController = asyncHandler(async (req: Request, res: Response) => {
    const validatedData = createProjectSchema.parse(req.body)
    const project = await createProject(validatedData)

    res.status(201).json({
        success: true,
        data: project,
    });
})


export const getProjectsController = asyncHandler(async (req: Request, res: Response) => {
    const projects = await getProjects()

    return res.status(200).json({
        success: true,
        data: projects
    })
})