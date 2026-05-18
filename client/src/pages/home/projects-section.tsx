import Container from "@/components/common/container";
import Section from "@/components/common/section";
import SectionHeading from "@/components/common/section-heading";

import ProjectCard from "@/components/projects/project-card";

import { projects } from "@/constants/projects";

const ProjectSection = () => {
    return (
        <Section>
            <Container>
                <div className="space-y-16">
                    <SectionHeading
                        badge="Projects"
                        title="Selected work & engineering projects"
                        description="A collection of scalable full stack applications focused on clean architecture, modern UI systems, and production-grade engineering."
                    />
                    <div className="grid gap-6 lg:grid-cols-2">
                        {projects.map((project) => (
                            <ProjectCard key={project.title} {...project} />
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default ProjectSection;
