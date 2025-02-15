/**
 * Filter documents by category
 * @param {Array} docs - Array of document objects
 * @param {string} category - Category to filter by
 * @returns {Array} Filtered array of documents matching the category
 */
export function getDocumentsByCategory(docs, category){
    return docs.filter(doc => doc.category === category)
}

/**
 * Filter documents by author
 * @param {Array} docs - Array of document objects
 * @param {string} author - URI-encoded author name to filter by
 * @returns {Array} Filtered array of documents matching the author
 */
export function getDocumentsByAuthor(docs, author){
    return docs.filter(doc => encodeURI(doc.author) === author);
}

/**
 * Filter documents by tag
 * @param {Array} docs - Array of document objects
 * @param {string} tag - Tag to filter by
 * @returns {Array} Filtered array of documents that include the specified tag
 */
export function getDocumentsByTags(docs, tag){
    return docs.filter(doc => doc.tags.some(inputTag => inputTag === tag));
}