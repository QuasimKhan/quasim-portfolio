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

export const getBlogs = async (
    page: number = 1,
    limit: number = 6,
    search: string = "",
    language: string = "all"
) => {
    const skipIndex = (page - 1) * limit;

    const query: any = {
        isPublished: true,
    };

    // Search
    if (search.trim()) {
        query.$or = [
            {
                "title.en": {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                "title.hi": {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                "title.ur": {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                "title.ru": {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                "excerpt.en": {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                "excerpt.hi": {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                "excerpt.ur": {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                "excerpt.ru": {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                tags: {
                    $elemMatch: {
                        $regex: search,
                        $options: "i",
                    },
                },
            },
        ];
    }

    // Language Filter
    if (language !== "all") {
        query.language = language;
    }

    const [blogs, totalBlogs] = await Promise.all([
        Blog.find(query)
            .sort({ createdAt: -1 })
            .skip(skipIndex)
            .limit(limit),

        Blog.countDocuments(query),
    ]);

    const hasNextPage =
        skipIndex + blogs.length < totalBlogs;

    return {
        blogs,
        nextPage: hasNextPage
            ? page + 1
            : undefined,
    };
};


export const getBlogByslug = async (slug: string) => {
    const blog = await Blog.findOne({
        slug,
        isPublished: true
    });


    return blog;
}

export const updateBlog = async (id: string, payload: Partial<CreateBlogPayload>) => {
    const updatedBlog = await Blog.findByIdAndUpdate(id, payload, { new: true })

    return updatedBlog
}