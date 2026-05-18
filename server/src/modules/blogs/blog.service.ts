import slugify from "slugify";
import Blog from "./blog.model.js";
import { BlogDocument, BlogLanguage, MultilingualText } from "./blog.types.js";

interface CreateBlogPayload {
    title: MultilingualText;

    excerpt?: MultilingualText;

    content: MultilingualText;

    tags?: string[];

    categories?: string[];

    coverImage?: string;

    language: BlogLanguage[];
}

export const createBlog = async (
    payload: CreateBlogPayload
) => {
    const baseTitle =
        payload.title.en ||
        payload.title.hi ||
        payload.title.ur ||
        payload.title.ru;

    const slug = slugify(baseTitle || "blog", {
        lower: true,
        strict: true,
    });

    const readingTime = Math.ceil(
        JSON.stringify(payload.content).split(" ").length / 200
    );

    const blog = await Blog.create({
        ...payload,
        slug,
        readingTime,
        publishedAt: new Date(),
    });

    return blog;
};