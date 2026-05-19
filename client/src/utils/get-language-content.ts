import type {
    BlogLanguage,
    MultilingualText,
} from "@/features/blogs/types/blog.types";

interface LanguageContentResult {
    content: string;
    language: BlogLanguage;
}

export const getLanguageContent = (
    content: MultilingualText,
    preferredLanguage: BlogLanguage
): LanguageContentResult => {

    if (content[preferredLanguage]) {
        return {
            content:
                content[preferredLanguage] || "",

            language: preferredLanguage,
        };
    }

    const fallbackOrder: BlogLanguage[] = [
        "en",
        "hi",
        "ur",
        "ru",
    ];

    for (const language of fallbackOrder) {
        if (content[language]) {
            return {
                content: content[language] || "",
                language,
            };
        }
    }

    return {
        content: "",
        language: preferredLanguage,
    };
};