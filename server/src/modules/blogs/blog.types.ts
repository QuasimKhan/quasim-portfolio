export type BlogLanguage =
    | "en"
    | "hi"
    | "ur"
    | "ru";

export interface MultilingualText {
    en?: string | undefined;
    hi?: string | undefined;
    ur?: string | undefined;
    ru?: string | undefined;
}

export interface BlogDocument {
    title: MultilingualText;

    slug: string;

    excerpt?: MultilingualText | undefined;

    content: MultilingualText;

    coverImage?: string | undefined;

    tags?: string[] | undefined;

    categories?: string[] | undefined;

    language: BlogLanguage[];

    isPublished: boolean;

    readingTime?: number | undefined;

    views: number;

    publishedAt?: Date | undefined;

    createdAt: Date;

    updatedAt: Date;
}