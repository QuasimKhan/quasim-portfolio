import mongoose from "mongoose";
import { ProjectDocument } from "./project.types.js";

const projectSchema = new mongoose.Schema<ProjectDocument>({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    techStack: [
        {
            type: String
        }
    ],
    githubUrl: {
        type: String
    },
    liveUrl: {
        type: String
    }
}, {
    timestamps: true

});

const Project = mongoose.model<ProjectDocument>("Project", projectSchema);

export default Project;