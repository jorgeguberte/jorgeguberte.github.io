import Link from "next/link";
import { posts } from "#site/content";
import { MemoryField } from "../components/MemoryField";
import { SeoHead } from "../components/SeoHead";
import {
  isPublicPost,
  thesis,
  profile,
  proofStats,
  featuredWork,
  experience,
  writingIntro,
} from "../data/site-content";

export default function Home() {
  const latestPosts = [...posts]
    .filter(isPublicPost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div>
      <SeoHead
        title="Jorge Guberte | Principal AI Systems Architect"
        description="12+ years shipping production systems. Agent orchestration, cognitive memory, RAG pipelines, generative UI — AI taken out of the chat box and into products that run."
        path="/"
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-700" style={{ minHeight: "calc(100svh - 5rem)" }}>
        <MemoryField />
        <div className="shell relative z-10 flex min-h-[calc(100svh-5rem)] items-center py-24">
          <div className="max-w-4xl">
            <p className="kicker mb-8">{profile.eyebrow}</p>
            <h1 className="display text-6xl md:text-8xl lg:text-9xl" style={{ lineHeight: 0.94 }}>
              I build AI systems that <em className="font-light text-brass-300">ship</em> — and{" "}
              <em className="font-light text-brass-300">remember.</em>
            </h1>
            <p className="dek mt-10 max-w-2xl">{profile.subhead}</p>
            <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/work-with-me" className="btn-primary">Work with me</Link>
              <a href="/cv" className="link-quiet">View CV</a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="link-quiet">GitHub ↗</a>
            </div>
          </div>
        </div>
      </section>

      {/* Proof strip */}
      <section className="border-b border-ink-700 bg-ink-900/50">
        <div className="shell grid grid-cols-2 lg:grid-cols-4">
          {proofStats.map((stat) => (
            <div key={stat.label} className="border-ink-700 p-7 [&:not(:nth-child(2n))]:border-r max-lg:[&:not(:nth-child(n+3))]:border-b lg:border-r lg:last:border-r-0">
              <p className="display text-4xl md:text-5xl">{stat.value}</p>
              <p className="mt-3 font-mono text-[0.63rem] font-semibold uppercase tracking-[0.18em] text-brass-400">
                {stat.label}
              </p>
              <p className="mt-2 text-sm leading-6 text-bone-500">{stat.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured work */}
      <section id="work" className="section section-rule">
        <div className="shell">
          <div className="mb-16 max-w-3xl">
            <p className="kicker mb-4">Selected work</p>
            <h2 className="display text-4xl md:text-6xl">Proof, not promises.</h2>
            <p className="body-text mt-6 max-w-xl">
              One production B2G platform, two open-source systems, and an embodied AI companion —
              all attacking the same long-horizon problem.
            </p>
          </div>
          <div className="space-y-px border-t border-ink-700">
            {featuredWork.map((item) => (
              <Link
                key={item.slug}
                href={item.href}
                {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="plane plane-hover group block p-8 md:p-10"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-2xl">
                    <p className="kicker mb-3">{item.kind}</p>
                    <h3 className="display text-3xl transition-colors group-hover:text-brass-300 md:text-4xl">
                      {item.name}
                      {item.external ? " ↗" : ""}
                    </h3>
                    <p className="display-italic mt-2 text-xl">{item.oneLiner}</p>
                    <ul className="mt-5 space-y-2">
                      {item.highlights.slice(0, 2).map((h) => (
                        <li key={h} className="body-text flex gap-3 text-sm leading-6">
                          <span aria-hidden="true" className="text-brass-400">▸</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className="link-quiet shrink-0 md:pt-10">
                    {item.external ? "Open" : "Read more"} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="section section-rule">
        <div className="shell">
          <div className="mb-16 max-w-3xl">
            <p className="kicker mb-4">Experience</p>
            <h2 className="display text-4xl md:text-6xl">Twelve years. One direction.</h2>
          </div>
          <ol className="border-t border-ink-700">
            {experience.map((job) => (
              <li key={job.org + job.period} className="writing-row grid-cols-[13rem_1fr] max-md:grid-cols-1">
                <div>
                  <p className="font-mono text-[0.63rem] font-semibold uppercase tracking-[0.15em] text-brass-400">
                    {job.period}
                  </p>
                  <p className="tag mt-2 normal-case">{job.location}</p>
                </div>
                <div className="pb-7">
                  <h3 className="font-serif text-2xl text-bone-100">{job.role}</h3>
                  <p className="display-italic mt-1 text-lg">{job.org}</p>
                  <p className="body-text mt-4 max-w-3xl">{job.summary}</p>
                  <ul className="mt-4 space-y-2">
                    {job.bullets.slice(0, 3).map((b) => (
                      <li key={b} className="body-text flex gap-3 text-sm leading-6">
                        <span aria-hidden="true" className="text-brass-400">▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/cv" className="link-quiet mt-10 inline-flex">Full CV (printable) →</Link>
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
                Essays on memory architectures, context engineering, and what long-running AI systems
                actually require — arriving soon. Subscribe via{" "}
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
            <p className="body-text mt-6 max-w-xl">
              I work with teams where persistence, context, or long-horizon behavior is the hard
              architectural problem — and I&apos;m open to principal-level roles with the right team.
            </p>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              <Link href="/work-with-me" className="btn-primary">Start the conversation</Link>
              <a href={"mailto:" + profile.email} className="link-quiet mt-3">{profile.email}</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
