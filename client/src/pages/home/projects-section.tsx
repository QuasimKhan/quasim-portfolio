import Container from "@/components/common/container";
import Section from "@/components/common/section";
import SectionHeading from "@/components/common/section-heading";

import ProjectCard from "@/features/projects/components/project-card";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getProjects } from "@/features/projects/api/project-api";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ProjectSection = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: queryKeys.projects,
        queryFn: getProjects,
    });

    const projects = data?.data.slice(0, 3) || [];

    if (isLoading) {
        return (
            <Section>
                <Container>
                    <div className="flex min-h-[50vh] items-center justify-center">
                        <p className="text-white/60">Loading projects...</p>
                    </div>
                </Container>
            </Section>
        );
    }

    if (isError) {
        return (
            <Section>
                <Container>
                    <div className="flex min-h-[50vh] items-center justify-center">
                        <p className="text-red-400">Failed to load projects.</p>
                    </div>
                </Container>
            </Section>
        );
    }

    return (
        <Section>
            <Container>
                <div className="space-y-16">
                    <SectionHeading
                        badge="Projects"
                        title="Selected work & engineering projects"
                        description="A collection of scalable full stack applications focused on clean architecture, modern UI systems, and production-grade engineering."
                    />
                    <div className="grid gap-6 lg:grid-cols-3">
                        {projects.map((project) => (
                            <ProjectCard key={project.title} {...project} />
                        ))}
                    </div>

                    <div className="flex justify-center items-center py-4">
                        <Button
                            size="sm"
                            variant="outline"
                            className="border-white/10 bg-transparent hover:bg-white/10"
                            asChild
                        >
                            <Link to="/projects">
                                <span className="flex items-center gap-2">
                                    View all projects
                                    <ArrowRight className="h-4 w-4" />
                                </span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default ProjectSection;
