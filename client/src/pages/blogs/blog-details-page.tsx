import MarkdownRenderer from "@/components/blogs/markdown-renderer";
import Container from "@/components/common/container";
import PageHero from "@/components/common/page-hero";
import Section from "@/components/common/section";
import { blogs } from "@/constants/blogs";
import { getLanguageContent } from "@/utils/get-language-content";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

const BlogDetailsPage = () => {
    const { slug } = useParams();

    const blog = useMemo(() => {
        return blogs.find((blog) => blog.slug === slug);
    }, [slug]);

    if (!blog) {
        return (
            <Section>
                <Container>
                    <div className="py-32 text-center">
                        <h1 className="text-4xl font-bold">Blog not found</h1>
                    </div>
                </Container>
            </Section>
        );
    }

    const title = getLanguageContent(blog.title);
    const excerpt = blog.excerpt ? getLanguageContent(blog.excerpt) : "";
    const content = blog.content ? getLanguageContent(blog.content) : "";

    return (
        <>
            <PageHero title={title} description={excerpt} />

            <Section>
                <Container>
                    <div className="mx-auto max-w-4xl space-y-10">
                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-white/40">
                            <span>
                                {blog.language.join(", ").toUpperCase()}
                            </span>

                            <span>•</span>

                            <span>{blog.readingTime} min read</span>

                            {blog.publishedAt && (
                                <>
                                    <span>•</span>

                                    <span>
                                        {new Date(
                                            blog.publishedAt,
                                        ).toLocaleDateString()}
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Cover Image */}
                        {blog.coverImage && (
                            <div className="overflow-hidden rounded-3xl border border-white/10">
                                <img
                                    src={blog.coverImage}
                                    alt={title}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        )}

                        {/* Content */}
                        <MarkdownRenderer content={content} />
                    </div>
                </Container>
            </Section>
        </>
    );
};

export default BlogDetailsPage;
