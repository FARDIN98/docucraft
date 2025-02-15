/* eslint-disable jsx-a11y/alt-text */
// Import Next.js components for optimized image and navigation
import Image from "next/image";
import Link from "next/link";

// Landing component - Main hero section of the documentation site
const Landing = () => {
  return (
    <article>
      <div className="relative">
        {/* Main content container with responsive padding */}
        <div className=" relative mx-auto px-4 ">
          {/* Grid layout for content and image */}
          <div className="mx-auto grid max-w-[40rem] grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-5">
            {/* Left column: Text content */}
            <div className="flex flex-col lg:pb-6 lg:col-span-2 justify-center">
              {/* Main heading */}
              <h1 className="mt-4 text-6xl font-extrabold leading-none tracking-tight text-slate-900 sm:text-5xl sm:leading-[3.5rem]">
                Protocol
              </h1>

              {/* Description text */}
              <p className="mt-6 text-base leading-7 text-slate-700">
                It does not matter if you have an API if nobody knows how to use
                it. Teach people the ins and outs of OAuth 2.0 and JWTs in style
                with Protocol, a beautiful API documentation template.
              </p>

              {/* Call to action button */}
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/docs/introduction"
                  className="inline-flex justify-center rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700"
                >
                  <span>Get Started</span>
                </Link>
              </div>
            </div>
            {/* Right column: Banner image */}
            <div className="relative lg:col-span-3">
              <Image
                src="/banner.png"
                width="1600"
                height="1280"
                className="relative z-20 -mb-36 aspect-[853/682] max-w-[630px] rounded-xl bg-slate-200 shadow-xl shadow-black/5 ring-1 ring-slate-900/5 sm:-mb-16 lg:-mb-8 xl:-mb-16"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Landing;
