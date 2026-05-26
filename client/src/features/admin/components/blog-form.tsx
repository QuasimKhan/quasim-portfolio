import { Controller } from "react-hook-form";

import { Globe, Loader2, Sparkles } from "lucide-react";

import MarkdownEditor from "./markdown-editor";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { generateSlug } from "@/utils/generate-slug";

import type { UseFormReturn } from "react-hook-form";

import type { CreateBlogInput } from "../schemas/create-blog-schema";

interface BlogFormProps {
    form: UseFormReturn<CreateBlogInput>;

    onSubmit: (values: CreateBlogInput) => void;

    isPending: boolean;

    submitLabel: string;
}

const BlogForm = ({
    form,
    onSubmit,
    isPending,
    submitLabel,
}: BlogFormProps) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        formState: { errors },
    } = form;

    const selectedLanguages = watch("language");

    const englishTitle = watch("title.en");

    const handleLanguageToggle = (language: "en" | "hi" | "ur" | "ru") => {
        const exists = selectedLanguages.includes(language);

        if (exists) {
            setValue(
                "language",
                selectedLanguages.filter((lang) => lang !== language),
            );
        } else {
            setValue("language", [...selectedLanguages, language]);
        }
    };

    // Auto slug generation
    if (englishTitle) {
        const generatedSlug = generateSlug(englishTitle);

        if (watch("slug") !== generatedSlug) {
            setValue("slug", generatedSlug);
        }
    }

    return (
        <div className="mx-auto max-w-5xl space-y-10">
            {/* Header */}
            <div className="space-y-5">
                <Badge className="w-fit rounded-full border border-white/10 bg-white/[0.03] px-4 py-1 text-xs uppercase tracking-[0.2em] text-white/60">
                    Admin Panel
                </Badge>

                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Create new blog
                    </h1>

                    <p className="max-w-2xl text-base leading-8 text-white/50 sm:text-lg">
                        Publish multilingual technical articles, engineering
                        writeups, tutorials, and long-form markdown content.
                    </p>
                </div>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl"
            >
                {/* Top Bar */}
                <div className="flex flex-col gap-5 border-b border-white/5 p-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <Sparkles className="size-4 text-white/50" />

                            <p className="text-sm uppercase tracking-[0.2em] text-white/40">
                                Blog editor
                            </p>
                        </div>

                        <h2 className="text-2xl font-semibold text-white">
                            Content management system
                        </h2>
                    </div>

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="h-11 rounded-2xl bg-white px-6 text-black hover:bg-white/90"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 size-4 animate-spin" />
                                Publishing...
                            </>
                        ) : (
                            submitLabel
                        )}
                    </Button>
                </div>

                {/* Body */}
                <div className="space-y-10 p-6 sm:p-8">
                    {/* Languages */}
                    <div className="space-y-5">
                        <div className="flex items-center gap-3">
                            <Globe className="size-5 text-white/40" />

                            <div>
                                <h3 className="text-lg font-semibold text-white">
                                    Supported languages
                                </h3>

                                <p className="text-sm text-white/40">
                                    Select languages available for this article.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {(["en", "hi", "ur", "ru"] as const).map(
                                (language) => (
                                    <div
                                        key={language}
                                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3"
                                    >
                                        <Checkbox
                                            disabled={isPending}
                                            checked={selectedLanguages.includes(
                                                language,
                                            )}
                                            onCheckedChange={() =>
                                                handleLanguageToggle(language)
                                            }
                                        />

                                        <Label className="cursor-pointer uppercase text-white/70">
                                            {language}
                                        </Label>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>

                    {/* Title + Slug */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-3">
                            <Label>English title</Label>

                            <Input
                                disabled={isPending}
                                {...register("title.en")}
                                placeholder="Building scalable MERN systems..."
                                className="h-12 border-white/10 bg-white/[0.03] text-white"
                            />

                            {errors.title?.en && (
                                <p className="text-sm text-red-400">
                                    {errors.title.en.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-3">
                            <Label>Slug</Label>

                            <Input
                                disabled={isPending}
                                {...register("slug")}
                                className="h-12 border-white/10 bg-white/[0.03] text-white"
                            />
                        </div>
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-3">
                        <Label>English excerpt</Label>

                        <Textarea
                            disabled={isPending}
                            {...register("excerpt.en")}
                            rows={5}
                            placeholder="Short article summary..."
                            className="border-white/10 bg-white/[0.03] text-white"
                        />
                    </div>

                    {/* Markdown Content */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Markdown content</Label>

                            <p className="text-sm text-white/40">
                                Write long-form markdown content with code
                                blocks, headings, lists, and formatting support.
                            </p>
                        </div>

                        <Controller
                            control={control}
                            name="content.en"
                            render={({ field }) => (
                                <MarkdownEditor
                                    value={field.value || ""}
                                    onChange={field.onChange}
                                />
                            )}
                        />

                        {errors.content?.en && (
                            <p className="text-sm text-red-400">
                                {errors.content.en.message}
                            </p>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BlogForm;
