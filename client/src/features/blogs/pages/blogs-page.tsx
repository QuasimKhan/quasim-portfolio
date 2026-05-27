import { useMemo, useState } from "react";

import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";

import Container from "@/components/common/container";
import PageHero from "@/components/common/page-hero";
import Section from "@/components/common/section";
import BlogCard from "@/features/blogs/components/blog-card";

import { Input } from "@/components/ui/input";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getBlogs } from "@/features/blogs/api/blog-api";
import { queryKeys } from "@/lib/query-keys";

const languageFilters = ["all", "en", "hi", "ur", "ru"] as const;

type Language = (typeof languageFilters)[number];

const BlogsPage = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const [selectedLanguage, setSelectedLanguage] = useState<Language>("all");

    const {
        data,
        isPending,
        isFetching,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: [...queryKeys.blogs, searchQuery, selectedLanguage],

        queryFn: ({ pageParam }) =>
            getBlogs({
                pageParam,
                search: searchQuery,
                language: selectedLanguage,
            }),

        initialPageParam: 1,

        getNextPageParam: (lastPage) => lastPage?.nextPage ?? undefined,
    });

    const blogs = useMemo(() => {
        if (!data?.pages) return [];

        return data.pages.flatMap((page) => page?.data || []);
    }, [data]);

    return (
        <>
            <PageHero
                title="Blogs & Writing"
                description="Technical writing, multilingual content, software engineering thoughts, language learning, and modern digital systems."
            />

            <Section className="relative overflow-hidden pt-14">
                {/* Background Glow */}
                <div className="absolute inset-0 -z-20 overflow-hidden">
                    <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
                </div>

                <Container>
                    <div className="space-y-10">
                        {/* Filter Section */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.5,
                            }}
                            className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl"
                        >
                            {/* Top */}
                            <div className="flex flex-col gap-6 border-b border-white/5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
                                {/* Search */}
                                <div className="relative w-full lg:max-w-md">
                                    <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/30" />

                                    <Input
                                        placeholder="Search articles..."
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="h-12 rounded-2xl border border-white/10 bg-white/[0.03] pl-11 text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    />
                                </div>

                                {/* Filters */}
                                <div className="flex flex-wrap gap-2">
                                    {languageFilters.map((language) => (
                                        <button
                                            key={language}
                                            type="button"
                                            onClick={() =>
                                                setSelectedLanguage(language)
                                            }
                                            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] transition-all duration-300 ${
                                                selectedLanguage === language
                                                    ? "border-white bg-white text-black"
                                                    : "border-white/10 bg-white/[0.03] text-white/55 hover:border-white/20 hover:text-white"
                                            }`}
                                        >
                                            {language}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom */}
                            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                                <div className="flex items-center gap-3 text-sm text-white/40">
                                    <Sparkles className="size-4" />

                                    <span>
                                        Showing {blogs.length} article
                                        {blogs.length !== 1 ? "s" : ""}
                                    </span>
                                </div>

                                <div className="text-xs uppercase tracking-[0.18em] text-white/30">
                                    Multilingual publishing platform
                                </div>
                            </div>
                        </motion.div>

                        {/* Search Loading */}
                        {isFetching && !isFetchingNextPage && !isPending && (
                            <div className="flex items-center justify-center py-2">
                                <p className="text-sm text-white/50">
                                    Searching blogs...
                                </p>
                            </div>
                        )}

                        {/* Error State */}
                        {isError && (
                            <div className="flex min-h-[220px] items-center justify-center rounded-[32px] border border-red-500/20 bg-red-500/5">
                                <p className="text-red-400">
                                    Failed to load blogs.
                                </p>
                            </div>
                        )}

                        {/* Initial Loading */}
                        {isPending ? (
                            <div className="flex min-h-[320px] items-center justify-center">
                                <p className="text-white/60">
                                    Loading blogs...
                                </p>
                            </div>
                        ) : blogs.length === 0 ? (
                            /* Empty State */
                            <div className="flex min-h-[320px] flex-col items-center justify-center rounded-[32px] border border-dashed border-white/10 bg-white/[0.02] px-6 text-center">
                                <div className="space-y-3">
                                    <h3 className="text-3xl font-semibold tracking-tight text-white">
                                        No blogs found
                                    </h3>

                                    <p className="max-w-md leading-7 text-white/50">
                                        Try adjusting your search query or
                                        selected language filter to discover
                                        more content.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Blogs Grid */}
                                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                    {blogs.map((blog, index) => (
                                        <motion.div
                                            key={blog.slug}
                                            initial={{
                                                opacity: 0,
                                                y: 30,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            transition={{
                                                duration: 0.4,
                                                delay: index * 0.05,
                                            }}
                                        >
                                            <BlogCard blog={blog} />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Load More */}
                                {hasNextPage && (
                                    <div className="flex justify-center pt-4">
                                        <button
                                            type="button"
                                            onClick={() => fetchNextPage()}
                                            disabled={isFetchingNextPage}
                                            className="cursor-pointer rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-white transition-all hover:border-white/20 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {isFetchingNextPage
                                                ? "Loading..."
                                                : "Load More"}
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </Container>
            </Section>
        </>
    );
};

export default BlogsPage;
