import Container from "./container";
import Section from "./section";

interface PageHeroProps {
    title: string;
    description: string;
}

const PageHero = ({ title, description }: PageHeroProps) => {
    return (
        <Section className="relative overflow-hidden border-b border-white/5">
            {/* Background */}
            <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-size-[5rem_5rem]" />
            <Container>
                <div className="max-w-4xl space-y-8">
                    <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                        {title}
                    </h1>

                    <p className="max-w-2xl text-lg leading-8 text-white/60">
                        {description}
                    </p>
                </div>
            </Container>
        </Section>
    );
};

export default PageHero;
