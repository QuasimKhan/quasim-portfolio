import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
    createBlogSchema,
    type CreateBlogInput,
} from "../schemas/create-blog-schema";

export const useCreateBlogForm =
    () => {

        return useForm<
            CreateBlogInput
        >({
            resolver:
                zodResolver(
                    createBlogSchema
                ),

            defaultValues: {
                title: {
                    en: "",
                    hi: "",
                    ur: "",
                    ru: "",
                },

                excerpt: {
                    en: "",
                    hi: "",
                    ur: "",
                    ru: "",
                },

                content: {
                    en: "",
                    hi: "",
                    ur: "",
                    ru: "",
                },

                slug: "",

                tags: [],

                language: ["en"],

                isPublished: false,
            },
        });
    };