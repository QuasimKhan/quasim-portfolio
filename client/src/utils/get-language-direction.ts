import type { BlogLanguage } from "@/features/blogs/types/blog.types";

export const getLanguageDirection = (
    language: BlogLanguage
) => {
    return language === "ur"
        ? "rtl"
        : "ltr";
};