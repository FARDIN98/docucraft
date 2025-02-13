import ContentDisplay from "@/components/ContentDisplay";
import { getDocuments } from "@/lib/doc";
import { getDocumentsByTags } from "@/utils/doc-util";




const TagPage = ({ params: { name } }) => {
  const docs = getDocuments();
  const matchedDocuments = getDocumentsByTags(docs, name);
  return (
    <ContentDisplay id={matchedDocuments[0].id} />
  )
};

export default TagPage;
