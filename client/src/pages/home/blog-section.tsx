import Container from "@/components/common/container";
import Section from "@/components/common/section";
import SectionHeading from "@/components/common/section-heading";

import BlogCard from "@/components/blogs/blog-card";

import { blogs } from "@/constants/blogs";

const BlogSection = () => {
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
