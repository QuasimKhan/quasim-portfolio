import {
    headingsPlugin,
    listsPlugin,
    markdownShortcutPlugin,
    MDXEditor,
    quotePlugin,
    thematicBreakPlugin,
    toolbarPlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    codeBlockPlugin,
    codeMirrorPlugin,
    linkPlugin,
    linkDialogPlugin,
    ListsToggle,
} from "@mdxeditor/editor";

interface MarkdownEditorProps {
    value: string;

    onChange: (value: string) => void;
}

const MarkdownEditor = ({ value, onChange }: MarkdownEditorProps) => {
    return (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
            <MDXEditor
                markdown={value}
                onChange={onChange}
                plugins={[
                    headingsPlugin(),

                    listsPlugin(),

                    quotePlugin(),

                    thematicBreakPlugin(),

                    markdownShortcutPlugin(),

                    codeBlockPlugin(),

                    codeMirrorPlugin({
                        codeBlockLanguages: {
                            js: "JavaScript",
                            ts: "TypeScript",
                            jsx: "React JSX",
                            tsx: "React TSX",
                            css: "CSS",
                            html: "HTML",
                        },
                    }),

                    linkPlugin(),

                    linkDialogPlugin(),

                    toolbarPlugin({
                        toolbarContents: () => (
                            <>
                                <UndoRedo />

                                <BoldItalicUnderlineToggles />

                                <ListsToggle />
                            </>
                        ),
                    }),
                ]}
                contentEditableClassName="
          prose
          prose-invert
          max-w-none
          min-h-[500px]
          px-6
          py-6
          text-white
          focus:outline-none
        "
            />
        </div>
    );
};

export default MarkdownEditor;
