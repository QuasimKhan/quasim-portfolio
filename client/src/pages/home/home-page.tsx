import BlogSection from "./blog-section";
import HeroSection from "./hero-section";
import ProjectSection from "./projects-section";
import SkillsSection from "./skills-section";

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <SkillsSection />
            <ProjectSection />
            <BlogSection />
        </>
    );
};

export default HomePage;
