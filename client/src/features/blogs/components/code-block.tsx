import { useState } from "react";

import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
    children: string;
    className?: string;
}

const CodeBlock = ({ children, className }: CodeBlockProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(children);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className="group relative">
            {/* Copy Button */}
            <button
                onClick={handleCopy}
                className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-lg border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-white/70 opacity-0 backdrop-blur-md transition-all duration-300 hover:bg-black/80 hover:text-white group-hover:opacity-100"
            >
                {copied ? (
                    <>
                        <Check className="size-3.5" />
                        Copied
                    </>
                ) : (
                    <>
                        <Copy className="size-3.5" />
                        Copy
                    </>
                )}
            </button>

            <pre className={className}>
                <code>{children}</code>
            </pre>
        </div>
    );
};

export default CodeBlock;
