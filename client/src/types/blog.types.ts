export type BlogLanguage =
    | "en"
    | "hi"
    | "ur"
    | "ru";

export interface MultilingualText {
    en?: string;
    hi?: string;
    ur?: string;
    ru?: string;
}

export interface Blog {
    title: MultilingualText;

    excerpt?: MultilingualText;

    content?: MultilingualText;

    slug: string;

    language: BlogLanguage[];

    coverImage?: string;

    readingTime?: number;

    tags?: string[];

    categories?: string[];

    publishedAt?: string;
}