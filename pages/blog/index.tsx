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

      <main className="page-shell">
        <nav className="mb-12 flex items-center justify-between gap-4">
          <Link href="/" className="nav-pill">
            ← home
          </Link>
          <Link href="/about" className="nav-pill">
            about →
          </Link>
        </nav>

        <header className="glass-card mb-10 p-7 md:p-10">
          <p className="eyebrow mb-5">Writing</p>
          <h1 className="gradient-text mb-4 text-5xl font-semibold tracking-[-0.05em] md:text-6xl">
            Blog
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-neutral-300">{writingIntro}</p>
        </header>

        <div className="grid gap-5">
          {sortedPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="glass-card card-hover block p-6 group">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="max-w-2xl">
                  <h2 className="mb-2 text-2xl font-semibold tracking-tight text-white transition-colors group-hover:text-emerald-200">
                    {post.title}
                  </h2>
                  <p className="mb-4 text-sm leading-7 text-neutral-400">{post.description}</p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="chip">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <time className="shrink-0 pt-1 font-mono text-xs text-neutral-500">
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
