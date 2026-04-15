import Head from "next/head";
import Link from "next/link";
import { aboutPage, profile } from "../data/site-content";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About — Jorge Guberte</title>
        <meta
          name="description"
          content="About Jorge Guberte: AI engineer, agent systems architect, and builder of memory-driven software."
        />
      </Head>

      <main className="min-h-screen px-6 py-16 max-w-4xl mx-auto">
        <div className="mb-10">
          <Link
            href="/"
            className="font-mono text-sm text-neutral-500 hover:text-emerald-400 transition-colors"
          >
            ← home
          </Link>
        </div>

        <header className="mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400 mb-4">
            About
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            {profile.name}
          </h1>
          <p className="text-lg text-neutral-300 leading-relaxed max-w-3xl">
            {aboutPage.intro}
          </p>
        </header>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight mb-5">What I care about</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {aboutPage.careAbout.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-neutral-900 bg-neutral-950/70 p-5 text-neutral-300 leading-relaxed"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight mb-5">Selected experience</h2>
          <div className="grid gap-4">
            {aboutPage.work.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-neutral-900 bg-neutral-950/70 p-6"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between mb-3">
                  <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="font-mono text-sm text-emerald-300">{item.role}</p>
                </div>
                <p className="text-neutral-400 leading-relaxed">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight mb-5">Stack</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {aboutPage.stackGroups.map((group) => (
              <article
                key={group.title}
                className="rounded-2xl border border-neutral-900 bg-neutral-950/70 p-6"
              >
                <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400 mb-4">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-emerald-500/20 bg-emerald-500/[0.04] p-7 md:p-8">
          <p className="text-lg text-neutral-200 leading-relaxed max-w-3xl">
            {aboutPage.closing}
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/blog" className="font-mono text-sm text-emerald-300 hover:text-emerald-200">
              Read the blog →
            </Link>
            <a
              href="https://github.com/jorgeguberte"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-emerald-300 hover:text-emerald-200"
            >
              Visit GitHub →
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
