import Link from "next/link";
import { posts } from "#site/content";
import { writingIntro, isPublicPost } from "../../data/site-content";
import { SeoHead } from "../../components/SeoHead";

export default function WritingIndex() {
  const sortedPosts = [...posts]
    .filter(isPublicPost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <SeoHead
        title="Writing — Jorge Guberte"
        description={writingIntro}
        path="/writing"
      />

      <div className="shell py-24 md:py-32">
        <div className="mb-10 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <span className="h-px w-12 bg-brass-500/70" />
            <p className="kicker">Writing</p>
          </div>
          <a href="/feed.xml" className="link-quiet">
            RSS
          </a>
        </div>
        <h1 className="display max-w-4xl text-5xl md:text-6xl">
          Notes from <em className="font-light text-brass-300">the lab</em>.
        </h1>
        <p className="dek mt-8 max-w-2xl">{writingIntro}</p>

        {sortedPosts.length > 0 ? (
          <ul className="mt-16 divide-y divide-ink-700 border-y border-ink-700">
            {sortedPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/writing/${post.slug}`}
                  className="group flex flex-col gap-1 py-8 sm:flex-row sm:items-baseline sm:gap-10"
                >
                  <time className="tag shrink-0 sm:w-32">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <span className="max-w-2xl">
                    <span className="font-serif text-3xl text-bone-100 transition-colors group-hover:text-brass-300">
                      {post.title}
                    </span>
                    <span className="mt-2 block text-sm leading-7 text-bone-500">
                      {post.description}
                    </span>
                    {post.tags && post.tags.length > 0 && (
                      <span className="tag mt-3 block">
                        {post.tags.join(" · ")}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-16 border-y border-ink-700 py-12">
            <p className="body-text text-bone-400">
              First essays arriving soon — on memory architectures, context
              engineering, and what long-running AI systems actually require.
              Subscribe via{" "}
              <a href="/feed.xml" className="link-quiet">
                RSS
              </a>{" "}
              to read them first.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
