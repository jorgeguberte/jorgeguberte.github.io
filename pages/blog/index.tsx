import Head from "next/head";
import Link from "next/link";
import { posts } from "#site/content";

export default function BlogIndex() {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <Head>
        <title>Blog — Jorge Guberte</title>
        <meta name="description" content="Writing about code, AI, and things that break in interesting ways." />
      </Head>

      <main className="min-h-screen px-6 py-16 max-w-3xl mx-auto">
        <div className="mb-12">
          <Link
            href="/"
            className="font-mono text-sm text-neutral-500 hover:text-emerald-400 transition-colors"
          >
            ← home
          </Link>
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-2">Blog</h1>
        <p className="text-neutral-400 mb-12">
          Writing about code, AI, and things that break in interesting ways.
        </p>

        <div className="grid gap-6">
          {sortedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block border border-neutral-800 rounded-lg p-5 hover:border-emerald-500/50 hover:bg-neutral-900/50 transition-all group"
            >
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h2 className="font-medium text-lg group-hover:text-emerald-400 transition-colors">
                  {post.title}
                </h2>
                <time className="font-mono text-xs text-neutral-600 shrink-0">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {post.description}
              </p>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
