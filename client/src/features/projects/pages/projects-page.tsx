import { queryKeys } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../api/project-api";
import Section from "@/components/common/section";
import Container from "@/components/common/container";
import PageHero from "@/components/common/page-hero";
import ProjectCard from "../components/project-card";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const ProjectsPage = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: queryKeys.projects,
        queryFn: getProjects,
    });

    const projects = data?.data || [];

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
        <>
            <PageHero
                title="Projects"
                description="Projects, I worked with Heart."
            />

            <Section className="relative overflow-hidden pt-14">
                {/* Background Glow */}
                <div className="absolute inset-0 -z-20 overflow-hidden">
                    <div className="absolute left-1/2 top-0 h-100 w-100 -translate-x-1/2 rounded-full bg-white/4 blur-3xl" />
                </div>

                <Container>
                    <div className="space-y-10">
                        {/* Empty State */}
                        {projects.length === 0 ? (
                            <div className="flex min-h-80 flex-col items-center justify-center space-y-5 rounded-4xl border border-dashed border-white/10 bg-white/2 px-6 text-center">
                                <div className="space-y-3">
                                    <h3 className="text-3xl font-semibold tracking-tight text-white">
                                        No Project found
                                    </h3>
                                </div>
                            </div>
                        ) : (
                            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                {projects.map((project, index) => (
                                    <motion.div
                                        key={project._id}
                                        initial={{
                                            opacity: 0,
                                            y: 30,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            delay: index * 0.05,
                                        }}
                                    >
                                        <ProjectCard {...project} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </Container>
            </Section>
        </>
    );
};

export default ProjectsPage;
