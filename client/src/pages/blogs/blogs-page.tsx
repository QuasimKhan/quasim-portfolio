import BlogCard from "@/components/blogs/blog-card";
import Container from "@/components/common/container";
import PageHero from "@/components/common/page-hero";
import Section from "@/components/common/section";
import { blogs } from "@/constants/blogs";

const BlogsPage = () => {
    return (
        <>
            <PageHero
                title="Blogs & Writing"
                description="Technical writing, multilingual content, software engineering thoughts, language learning, and modern digital systems."
            />

            <Section>
                <Container>
                    <div className="grid gap-6 lg:grid-cols-3">
                        {blogs.map((blog) => (
                            <BlogCard key={blog.slug} blog={blog} />
                        ))}
                    </div>
                </Container>
            </Section>
        </>
    );
};

export default BlogsPage;
