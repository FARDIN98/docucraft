import fs from "fs";
import path from "path";
import matter from "gray-matter"; // For parsing markdown frontmatter
import { remark } from "remark";
import html from "remark-html";

// Directory where markdown documentation files are stored
const postsDirectory = path.join(process.cwd(), "docs");

/**
 * Retrieves and processes all documentation files
 * @returns {Array} Array of document objects sorted by order
 * Each document object contains:
 * - id: string (filename without .md)
 * - frontmatter data (title, order, etc.)
 */
export function getDocuments() {
    console.log(postsDirectory);
    // Read all files from the docs directory
    const fileNames = fs.readdirSync(postsDirectory);

    // Process each markdown file
    const allDocuments = fileNames.map((fileName) => {
        // Remove .md extension to get id
        const id = fileName.replace(".md", "");

        // Get full path to the file
        const fullPath = path.join(postsDirectory, fileName);

        // Read file contents
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // Parse frontmatter data
        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data,
        };
    });

    // Sort documents by order specified in frontmatter
    return allDocuments.sort((a, b) => {
        if (a.order < b.order) {
            return -1;
        }
        if (a.order > b.order) {
            return 1;
        }
        return 0;
    });
}

/**
 * Retrieves and processes a single document's content
 * @param {string} id - Document ID (filename without .md)
 * @returns {Object} Document object containing:
 * - id: string
 * - contentHtml: string (processed markdown as HTML)
 * - frontmatter data
 */
export async function getDocumentContent(id) {
    // Get full path to the markdown file
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Parse frontmatter and content
    const matterResult = matter(fileContents);

    // Convert markdown content to HTML
    const processedContent = await remark().use(html).process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...matterResult.data,
    }
}
