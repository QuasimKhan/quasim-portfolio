import mongoose, { Schema } from "mongoose";

import type {
    BlogDocument,
    MultilingualText,
} from "./blog.types.js";

const multilingualSchema =
    new Schema<MultilingualText>(
        {
            en: { type: String },
            hi: { type: String },
            ur: { type: String },
            ru: { type: String },
        },
        { _id: false }
    );

const blogSchema =
    new Schema<BlogDocument>(
        {
            title: {
                type: multilingualSchema,
                required: true,
            },

            slug: {
                type: String,
                required: true,
                unique: true,
            },

            excerpt: {
                type: multilingualSchema,
            },

            content: {
                type: multilingualSchema,
                required: true,
            },

            coverImage: {
                type: String,
            },

            tags: [
                {
                    type: String,
                },
            ],

            categories: [
                {
                    type: String,
                },
            ],

            language: {
                type: [String],
                enum: ["en", "hi", "ur", "ru"],
                required: true,
            },

            isPublished: {
                type: Boolean,
                default: true,
            },

            readingTime: {
                type: Number,
            },

            views: {
                type: Number,
                default: 0,
            },

            publishedAt: {
                type: Date,
            },
        },
        {
            timestamps: true,
        }
    );

const Blog =
    mongoose.model<BlogDocument>(
        "Blog",
        blogSchema
    );

export default Blog;