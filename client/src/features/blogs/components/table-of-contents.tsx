import useActiveHeading from "@/features/blogs/hooks/use-active-heading";

import type { MarkdownHeading } from "@/features/blogs/utils/extract-markdown-headings";

interface TableOfContentsProps {
    headings: MarkdownHeading[];
}

const TableOfContents = ({ headings }: TableOfContentsProps) => {
    const activeId = useActiveHeading();

    return (
        <div className="sticky top-28 space-y-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
            <div className="space-y-2">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
                    Table of contents
                </p>
            </div>

            <nav>
                <ul className="space-y-3">
                    {headings.map((heading) => (
                        <li
                            key={heading.id}
                            className={
                                heading.level === 2
                                    ? "ml-4"
                                    : heading.level === 3
                                      ? "ml-8"
                                      : ""
                            }
                        >
                            <a
                                href={`#${heading.id}`}
                                className={`
                  block text-sm leading-6 transition

                  ${
                      activeId === heading.id
                          ? "font-medium text-white"
                          : "text-white/45 hover:text-white/80"
                  }
                `}
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`
                      h-1.5 w-1.5 rounded-full transition

                      ${activeId === heading.id ? "bg-white" : "bg-white/20"}
                    `}
                                    />

                                    <span>{heading.text}</span>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default TableOfContents;
