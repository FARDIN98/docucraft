import { getDocumentContent } from "@/lib/doc";
import Link from "next/link";
import Tag from "./Tag";

/**
 * ContentDisplay Component
 * A server component that renders a documentation article with its metadata and content.
 * Fetches document data using the provided ID and displays it in a formatted layout.
 * 
 * Features:
 * - Displays document title, publication date, author, and category
 * - Shows associated tags with links to tag-filtered views
 * - Renders markdown content as HTML
 * 
 * @param {Object} props
 * @param {string} props.id - Unique identifier for the document to be displayed
 * @returns {Promise<JSX.Element>} Rendered article component
 */
const ContentDisplay = async ({id}) => {
  // Fetch document content and metadata using the provided ID
  // Returns title, date, author, category, tags, and HTML content
  const documentContent = await getDocumentContent(id);

  console.log(documentContent);

  return (
    <article className="prose dark:prose-invert">
      {/* Article Title */}
      <h1>{documentContent.title}</h1>
      
      {/* Article Metadata Section - displays date, author, and category with links */}
      <div>
        <span>Published On: {documentContent.date}</span> by {" "}
        <Link href={`/authors/${documentContent.author}`}>
          {documentContent.author}
        </Link> {" "}
        under the{" "}
        <Link href={`/categories/${documentContent.category}`}>
          {documentContent.category}
        </Link>{" "}
        category.
      </div>

      {/* Tags Section - Renders each tag as a clickable link */}
      <div>
        {documentContent.tags &&
          documentContent.tags.map((tag) => <Tag key={tag} tag={tag} />)}
      </div>

      {/* Main Content Section - Renders markdown content as HTML with lead styling */}
      <div
        className="lead"
        dangerouslySetInnerHTML={{__html: documentContent.contentHtml}}
      />
    </article>
  )
}

export default ContentDisplay