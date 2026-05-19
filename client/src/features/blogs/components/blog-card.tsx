import { ArrowUpRight, Clock3 } from "lucide-react";

import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

import type { Blog } from "@/features/blogs/types/blog.types";

import { useLanguageStore } from "@/store/language-store";

import { getLanguageContent } from "@/utils/get-language-content";
import { getLanguageDirection } from "@/utils/get-language-direction";

interface BlogCardProps {
    blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
    const { language } = useLanguageStore();

    const titleData = getLanguageContent(blog.title, language);

    const excerptData = blog.excerpt
        ? getLanguageContent(blog.excerpt, language)
        : null;

    const direction = getLanguageDirection(titleData.language);

    const isRTL = direction === "rtl";

    return (
        <Link to={`/blogs/${blog.slug}`} className="group block h-full">
            <article
                dir={direction}
                className={cn(
                    "relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.05]",

                    isRTL ? "text-right" : "text-left",
                )}
            >
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Cover Image */}
                <div className="relative overflow-hidden">
                    <div className="aspect-video overflow-hidden">
                        <img
                            src={
                                blog.coverImage ||
                                "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
                            }
                            alt={titleData.content}
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* Language Badge */}
                    <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
                        {titleData.language.toUpperCase()}
                    </div>
                </div>

                {/* Content */}
                <div className="relative flex flex-1 flex-col justify-between p-7">
                    <div className="space-y-5">
                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-white/40">
                            <div className="flex items-center gap-1.5">
                                <Clock3 className="size-3.5" />

                                <span>{blog.readingTime || 1} min read</span>
                            </div>

                            {blog.publishedAt && (
                                <>
                                    <span className="h-1 w-1 rounded-full bg-white/20" />

                                    <span>
                                        {new Date(
                                            blog.publishedAt,
                                        ).toLocaleDateString()}
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Text Content */}
                        <div className="space-y-4">
                            <h3
                                className={cn(
                                    "line-clamp-2 text-2xl font-semibold leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-white/90",

                                    isRTL && "leading-[1.9]",
                                )}
                            >
                                {titleData.content}
                            </h3>

                            {excerptData && (
                                <p
                                    className={cn(
                                        "line-clamp-3 text-[15px] leading-7 text-white/55",

                                        isRTL && "leading-[2.2]",
                                    )}
                                >
                                    {excerptData.content}
                                </p>
                            )}
                        </div>

                        {/* Tags */}
                        {blog.tags?.length ? (
                            <div className="flex flex-wrap gap-2">
                                {blog.tags.slice(0, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] tracking-wide text-white/60"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        ) : null}
                    </div>

                    {/* CTA */}
                    <div className="mt-8 flex items-center text-sm font-medium tracking-wide text-white/70 transition-colors duration-300 group-hover:text-white">
                        <span>Read Article</span>

                        <ArrowUpRight className="ml-2 size-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default BlogCard;
