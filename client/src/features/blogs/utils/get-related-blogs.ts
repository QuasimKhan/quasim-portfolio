import type { Blog } from "@/features/blogs/types/blog.types";

interface RelatedBlogsParams {
    currentBlog: Blog;

    blogs: Blog[];

    limit?: number;
}

export const getRelatedBlogs = ({
    currentBlog,
    blogs,
    limit = 3,
}: RelatedBlogsParams) => {

    const relatedBlogs =
        blogs
            .filter(
                (blog) =>
                    blog.slug !==
                    currentBlog.slug
            )

            .map((blog) => {
                let score = 0;

                // Same language
                const sameLanguage =
                    blog.language.some(
                        (lang) =>
                            currentBlog.language.includes(
                                lang
                            )
                    );

                if (sameLanguage) {
                    score += 3;
                }

                // Shared tags
                const sharedTags =
                    blog.tags?.filter(
                        (tag) =>
                            currentBlog.tags?.includes(
                                tag
                            )
                    ).length || 0;

                score +=
                    sharedTags * 5;

                return {
                    blog,
                    score,
                };
            })

            .sort(
                (a, b) =>
                    b.score - a.score
            )

            .slice(0, limit)

            .map(
                (item) => item.blog
            );

    return relatedBlogs;
};