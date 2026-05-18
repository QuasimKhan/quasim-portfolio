import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { useLanguageStore } from "@/store/language-store";
import { getLanguageDirection } from "@/utils/get-language-direction";

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
            className={`
        prose
        prose-invert
        max-w-none

        prose-headings:text-white
        prose-p:text-white/70
        prose-p:leading-8

        prose-li:text-white/70

        prose-strong:text-white

        prose-code:text-white
        prose-code:before:hidden
        prose-code:after:hidden

        prose-pre:border
        prose-pre:border-white/10
        prose-pre:bg-black/40
        ${isRTL ? "text-right" : "text-left"}

      `}
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
            >
                {content}
            </ReactMarkdown>
        </article>
    );
};

export default MarkdownRenderer;
