import { useEffect } from "react";

import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import Container from "@/components/common/container";
import Section from "@/components/common/section";

import BlogForm from "../components/blog-form";

import { useCreateBlogForm } from "../hooks/use-create-blog-form";

import { useUpdateBlogMutation } from "../hooks/use-update-blog-mutation";

import { getBlogById } from "@/features/blogs/api/blog-api";

import { queryKeys } from "@/lib/query-keys";

import type { CreateBlogInput } from "../schemas/create-blog-schema";

const EditBlogPage = () => {
    const { id } = useParams();

    const form = useCreateBlogForm();

    const { mutate, isPending } = useUpdateBlogMutation();

    const { data, isLoading, isError } = useQuery({
        queryKey: queryKeys.blog(id || ""),

        queryFn: () => getBlogById(id || ""),

        enabled: !!id,
    });

    const blog = data?.data;

    // IMPORTANT
    // async form hydration
    useEffect(() => {
        if (!blog) return;

        form.reset({
            title: {
                en: blog.title.en || "",

                hi: blog.title.hi || "",

                ur: blog.title.ur || "",

                ru: blog.title.ru || "",
            },

            excerpt: {
                en: blog.excerpt?.en || "",

                hi: blog.excerpt?.hi || "",

                ur: blog.excerpt?.ur || "",

                ru: blog.excerpt?.ru || "",
            },

            content: {
                en: blog.content?.en || "",

                hi: blog.content?.hi || "",

                ur: blog.content?.ur || "",

                ru: blog.content?.ru || "",
            },

            slug: blog.slug || "",

            tags: blog.tags || [],

            language: blog.language || ["en"],

            isPublished: blog.isPublished || false,
        });
    }, [blog, form]);

    const onSubmit = (values: CreateBlogInput) => {
        if (!id) return;

        mutate({
            id,
            payload: values,
        });
    };

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

    if (isError || !blog) {
        return (
            <Section>
                <Container>
                    <div className="flex min-h-[70vh] items-center justify-center">
                        <p className="text-red-400">Failed to load blog.</p>
                    </div>
                </Container>
            </Section>
        );
    }

    return (
        <Section>
            <Container>
                <BlogForm
                    form={form}
                    onSubmit={onSubmit}
                    isPending={isPending}
                    submitLabel="Update blog"
                />
            </Container>
        </Section>
    );
};

export default EditBlogPage;
