import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";

interface SectionHeadingProps {
    badge?: string;
    title: string;
    description?: string;
    align?: "left" | "center";
}

const SectionHeading = ({
    badge,
    title,
    description,
    align = "left",
}: SectionHeadingProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`space-y-6 ${
                align === "center" ? "text-center" : "text-left"
            }`}
        >
            {badge && (
                <Badge
                    variant="outline"
                    className="border-white/10 bg-white/5 px-4 py-1 text-sm text-white/70"
                >
                    {badge}
                </Badge>
            )}

            <div className="space-y-4">
                <h2 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
                    {title}
                </h2>

                {description && (
                    <p className="max-w-2xl text-lg leading-8 text-white/60">
                        {description}
                    </p>
                )}
            </div>
        </motion.div>
    );
};

export default SectionHeading;
