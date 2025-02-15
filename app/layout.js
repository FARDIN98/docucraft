// Import necessary dependencies and components
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { getDocuments } from "@/lib/doc";
import { Suspense } from "react";
import Loading from "@/components/Loading";

// Initialize Inter font with Latin subset
const inter = Inter({ subsets: ["latin"] });

// Define metadata for the application
export const metadata = {
    title: "DocuCraft - A dcumentation website by Protocol",
    description: "A dcumentation website by Protocol",
};

// Root layout component that wraps all pages
export default function RootLayout({ children }) {
    // Fetch all documentation content
    const allDocuments = getDocuments();
    console.log(allDocuments);

    return (
        <html lang="en">
            <body className={inter.className}>
                {/* Main layout container with sidebar offset */}
                <div className="h-full lg:ml-72 xl:ml-80">
                    {/* Wrap content in Suspense for loading states */}
                    <Suspense fallback={<Loading />}>
                        {/* Header component with documentation data */}
                        <Header docs={allDocuments} />
                        {/* Main content area with decorative background */}
                        <div className="relative px-4 pt-14 sm:px-6 lg:px-8">
                            <main className="flex-auto py-16">
                                {/* Decorative gradient background */}
                                <div className="absolute inset-0 -z-10 mx-0 max-w-none overflow-hidden">
                                    <div className="absolute left-1/2 top-0 ml-[-38rem] h-[25rem] w-[81.25rem] dark:[mask-image:linear-gradient(white,transparent)]">
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#36b49f] to-[#DBFF75] opacity-40 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-[#36b49f]/30 dark:to-[#DBFF75]/30 dark:opacity-100"></div>
                                    </div>
                                </div>
                                {children}
                            </main>
                        </div>
                    </Suspense>
                </div>
            </body>
        </html>
    );
}
