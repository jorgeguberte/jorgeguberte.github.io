import Link from "next/link";
import Image from "next/image";
import { posts } from "#site/content";
import { MemoryField } from "../components/MemoryField";
import { SeoHead } from "../components/SeoHead";
import { isPublicPost, thesis, whyMemory, labPrograms, systemProjects, writingIntro, profile } from "../data/site-content";

const work = [
  ...labPrograms.map((p) => ({
    href: "/lab/" + p.slug,
    kind: p.themes[0],
    name: p.name,
    statement: p.oneLiner,
  })),
  ...systemProjects.map((p) => ({
    href: "/systems/" + p.slug,
    kind: p.kind === "flagship" ? "Embodied AI" : "Open source",
    name: p.name,
    statement: p.oneLiner,
  })),
];

export default function Home() {
  const latestPosts = [...posts]
    .filter(isPublicPost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div>
      <SeoHead
        title="Jorge Guberte | AI Systems"
        description={thesis}
        path="/"
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-700" style={{ minHeight: "calc(100svh - 5rem)" }}>
        <MemoryField />
        <div className="shell relative z-10 flex min-h-[calc(100svh-5rem)] items-center py-24">
          <div className="max-w-4xl">
            <p className="kicker mb-8">{profile.eyebrow}</p>
            <h1 className="display text-6xl md:text-8xl lg:text-9xl" style={{ lineHeight: 0.94 }}>
              Systems should <em className="font-light text-brass-300">remember.</em>
            </h1>
            <p className="dek mt-10 max-w-2xl">{profile.subhead}</p>
            <div className="mt-14 flex flex-wrap gap-4">
              <Link href="#work" className="btn-primary">Explore work</Link>
              <Link href="/about" className="link-quiet mt-3">Read the thesis</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why memory */}
      <section className="section section-rule">
        <div className="shell">
          <p className="kicker mb-4">{whyMemory.label}</p>
          <div className="max-w-3xl space-y-8">
            {whyMemory.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "font-serif text-2xl leading-snug text-bone-100 md:text-3xl" : "body-text text-lg"}>
                {p}
              </p>
            ))}
          </div>
          <Link href="/about" className="link-quiet mt-10 inline-flex">Follow the research</Link>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="section section-rule">
        <div className="shell">
          <div className="mb-16 max-w-3xl">
            <h2 className="display text-4xl md:text-6xl">One program. Multiple instruments.</h2>
            <p className="body-text mt-6 max-w-xl">Formal ideas, production systems, and open experiments connected by the same long-horizon problem.</p>
          </div>
          <div className="space-y-px border-t border-ink-700">
            {work.map((item) => (
              <Link key={item.name} href={item.href} className="plane plane-hover group block p-8 md:p-10">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-2xl">
                    <p className="kicker mb-3">{item.kind}</p>
                    <h3 className="display text-3xl transition-colors group-hover:text-brass-300 md:text-4xl">{item.name}</h3>
                    <p className="display-italic mt-2 text-xl">{item.statement}</p>
                  </div>
                  <span className="link-quiet shrink-0 md:pt-10">Learn more →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Writing */}
      <section className="section section-rule">
        <div className="shell">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="display text-4xl md:text-6xl">Notes from the builder side.</h2>
              <p className="body-text mt-4 max-w-xl">{writingIntro}</p>
            </div>
            <Link href="/writing" className="link-quiet shrink-0">Browse all writing</Link>
          </div>
          {latestPosts.length > 0 ? (
            <div className="space-y-px border-t border-ink-700">
              {latestPosts.map((post) => (
                <Link key={post.slug} href={"/writing/" + post.slug} className="plane plane-hover group flex items-center justify-between gap-6 p-6">
                  <div className="max-w-2xl">
                    <h3 className="font-serif text-2xl text-bone-100 transition-colors group-hover:text-brass-300">{post.title}</h3>
                    <p className="body-text mt-2 text-sm">{post.description}</p>
                  </div>
                  <time className="tag shrink-0">
                    {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                  </time>
                </Link>
              ))}
            </div>
          ) : (
            <div className="border-y border-ink-700 py-12">
              <p className="body-text text-bone-400">
                First essays arriving soon — on memory architectures, context engineering,
                and what long-running AI systems actually require. Subscribe via{" "}
                <a href="/feed.xml" className="link-quiet">RSS</a> to read them first.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-ink-900/50">
        <div className="shell">
          <div className="max-w-3xl">
            <h2 className="display text-4xl md:text-6xl">Building something that needs to remember?</h2>
            <p className="body-text mt-6 max-w-xl">I work with teams where persistence, context, or long-horizon behavior is the hard architectural problem.</p>
            <Link href="/work-with-me" className="btn-primary mt-10">Discuss a system</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
