import Link from "next/link";
import { posts } from "#site/content";
import { isPublicPost, writingIntro } from "../../data/site-content";
import { SeoHead } from "../../components/SeoHead";

export default function BlogIndex() {
  const sortedPosts = [...posts]
    .filter(isPublicPost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <SeoHead
        title="Blog — Jorge Guberte"
        description="Writing on memory, context engineering, infrastructure, and AI systems by Jorge Guberte."
        path="/blog"
      />

      <main className="min-h-screen px-6 py-16 max-w-4xl mx-auto">
        <div className="mb-12 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="font-mono text-sm text-neutral-500 hover:text-emerald-400 transition-colors"
          >
            ← home
          </Link>
          <Link
            href="/about"
            className="font-mono text-sm text-neutral-500 hover:text-emerald-400 transition-colors"
          >
            about →
          </Link>
        </div>

        <header className="mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400 mb-4">
            Writing
          </p>
          <h1 className="text-4xl font-semibold tracking-tight mb-3">Blog</h1>
          <p className="text-neutral-400 max-w-2xl leading-relaxed">{writingIntro}</p>
        </header>

        <div className="grid gap-5">
          {sortedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-3xl border border-neutral-900 bg-neutral-950/70 p-6 hover:border-emerald-500/40 transition-colors group"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="max-w-2xl">
                  <h2 className="text-xl font-semibold tracking-tight group-hover:text-emerald-300 transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                    {post.description}
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono px-2.5 py-1 rounded-full bg-neutral-900 text-neutral-500 border border-neutral-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <time className="font-mono text-xs text-neutral-500 shrink-0 pt-1">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
