import ContentDisplay from "@/components/ContentDisplay";
import { getDocuments } from "@/lib/doc"
import { getDocumentsByAuthor } from "@/utils/doc-util";


const AuthorPage = ({params: {name}}) => {
  const docs = getDocuments();
  const matchedDocs = getDocumentsByAuthor(docs, name);

  return (
    <ContentDisplay id={matchedDocs[0].id} />
  )
}

export default AuthorPage