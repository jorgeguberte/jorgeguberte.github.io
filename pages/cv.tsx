import Link from "next/link";
import { SeoHead } from "../components/SeoHead";
import { getPersonSchema, getBreadcrumbSchema } from "../data/schema";
import {
  profile,
  proofStats,
  experience,
  skillGroups,
  education,
  featuredWork,
} from "../data/site-content";

export default function Cv() {
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "CV", path: "/cv" },
  ]);

  return (
    <>
      <SeoHead
        title="Curriculum Vitae — Jorge Guberte | Principal AI Systems Architect"
        description="Principal AI Systems Architect. 12+ years of production systems, agent orchestration, cognitive memory architectures, and applied AI R&D. Printable CV."
        path="/cv"
        jsonLd={[getPersonSchema(), breadcrumb]}
      />

      <div className="cv-root shell py-16 md:py-24">
        {/* Header */}
        <header className="flex flex-col justify-between gap-6 border-b-2 border-brass-400 pb-8 md:flex-row md:items-end">
          <div>
            <h1 className="display text-5xl md:text-7xl">Jorge Guberte</h1>
            <p className="mt-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brass-400 md:text-sm">
              {profile.title}
            </p>
            <p className="mt-2 text-sm text-bone-400">
              São Paulo, Brazil · Remote-friendly · {profile.email}
            </p>
          </div>
          <div className="no-print flex flex-wrap gap-x-6 gap-y-2">
            <a href={"mailto:" + profile.email + "?subject=Reaching out about your CV"} className="link-quiet">Email me ↗</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link-quiet">LinkedIn ↗</a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="link-quiet">GitHub ↗</a>
          </div>
        </header>

        {/* Summary */}
        <section className="mt-10 max-w-4xl">
          <p className="font-serif text-xl leading-relaxed text-bone-200 md:text-2xl">
            Software engineer with 12+ years engineering scalable platforms, distributed
            architectures, and high-throughput data pipelines. Current focus: applied AI systems
            architecture — moving foundation models from stateless chat into persistent,
            autonomous, context-aware products through memory substrates, tool orchestration,
            and generative UI.
          </p>
        </section>

        {/* Proof stats */}
        <section className="mt-10 grid grid-cols-2 gap-px border border-ink-700 bg-ink-700 md:grid-cols-4">
          {proofStats.map((stat) => (
            <div key={stat.label} className="bg-ink-900 p-5">
              <p className="display text-3xl">{stat.value}</p>
              <p className="mt-1 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.15em] text-brass-400">
                {stat.label}
              </p>
            </div>
          ))}
        </section>

        {/* Experience */}
        <section className="mt-14">
          <h2 className="kicker mb-8">Experience</h2>
          <ol className="space-y-12">
            {experience.map((job) => (
              <li key={job.org + job.period} className="break-inside-avoid">
                <div className="flex flex-col justify-between gap-1 md:flex-row md:items-baseline">
                  <h3 className="font-serif text-2xl text-bone-100">
                    {job.role} <span className="text-bone-500">·</span>{" "}
                    <span className="text-brass-300">{job.org}</span>
                  </h3>
                  <p className="tag shrink-0">{job.period} — {job.location}</p>
                </div>
                <p className="body-text mt-3 max-w-4xl">{job.summary}</p>
                <ul className="mt-3 space-y-1.5">
                  {job.bullets.map((b) => (
                    <li key={b} className="body-text flex gap-3 text-sm leading-6">
                      <span aria-hidden="true" className="text-brass-400">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        {/* Selected projects */}
        <section className="mt-14 break-before-page">
          <h2 className="kicker mb-8">Selected projects & R&amp;D</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {featuredWork.map((item) => (
              <article key={item.slug} className="break-inside-avoid border border-ink-700 bg-ink-900/60 p-6">
                <h3 className="font-serif text-xl text-bone-100">{item.name}</h3>
                <p className="display-italic mt-1 text-base">{item.oneLiner}</p>
                <p className="body-text mt-3 text-sm leading-6">{item.description}</p>
                <p className="tag mt-4 normal-case">{item.stack.join(" · ")}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mt-14">
          <h2 className="kicker mb-8">Core skills</h2>
          <dl className="space-y-4">
            {skillGroups.map((group) => (
              <div key={group.label} className="flex flex-col gap-1 md:flex-row md:gap-6">
                <dt className="tag w-40 shrink-0 pt-1">{group.label}</dt>
                <dd className="body-text text-sm leading-6">{group.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Education + languages */}
        <section className="mt-14 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="kicker mb-8">Education</h2>
            <ul className="space-y-4">
              {education.map((e) => (
                <li key={e.org}>
                  <p className="font-serif text-lg text-bone-100">{e.credential}</p>
                  <p className="body-text text-sm">{e.org} · {e.year}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="kicker mb-8">Languages</h2>
            <ul className="space-y-2 body-text text-sm leading-6">
              <li>Portuguese — native</li>
              <li>English — fluent; extensive distributed international team experience</li>
            </ul>
          </div>
        </section>

        <footer className="no-print mt-20 border-t border-ink-700 pt-10">
          <p className="pullquote ml-8 max-w-3xl md:ml-12">
            This page prints cleanly to PDF — or keep reading the long version{" "}
            <Link href="/about" className="link-serif">here</Link>.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href={"/cv"} onClick={(e) => { e.preventDefault(); window.print(); }} className="btn-primary">
              Print / save as PDF
            </a>
            <Link href="/" className="btn-ghost">Back home</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
