import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Container from "@/components/common/container";
import Section from "@/components/common/section";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
    return (
        <Section className="relative overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 -z-30 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:6rem_6rem]" />

            {/* Main Glow */}
            <div className="absolute inset-0 -z-20 overflow-hidden">
                <motion.div
                    animate={{
                        opacity: [0.4, 0.7, 0.4],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
                />
            </div>

            <Container>
                <div className="grid items-center gap-20 lg:grid-cols-12">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="space-y-12 lg:col-span-8"
                    >
                        <Badge
                            variant="outline"
                            className="w-fit border-white/10 bg-white/5 px-4 py-1 text-sm text-white/70 backdrop-blur-sm"
                        >
                            Full Stack Developer
                        </Badge>

                        <div className="space-y-8">
                            <h1 className="max-w-5xl text-5xl font-bold leading-[1] tracking-tight text-white sm:text-6xl lg:text-7xl">
                                Building scalable digital products with modern
                                web technologies.
                            </h1>

                            <p className="max-w-2xl text-lg leading-8 text-white/60 sm:text-xl">
                                MERN Stack Developer focused on scalable backend
                                systems, modern frontend architecture,
                                multilingual platforms, and production-grade web
                                applications.
                            </p>
                        </div>

                        {/* CTA */}
                        <div className="flex flex-wrap items-center gap-4">
                            <Button
                                size="lg"
                                className="group h-12 px-6 text-sm"
                            >
                                View Projects
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="h-12 border-white/10 bg-white/5 px-6 text-sm backdrop-blur-sm hover:bg-white/10"
                            >
                                Read Blogs
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-12 pt-4">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold">10+</h2>

                                <p className="text-sm text-white/50">
                                    Projects Built
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold">MERN</h2>

                                <p className="text-sm text-white/50">
                                    Specialized Stack
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold">
                                    4 Languages
                                </h2>

                                <p className="text-sm text-white/50">
                                    English, Urdu, Hindi & Russian
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-10 lg:col-span-4"
                    >
                        <div className="space-y-4 border-l border-white/5 pl-6">
                            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                                About
                            </p>

                            <p className="text-base leading-8 text-white/60">
                                I build scalable web applications with clean
                                architecture, modern UI systems, and
                                production-focused engineering practices.
                            </p>
                        </div>

                        <div className="space-y-4 border-l border-white/5 pl-6">
                            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                                Writing
                            </p>

                            <p className="text-base leading-8 text-white/60">
                                I write technical and cultural blogs in English,
                                Urdu, Hindi, and Russian, exploring technology,
                                language, and digital systems.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
};

export default HeroSection;
