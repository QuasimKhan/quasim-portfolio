import { Controller } from "react-hook-form";

import { Globe, Loader2, Sparkles } from "lucide-react";

import Container from "@/components/common/container";
import Section from "@/components/common/section";

import MarkdownEditor from "../components/markdown-editor";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useCreateBlogForm } from "../hooks/use-create-blog-form";
import { useCreateBlogMutation } from "../hooks/use-create-blog-mutation";

import type { CreateBlogInput } from "../schemas/create-blog-schema";
import { useEffect } from "react";
import { generateSlug } from "@/utils/generate-slug";

const CreateBlogPage = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        control,
        formState: { errors },
    } = useCreateBlogForm();

    const { mutate, isPending } = useCreateBlogMutation();

    const selectedLanguages = watch("language");
    const englishTitle = watch("title.en");

    useEffect(() => {
        if (!englishTitle) return;

        setValue("slug", generateSlug(englishTitle));
    }, [englishTitle, setValue]);

    const onSubmit = (values: CreateBlogInput) => {
        mutate(values, {
            onSuccess: () => {
                reset();
            },
        });
    };

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

    return (
        <Section className="relative overflow-hidden py-20">
            {/* Background */}
            <div className="absolute inset-0 -z-20 overflow-hidden">
                <div className="absolute left-1/2 top-0 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-white/[0.04] blur-3xl" />
            </div>

            <Container>
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
                                Publish multilingual technical articles,
                                engineering writeups, tutorials, and long-form
                                markdown content.
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
                                    "Publish article"
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
                                            Select languages available for this
                                            article.
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
                                                        handleLanguageToggle(
                                                            language,
                                                        )
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
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold text-white">
                                        Article details
                                    </h3>

                                    <p className="text-sm text-white/40">
                                        Main public information about the
                                        article.
                                    </p>
                                </div>

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
                                            placeholder="building-scalable-mern-systems"
                                            className="h-12 border-white/10 bg-white/[0.03] text-white"
                                        />

                                        {errors.slug && (
                                            <p className="text-sm text-red-400">
                                                {errors.slug.message}
                                            </p>
                                        )}
                                    </div>
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

                                {errors.excerpt?.en && (
                                    <p className="text-sm text-red-400">
                                        {errors.excerpt.en.message}
                                    </p>
                                )}
                            </div>

                            {/* Markdown Content */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Markdown content</Label>

                                    <p className="text-sm text-white/40">
                                        Write long-form markdown content with
                                        code blocks, headings, lists, and
                                        formatting support.
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

                        {/* Bottom Sticky Bar */}
                        <div className="sticky bottom-0 flex items-center justify-between border-t border-white/5 bg-black/40 p-6 backdrop-blur-xl">
                            <div>
                                <p className="font-medium text-white">
                                    Ready to publish
                                </p>

                                <p className="text-sm text-white/40">
                                    Your article will become publicly visible.
                                </p>
                            </div>

                            <Button
                                type="submit"
                                disabled={isPending}
                                className="rounded-xl bg-white text-black hover:bg-white/90"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 size-4 animate-spin" />
                                        Publishing...
                                    </>
                                ) : (
                                    "Publish"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </Container>
        </Section>
    );
};

export default CreateBlogPage;
