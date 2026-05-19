const blogs = [
    {
        title: {
            en: "Building Production Grade MERN Applications",
        },

        excerpt: {
            en: "A practical guide to structuring scalable MERN applications using TypeScript, modular architecture, and clean engineering practices.",
        },

        content: {
            en: `
# Building Production Grade MERN Applications

Modern MERN applications require scalable architecture and clean engineering practices.

## Why Architecture Matters

A poorly structured application becomes difficult to maintain.
latex adsjhgsadg asjdghkhsdg jsdhgkjhsdg askdghjjkdshg akdjsgjkshgjkhsdhg akjsghjksghsdjgh sdg sjdghsdjghjkshghjksdhghk dkshgkhg kasdjghjsadgh k ajsdghjdshgkjshgks sdhgkjdshgkjdghdskgh
ksdgksdkgh kjasdhgkjhsadkgjhsakhgkag hkahdsjhgkajhjkdhgjhgkjsdgha]agdshgdshgahg ihgsahdghsoiahgao isdhgioshaoihagh
Another Important Thing

Your current blog content is probably too short.

So scrolling barely happens.

Add LONG markdown content temporarily:

# Heading

paragraph...

paragraph...

paragraph...

## Another Section

more content...

Otherwise:
there’s no meaningful scroll progress.

Real Engineering Lesson

This is important:

many UI bugs are not logic bugs

They are:

rendering assumptions
layout assumptions
insufficient test data
CSS behavior misunderstandings

You’re now starting to encounter:

real frontend debugging.
### Example API Route

\`\`\`ts
router.post("/blogs", createBlogController);
\`\`\`

## Conclusion

Production systems should prioritize:
- scalability
- maintainability
- consistency
`,
        },

        slug: "production-grade-mern-apps",

        language: ["en"],

        coverImage:
            "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1400&auto=format&fit=crop",

        readingTime: 8,

        tags: ["MERN", "TypeScript", "Architecture"],

        categories: ["Development"],

        publishedAt: "2026-05-15T10:00:00.000Z",
    },

    {
        title: {
            ur: "اردو زبان اور جدید ٹیکنالوجی",
        },

        excerpt: {
            ur: "اردو زبان، جدید ویب ٹیکنالوجی، اور ڈیجیٹل دنیا میں مقامی زبانوں کے کردار پر ایک مختصر مضمون۔",
        },

        content: {
            ur: "مکمل بلاگ مواد یہاں ہوگا۔",
        },

        slug: "urdu-and-modern-technology",

        language: ["ur"],

        coverImage:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop",

        readingTime: 5,

        tags: ["Urdu", "Technology"],

        categories: ["Language"],

        publishedAt: "2026-05-10T08:30:00.000Z",
    },

    {
        title: {
            ru: "Изучение русского языка через технологии",
        },

        excerpt: {
            ru: "How technology and modern digital tools can improve language acquisition and consistency while learning Russian.",
        },

        content: {
            ru: "Полное содержание блога здесь.",
        },

        slug: "russian-language-through-technology",

        language: ["ru"],

        coverImage:
            "https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1400&auto=format&fit=crop",

        readingTime: 6,

        tags: ["Russian", "Learning"],

        categories: ["Education"],

        publishedAt: "2026-05-01T14:20:00.000Z",
    },
];

function search(text) {
    // Convert sentence into array
    const searchWords = text.toLowerCase().split(" ");

    const searchedBlogs = blogs.filter((blog) => {
        // Combine searchable text
        const title = Object.values(blog.title).join(" ").toLowerCase();

        //Object.values(blog.title) --> convert object into Array
        //join(" ") --> converts array into string

        const content = Object.values(blog.content).join(" ").toLowerCase();

        const tags = blog.tags.join(" ").toLowerCase();

        // Check if any search word exists
        return searchWords.some((word) => {
            return (
                title.includes(word) ||
                content.includes(word) ||
                tags.includes(word)
            );
        });
    });

    return searchedBlogs;
}

console.log(search(""));
