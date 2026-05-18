import type { BlogLanguage } from "@/types/blog.types";

export const getLanguageDirection = (
    language: BlogLanguage
) => {
    return language === "ur"
        ? "rtl"
        : "ltr";
};