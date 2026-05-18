import Container from "@/components/common/container";
import Section from "@/components/common/section";
import SectionHeading from "@/components/common/section-heading";

const skills = [
    "React",
    "TypeScript",
    "Node.js",
    "Express",
    "MongoDB",
    "Tailwind CSS",
    "Next.js",
    "Redis",
    "Docker",
    "Kubernaties",
    "Kafka",
    "AWS",
    "Framer Motion",
    "JWT Auth",
    "REST APIs",
    "Mongoose",
    "Git & GitHub",
];

const SkillsSection = () => {
    return (
        <Section>
            <Container>
                <div className="space-y-16">
                    <SectionHeading
                        badge="Skills"
                        title="Technologies I work with"
                        description="Focused on building scalable full stack applications with modern frontend systems and robust backend architecture."
                    />

                    <div className="flex flex-wrap gap-4">
                        {skills.map((skill) => (
                            <div
                                key={skill}
                                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/70 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default SkillsSection;
