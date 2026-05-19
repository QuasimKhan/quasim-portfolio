import {
    useEffect,
    useState,
} from "react";

const useActiveHeading = () => {
    const [activeId, setActiveId] =
        useState("");

    useEffect(() => {
        const headingElements =
            Array.from(
                document.querySelectorAll(
                    ".markdown-content h1, .markdown-content h2, .markdown-content h3"
                )
            );

        if (!headingElements.length)
            return;

        const observer =
            new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (
                            entry.isIntersecting &&
                            entry.target.id
                        ) {
                            setActiveId(
                                entry.target.id
                            );
                        }
                    });
                },
                {
                    rootMargin:
                        "-20% 0% -65% 0%",
                    threshold: 1,
                }
            );

        headingElements.forEach(
            (heading) => {
                observer.observe(heading);
            }
        );

        return () => {
            headingElements.forEach(
                (heading) => {
                    observer.unobserve(
                        heading
                    );
                }
            );
        };
    }, []);

    return activeId;
};

export default useActiveHeading;