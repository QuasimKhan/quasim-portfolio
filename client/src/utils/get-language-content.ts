import type {
    BlogLanguage,
    MultilingualText,
} from "@/types/blog.types";

export const getLanguageContent = (
    content: MultilingualText,
    language: BlogLanguage
) => {
    return (
        content[language] ||
        content.en ||
        content.hi ||
        content.ur ||
        content.ru ||
        ""
    );
};