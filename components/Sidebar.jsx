"use client";
import {
    getDocumentsByAuthor,
    getDocumentsByCategory,
    getDocumentsByTags,
  } from "@/utils/doc-util";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Sidebar = ({ docs }) => {
  const pathName = usePathname();
  // State for root level documents and their children
  const [rootNodes, setRootNodes] = useState([]);
  const [nonRootNodesGrouped, setNonRootNodesGrouped] = useState({});

  useEffect(() => {
    // Filter documents based on current path (tags, authors, categories)
    let matchedDocs = docs;

    if (pathName.includes("/tags")) {
      const tag = pathName.split("/")[2];
      matchedDocs = getDocumentsByTags(docs, tag);
    } else if (pathName.includes("/authors")) {
      const author = pathName.split("/")[2];
      matchedDocs = getDocumentsByAuthor(docs, author);
    } else if (pathName.includes("/categories")) {
      const category = pathName.split("/")[2];
      matchedDocs = getDocumentsByCategory(docs, category);
    }

    // Separate root nodes (no parent) from child nodes
    const roots = matchedDocs.filter((doc) => !doc.parent);
    console.log({ roots });

    // Group child nodes by their parent ID
    const nonRoots = Object.groupBy(
        matchedDocs.filter((doc) => doc.parent),
      ({ parent }) => parent
    );

    // Add missing parent nodes to roots array
    const nonRootsKeys = Reflect.ownKeys(nonRoots);
    nonRootsKeys.forEach(key => {
      const foundInRoots = roots.find((root) => root.id === key);
      if(!foundInRoots){
          const foundInDocs = docs.find((doc) => doc.id === key);
          roots.push(foundInDocs);
      }
    })

    // Sort root nodes by order property
    roots.sort((a,b) => {
      if (a.order < b.order) {
        return -1;
      }
      if(a.order > b.order){
        return 1;
      }
      return 0;
    });

    setRootNodes([...roots]);
    setNonRootNodesGrouped({...nonRoots});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);

  return (
    <nav className="lg:block my-10">
      <ul>
        {/* Sidebar container with decorative elements */}
        <div className="relative mt-3 pl-2">
          {/* Background and border styling */}
          <div className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"></div>
          <div className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"></div>
          <div className="absolute left-2 h-6 w-px bg-emerald-500"></div>
          
          {/* Navigation tree */}
          <ul role="list" className="border-l border-transparent">
            {rootNodes.map((rootNode) => (
              <li key={rootNode.id} className="relative">
                {/* Root level link */}
                <Link
                  aria-current="page"
                  className="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-zinc-900 transition dark:text-white"
                  href={`/docs/${rootNode.id}`}
                >
                  <span className="truncate">{rootNode.title}</span>
                </Link>
                
                {/* Child nodes for current root */}
                {nonRootNodesGrouped[rootNode.id] && (
                  <ul role="list" className="border-l border-transparent">
                    {nonRootNodesGrouped[rootNode.id].map((subRoot) => (
                      <li key={subRoot.id}>
                        <Link
                          className="flex justify-between gap-2 py-1 pl-7 pr-3 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                          href={`/docs/${rootNode.id}/${subRoot.id}`}
                        >
                          <span className="truncate">{subRoot.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </ul>
    </nav>
  );
};

export default Sidebar;
