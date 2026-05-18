import { ArrowUpRight, GitBranch } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ProjectCardProps {
    title: string;
    description: string;
    techStack: string[];
    githubUrl: string;
    liveUrl: string;
}

const ProjectCard = ({
    title,
    description,
    techStack,
    githubUrl,
    liveUrl,
}: ProjectCardProps) => {
    return (
        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition duration-300 hover:border-white/20 hover:bg-white/[0.07]">
            <div className="space-y-8">
                <div>{}</div>
                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-white">
                        {title}
                    </h3>

                    <p className="leading-8 text-white/60">{description}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                    {techStack.map((tech) => (
                        <div
                            key={tech}
                            className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60"
                        >
                            {tech}
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        size="sm"
                        variant="outline"
                        className="border-white/10 bg-transparent hover:bg-white/10"
                        asChild
                    >
                        <a href={githubUrl} target="_blank" rel="noreferrer">
                            <GitBranch className="mr-2 h-4 w-4" />
                            GitHub
                        </a>
                    </Button>

                    <Button size="sm" asChild>
                        <a href={liveUrl} target="_blank" rel="noreferrer">
                            Live Demo
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
