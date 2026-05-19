import { generateHeadingId } from "./generate-heading-id";

export interface MarkdownHeading {
    level: number;
    text: string;
    id: string;
}

export const extractMarkdownHeadings = (
    markdown: string
): MarkdownHeading[] => {

    const headingRegex =
        /^(#{1,6})\s+(.*)$/gm;

    const headings: MarkdownHeading[] =
        [];

    let match;

    while (
        (match =
            headingRegex.exec(markdown)) !==
        null
    ) {
        const level =
            match[1].length;

        const text =
            match[2].trim();

        const id =
            generateHeadingId(text);

        headings.push({
            level,
            text,
            id,
        });
    }

    return headings;
};