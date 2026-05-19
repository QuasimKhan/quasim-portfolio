import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import { cn } from "@/lib/utils";

import { useLanguageStore } from "@/store/language-store";

import { getLanguageDirection } from "@/utils/get-language-direction";
import { generateHeadingId } from "@/features/blogs/utils/generate-heading-id";
import CodeBlock from "./code-block";

interface MarkdownRendererProps {
    content: string;
}

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
    const { language } = useLanguageStore();

    const direction = getLanguageDirection(language);

    const isRTL = direction === "rtl";

    return (
        <article
            dir={direction}
            className={cn(
                `
        markdown-content prose
        markdown-content prose-invert
        max-w-none

        markdown-content prose-headings:scroll-mt-32
        markdown-content prose-headings:text-white

        markdown-content prose-p:text-white/70
        markdown-content prose-p:leading-8

        markdown-content prose-li:text-white/70

        markdown-content prose-strong:text-white

        markdown-content prose-code:text-white
        markdown-content prose-code:before:hidden
        markdown-content prose-code:after:hidden

        markdown-content prose-pre:overflow-hidden
        markdown-content prose-pre:border
        markdown-content prose-pre:border-white/10
        markdown-content prose-pre:bg-black/40

        markdown-content prose-blockquote:border-white/10
        markdown-content prose-blockquote:text-white/60

        markdown-content prose-a:text-white
        markdown-content prose-a:underline
        markdown-content prose-a:underline-offset-4

        markdown-content prose-hr:border-white/10
      `,

                isRTL ? "text-right" : "text-left",
            )}
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    h1: ({ children }) => {
                        const text = String(children);

                        const id = generateHeadingId(text);

                        return <h1 id={id}>{children}</h1>;
                    },

                    h2: ({ children }) => {
                        const text = String(children);

                        const id = generateHeadingId(text);

                        return <h2 id={id}>{children}</h2>;
                    },

                    h3: ({ children }) => {
                        const text = String(children);

                        const id = generateHeadingId(text);

                        return <h3 id={id}>{children}</h3>;
                    },

                    code(props) {
                        const { children, className, inline } = props;

                        if (inline) {
                            return (
                                <code className={className}>{children}</code>
                            );
                        }

                        return (
                            <CodeBlock className={className}>
                                {String(children).replace(/\n$/, "")}
                            </CodeBlock>
                        );
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </article>
    );
};

export default MarkdownRenderer;
