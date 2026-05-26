import Container from "@/components/common/container";
import Section from "@/components/common/section";
import SectionHeading from "@/components/common/section-heading";

import { getBlogs } from "@/features/blogs/api/blog-api";
import BlogCard from "@/features/blogs/components/blog-card";
import { queryKeys } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

const BlogSection = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: queryKeys.blogs,
        queryFn: getBlogs,
    });

    const blogs = data?.data || [];

    if (isLoading) {
        return (
            <Section>
                <Container>
                    <div className="flex min-h-[50vh] items-center justify-center">
                        <p className="text-white/60">Loading blogs...</p>
                    </div>
                </Container>
            </Section>
        );
    }

    if (isError) {
        return (
            <Section>
                <Container>
                    <div className="flex min-h-[50vh] items-center justify-center">
                        <p className="text-red-400">Failed to load blogs.</p>
                    </div>
                </Container>
            </Section>
        );
    }
    return (
        <Section>
            <Container>
                <div className="space-y-16">
                    <SectionHeading
                        badge="Blogs"
                        title="Technical writing & multilingual content"
                        description="Thoughts on software engineering, scalable systems, language learning, and modern technology written across multiple languages."
                    />
                    <div className="grid gap-6 lg:grid-cols-3">
                        {blogs.map((blog) => (
                            <BlogCard key={blog.slug} blog={blog} />
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default BlogSection;
