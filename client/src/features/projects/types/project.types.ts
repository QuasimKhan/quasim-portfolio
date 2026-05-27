export interface Project {
    _id: string;
    title: string;
    image?: string;
    description: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
}