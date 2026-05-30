import Link from "next/link";
import { aboutPage, profile } from "../data/site-content";
import { SeoHead } from "../components/SeoHead";

export default function AboutPage() {
  return (
    <>
      <SeoHead
        title="About — Jorge Guberte"
        description="About Jorge Guberte: AI engineer, agent systems architect, and builder of memory-driven software."
        path="/about"
      />

      <main className="page-shell">
        <nav className="mb-12 flex items-center justify-between gap-4">
          <Link href="/" className="nav-pill">
            ← home
          </Link>
          <Link href="/blog" className="nav-pill">
            writing →
          </Link>
        </nav>

        <header className="glass-card mb-12 p-7 md:p-10">
          <p className="eyebrow mb-5">About</p>
          <h1 className="gradient-text mb-5 text-5xl font-semibold tracking-[-0.05em] md:text-6xl">
            {profile.name}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-neutral-300 md:text-xl">
            {aboutPage.intro}
          </p>
        </header>

        <section className="mb-12">
          <div className="section-kicker">
            <p className="eyebrow">What I care about</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {aboutPage.careAbout.map((item) => (
              <article key={item} className="glass-card card-hover p-5">
                <div className="flex gap-3 leading-7 text-neutral-200">
                  <span className="dot" />
                  <span>{item}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="section-kicker">
            <p className="eyebrow">Selected experience</p>
          </div>
          <div className="grid gap-4">
            {aboutPage.work.map((item) => (
              <article key={item.title} className="glass-card card-hover p-6">
                <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">{item.title}</h2>
                  <p className="font-mono text-sm text-emerald-300">{item.role}</p>
                </div>
                <p className="leading-7 text-neutral-400">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="section-kicker">
            <p className="eyebrow">Stack</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {aboutPage.stackGroups.map((group) => (
              <article key={group.title} className="glass-card p-6">
                <h2 className="eyebrow mb-4">{group.title}</h2>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="glass-card-strong p-7 md:p-8">
          <p className="max-w-3xl text-xl leading-8 text-neutral-100">{aboutPage.closing}</p>
          <div className="mt-7 flex flex-wrap gap-4">
            <Link href="/blog" className="link-arrow">
              Read the blog →
            </Link>
            <a href="https://github.com/jorgeguberte" target="_blank" rel="noopener noreferrer" className="link-arrow">
              Visit GitHub →
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
