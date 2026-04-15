import Link from "next/link";
import { posts } from "#site/content";
import {
  navLinks,
  nowItems,
  profile,
  selectedWork,
  writingIntro,
  isPublicPost,
} from "../data/site-content";
import { SeoHead } from "../components/SeoHead";

const featuredPosts = [...posts]
  .filter(isPublicPost)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

export default function Home() {
  return (
    <>
      <SeoHead
        title="Jorge Guberte — AI Engineer & Agent Systems Architect"
        description="Memory-driven AI systems, agent architecture, open-source experiments, and writing by Jorge Guberte."
        path="/"
      />

      <main className="min-h-screen px-6 py-12 md:py-16 max-w-5xl mx-auto">
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-18">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400 mb-3">
              {profile.title}
            </p>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight max-w-3xl text-balance">
              {profile.hero}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400">
              {profile.intro}
            </p>
          </div>

          <nav className="flex flex-wrap gap-3 md:max-w-xs md:justify-end">
            {navLinks.map((link) => {
              const common =
                "font-mono text-sm text-neutral-300 hover:text-emerald-300 transition-colors border border-neutral-800 rounded-full px-4 py-2 hover:border-emerald-500/50";

              return link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={common}
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.label} href={link.href} className={common}>
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </header>

        <section className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] mb-18">
          <div className="rounded-3xl border border-neutral-900 bg-neutral-950/70 p-7 md:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400 mb-4">
              About
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
              {profile.name}
            </h2>
            <p className="text-neutral-300 leading-relaxed text-base md:text-lg">
              {profile.aboutSnippet}
            </p>
            <Link
              href="/about"
              className="inline-flex mt-6 font-mono text-sm text-emerald-300 hover:text-emerald-200"
            >
              Read more about my work →
            </Link>
          </div>

          <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/[0.04] p-7 md:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400 mb-4">
              Now
            </p>
            <ul className="space-y-4 text-neutral-300 leading-relaxed">
              {nowItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-18">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400 mb-3">
                Selected Work
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Projects with a strong point of view.
              </h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {selectedWork.map((project) => (
              <article
                key={project.name}
                className="rounded-3xl border border-neutral-900 bg-neutral-950/70 p-6 flex flex-col"
              >
                <div className="mb-5">
                  <h3 className="text-xl font-semibold tracking-tight mb-3">{project.name}</h3>
                  <p className="text-neutral-200 leading-relaxed mb-3">{project.primary}</p>
                  <p className="text-sm text-neutral-400 leading-relaxed">{project.secondary}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2.5 py-1 rounded-full bg-neutral-900 text-neutral-500 border border-neutral-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-3">
                  {project.links.map((link) => {
                    const external = link.href.startsWith("http");
                    const cls =
                      "font-mono text-sm text-neutral-300 hover:text-emerald-300 transition-colors";

                    return external ? (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cls}
                      >
                        {link.label} →
                      </a>
                    ) : (
                      <Link key={link.label} href={link.href} className={cls}>
                        {link.label} →
                      </Link>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-18 rounded-3xl border border-neutral-900 bg-neutral-950/70 p-7 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400 mb-3">
                Labs
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
                A playground for experiments, interfaces, and useful weirdness.
              </h2>
              <p className="max-w-2xl text-neutral-400 leading-relaxed">
                Static, fast, and intentionally scrappy. This is where prototypes can exist before they deserve a product page.
              </p>
            </div>
            <div>
              <Link href="/labs/" className="font-mono text-sm text-emerald-300 hover:text-emerald-200">
                Visit Labs →
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-18">
          <div className="mb-6">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400 mb-3">
              Writing
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
              Notes from the builder side of AI.
            </h2>
            <p className="max-w-2xl text-neutral-400 leading-relaxed">{writingIntro}</p>
          </div>

          <div className="grid gap-4">
            {featuredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-3xl border border-neutral-900 bg-neutral-950/70 p-6 hover:border-emerald-500/40 transition-colors"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-2xl">
                    <h3 className="text-xl font-semibold tracking-tight mb-2">{post.title}</h3>
                    <p className="text-neutral-400 leading-relaxed">{post.description}</p>
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

          <div className="mt-6">
            <Link href="/blog" className="font-mono text-sm text-emerald-300 hover:text-emerald-200">
              Browse all writing →
            </Link>
          </div>
        </section>

        <footer className="pt-8 border-t border-neutral-900 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-xs font-mono text-neutral-600">© {new Date().getFullYear()} Jorge Guberte</p>
          <p className="text-sm text-neutral-500 max-w-2xl">
            Building systems around memory, context, retrieval, and the weird places where software starts feeling cognitive.
          </p>
        </footer>
      </main>
    </>
  );
}
