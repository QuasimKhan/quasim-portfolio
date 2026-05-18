import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface sectionProps {
    children: ReactNode;
    className?: string;
}

const Section = ({ children, className }: sectionProps) => {
    return (
        <section className={cn("py-14 lg:py-16", className)}>
            {children}
        </section>
    );
};

export default Section;
