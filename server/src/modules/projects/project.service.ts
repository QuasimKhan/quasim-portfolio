import Project from "./project.model.js";
import { ProjectDocument } from "./project.types.js";


export const createProject = async (payload: ProjectDocument) => {
    const project = await Project.create({
        ...payload
    });
    return project;
}

export const getProjects = async () => {
    const projects = await Project.find().sort({ createdAt: -1 });

    return projects;
}