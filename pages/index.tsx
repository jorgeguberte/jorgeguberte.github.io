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

const signals = ["Memory", "Agents", "Retrieval", "Inference"];

export default function Home() {
  return (
    <>
      <SeoHead
        title="Jorge Guberte — AI Engineer & Agent Systems Architect"
        description="Memory-driven AI systems, agent architecture, open-source experiments, and writing by Jorge Guberte."
        path="/"
      />

      <main className="site-shell overflow-hidden">
        <div className="hero-orb" />

        <nav className="top-nav">
          <Link href="/" className="font-mono text-xs uppercase tracking-[0.24em] text-neutral-200">
            Jorge Guberte
          </Link>
          <div className="flex flex-wrap gap-2">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-pill"
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.label} href={link.href} className="nav-pill">
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </nav>

        <header className="relative mb-16 grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <div>
            <p className="eyebrow mb-5">{profile.title}</p>
            <h1 className="gradient-text max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-balance sm:text-6xl md:text-7xl">
              {profile.hero}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-300 md:text-xl">
              {profile.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="rounded-full bg-emerald-300 px-5 py-3 font-mono text-sm text-neutral-950 transition hover:bg-emerald-200">
                About the work →
              </Link>
              <Link href="/blog" className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 font-mono text-sm text-neutral-200 transition hover:border-emerald-300/50 hover:text-emerald-200">
                Read notes →
              </Link>
            </div>
          </div>

          <aside className="glass-card p-5 md:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="eyebrow">System focus</p>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_24px_rgba(52,211,153,1)]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {signals.map((signal) => (
                <div key={signal} className="rounded-2xl border border-white/10 bg-neutral-950/60 p-4">
                  <p className="font-mono text-sm text-neutral-200">{signal}</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-neutral-800">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-200" />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-neutral-400">
              Designing AI systems as living infrastructure: context flows, memory decays, tools compose, and interfaces stay human.
            </p>
          </aside>
        </header>

        <section className="mb-16 grid gap-5 md:grid-cols-[1.05fr_0.95fr]">
          <article className="glass-card card-hover p-7 md:p-8">
            <div className="section-kicker">
              <p className="eyebrow">About</p>
            </div>
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white">{profile.name}</h2>
            <p className="text-lg leading-8 text-neutral-300">{profile.aboutSnippet}</p>
            <Link href="/about" className="link-arrow mt-7 inline-flex">
              Read more about my work →
            </Link>
          </article>

          <article className="glass-card-strong p-7 md:p-8">
            <div className="section-kicker">
              <p className="eyebrow">Now</p>
            </div>
            <ul className="space-y-4 text-neutral-200">
              {nowItems.map((item) => (
                <li key={item} className="flex gap-3 leading-7">
                  <span className="dot" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mb-16">
          <div className="mb-6 max-w-2xl">
            <div className="section-kicker">
              <p className="eyebrow">Selected Work</p>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Projects with a strong point of view.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {selectedWork.map((project, index) => (
              <article key={project.name} className="glass-card card-hover flex min-h-[24rem] flex-col p-6">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs text-emerald-300/80">0{index + 1}</p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{project.name}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-2xl border border-emerald-300/20 bg-emerald-300/10" />
                </div>

                <p className="mb-3 text-neutral-100 leading-7">{project.primary}</p>
                <p className="mb-6 text-sm leading-6 text-neutral-400">{project.secondary}</p>

                <div className="mb-7 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-4">
                  {project.links.map((link) => {
                    const external = link.href.startsWith("http");
                    return external ? (
                      <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="link-arrow">
                        {link.label} →
                      </a>
                    ) : (
                      <Link key={link.label} href={link.href} className="link-arrow">
                        {link.label} →
                      </Link>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="glass-card mb-16 p-7 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="section-kicker">
                <p className="eyebrow">Labs</p>
              </div>
              <h2 className="mb-3 text-3xl font-semibold tracking-tight text-white">
                A playground for useful weirdness.
              </h2>
              <p className="max-w-2xl leading-7 text-neutral-400">
                Static, fast, and intentionally scrappy. Interfaces, experiments, tiny tools, and prototypes before they deserve a product page.
              </p>
            </div>
            <Link href="/labs/" className="link-arrow shrink-0">
              Visit Labs →
            </Link>
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-6 max-w-2xl">
            <div className="section-kicker">
              <p className="eyebrow">Writing</p>
            </div>
            <h2 className="mb-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Notes from the builder side of AI.
            </h2>
            <p className="leading-7 text-neutral-400">{writingIntro}</p>
          </div>

          <div className="grid gap-4">
            {featuredPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="glass-card card-hover block p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-2xl">
                    <h3 className="mb-2 text-xl font-semibold tracking-tight text-white">{post.title}</h3>
                    <p className="leading-7 text-neutral-400">{post.description}</p>
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

          <Link href="/blog" className="link-arrow mt-6 inline-flex">
            Browse all writing →
          </Link>
        </section>

        <footer className="border-t border-white/10 py-8 text-sm text-neutral-500 md:flex md:items-center md:justify-between md:gap-6">
          <p className="font-mono text-xs">© {new Date().getFullYear()} Jorge Guberte</p>
          <p className="mt-3 max-w-2xl md:mt-0">
            Building systems around memory, context, retrieval, and the weird places where software starts feeling cognitive.
          </p>
        </footer>
      </main>
    </>
  );
}
