import { Link, useParams } from "react-router-dom";

import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";

import Container from "@/components/common/container";
import Section from "@/components/common/section";

import { cn } from "@/lib/utils";

import { useLanguageStore } from "@/store/language-store";

import { getLanguageContent } from "@/utils/get-language-content";
import { getLanguageDirection } from "@/utils/get-language-direction";
import { extractMarkdownHeadings } from "@/features/blogs/utils/extract-markdown-headings";
import { useQuery } from "@tanstack/react-query";
import { getBlogBySlug } from "@/features/blogs/api/blog-api";
import { queryKeys } from "@/lib/query-keys";
import ReadingProgressBar from "@/features/blogs/components/reading-progress-bar";
import MarkdownRenderer from "@/features/blogs/components/markdown-renderer";
import TableOfContents from "@/features/blogs/components/table-of-contents";

const BlogDetailsPage = () => {
    const { slug } = useParams();

    const { language } = useLanguageStore();

    const { data, isLoading, isError } = useQuery({
        queryKey: queryKeys.blog(slug || ""),

        queryFn: () => getBlogBySlug(slug || ""),

        enabled: !!slug,
    });

    const blog = data?.data;
    if (isLoading) {
        return (
            <Section>
                <Container>
                    <div className="flex min-h-[70vh] items-center justify-center">
                        <p className="text-white/60">Loading article...</p>
                    </div>
                </Container>
            </Section>
        );
    }
    if (isError) {
        return (
            <Section>
                <Container>
                    <div className="flex min-h-[70vh] items-center justify-center">
                        <p className="text-red-400">Failed to load article.</p>
                    </div>
                </Container>
            </Section>
        );
    }

    if (!blog) {
        return (
            <Section>
                <Container>
                    <div className="flex min-h-[70vh] flex-col items-center justify-center space-y-6 text-center">
                        <h1 className="text-5xl font-bold tracking-tight text-white">
                            Blog not found
                        </h1>

                        <p className="max-w-md text-white/60">
                            The article you are trying to access does not exist
                            or may have been removed.
                        </p>

                        <Link
                            to="/blogs"
                            className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
                        >
                            <ArrowLeft className="size-4" />
                            Back to blogs
                        </Link>
                    </div>
                </Container>
            </Section>
        );
    }

    const titleData = getLanguageContent(blog.title, language);

    const excerptData = blog.excerpt
        ? getLanguageContent(blog.excerpt, language)
        : null;

    const contentData = blog.content
        ? getLanguageContent(blog.content, language)
        : null;

    const direction = getLanguageDirection(titleData.language);

    const isRTL = direction === "rtl";

    const headings = contentData
        ? extractMarkdownHeadings(contentData.content)
        : [];

    return (
        <>
            <ReadingProgressBar />
            <div
                dir={direction}
                className={cn(
                    "relative overflow-hidden",

                    isRTL ? "text-right" : "text-left",
                )}
            >
                {/* Grid Background */}
                <div className="absolute inset-0 -z-30 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-size-[5rem_5rem]" />

                {/* Glow */}
                <div className="absolute inset-0 -z-20 overflow-hidden">
                    <div className="absolute left-1/2 top-0 h-125 w-125 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
                </div>

                {/* Hero */}
                <Section className="border-b border-white/5 pb-20 pt-32">
                    <Container>
                        <div className="mx-auto max-w-5xl space-y-10">
                            {/* Back */}
                            <Link
                                to="/blogs"
                                className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
                            >
                                <ArrowLeft className="size-4" />
                                Back to blogs
                            </Link>

                            {/* Meta */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-white/40">
                                <span className="rounded-full border border-white/10 bg-white/4 px-3 py-1 uppercase tracking-[0.18em]">
                                    {titleData.language}
                                </span>

                                {blog.readingTime && (
                                    <div className="flex items-center gap-2">
                                        <Clock3 className="size-4" />

                                        <span>{blog.readingTime} min read</span>
                                    </div>
                                )}

                                {blog.publishedAt && (
                                    <div className="flex items-center gap-2">
                                        <CalendarDays className="size-4" />

                                        <span>
                                            {new Date(
                                                blog.publishedAt,
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Title */}
                            <div className="space-y-8">
                                <h1
                                    className={cn(
                                        "max-w-5xl text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl",

                                        isRTL && "leading-[1.7]",
                                    )}
                                >
                                    {titleData.content}
                                </h1>

                                {excerptData && (
                                    <p
                                        className={cn(
                                            "max-w-3xl text-xl leading-9 text-white/60",

                                            isRTL && "leading-[2.2]",
                                        )}
                                    >
                                        {excerptData.content}
                                    </p>
                                )}
                            </div>

                            {/* Tags */}
                            {blog.tags?.length ? (
                                <div className="flex flex-wrap gap-3">
                                    {blog.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full border border-white/10 bg-white/4 px-4 py-2 text-xs tracking-wide text-white/60 backdrop-blur-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    </Container>
                </Section>

                {/* Cover */}
                {blog.coverImage && (
                    <Section className="pb-0 pt-12">
                        <Container>
                            <div className="mx-auto max-w-6xl overflow-hidden rounded-4xl border border-white/10 bg-white/3 shadow-2xl shadow-black/30">
                                <img
                                    src={blog.coverImage}
                                    alt={titleData.content}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </Container>
                    </Section>
                )}

                {/* Content */}
                <Section>
                    <Container>
                        <div className="grid gap-12 lg:grid-cols-12">
                            {/* Article */}
                            <div className="lg:col-span-8">
                                <div className="rounded-4x border border-white/10 bg-white/3 p-8 backdrop-blur-xl sm:p-10">
                                    {contentData && (
                                        <MarkdownRenderer
                                            content={contentData.content}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* TOC */}
                            <div className="hidden lg:col-span-4 lg:block">
                                <TableOfContents headings={headings} />
                            </div>
                        </div>
                    </Container>
                </Section>
                {/* Related Articles */}
                {/* <Section className="pt-0">
                    <Container>
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <p className="text-sm uppercase tracking-[0.2em] text-white/40">
                                    Continue reading
                                </p>

                                <h2 className="text-4xl font-bold tracking-tight text-white">
                                    Related articles
                                </h2>
                            </div>

                            <div className="grid gap-6 lg:grid-cols-3">
                                {relatedBlogs.map((blog) => (
                                    <BlogCard key={blog.slug} blog={blog} />
                                ))}
                            </div>
                        </div>
                    </Container>
                </Section> */}
            </div>
        </>
    );
};

export default BlogDetailsPage;
