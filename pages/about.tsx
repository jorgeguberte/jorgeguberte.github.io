import Link from "next/link";
import { aboutPage, profile } from "../data/site-content";
import { SeoHead } from "../components/SeoHead";

export default function About() {
  return (
    <>
      <SeoHead
        title="About — Jorge Guberte"
        description="Software engineer and systems builder in São Paulo. One thesis, pursued for years: AI systems should retain context, adapt over time, and remain useful beyond a single interaction."
        path="/about"
      />

      <article className="shell py-24 md:py-36">
        <header>
          <p className="kicker mb-8">About · The architect</p>
          <h1 className="display max-w-5xl text-5xl md:text-7xl lg:text-8xl">
            The work is <em className="font-light text-brass-300">one idea</em>, taken seriously.
          </h1>
        </header>

        <div className="mt-20 grid gap-10 border-t border-ink-700 pt-14 md:grid-cols-12">
          <p className="kicker md:col-span-2">Origin</p>
          <div className="max-w-3xl space-y-8 md:col-span-8 md:col-start-4">
            {aboutPage.lede.map((paragraph, index) => (
              <p
                key={paragraph}
                className={index === 0 ? "font-serif text-2xl leading-snug text-bone-100 md:text-3xl" : "body-text text-lg"}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <section className="mt-28 grid gap-10 border-t border-ink-700 pt-14 md:grid-cols-12">
          <h2 className="kicker md:col-span-2">{aboutPage.throughLine.heading}</h2>
          <div className="max-w-3xl space-y-7 md:col-span-8 md:col-start-4">
            {aboutPage.throughLine.paragraphs.map((paragraph) => (
              <p key={paragraph} className="body-text text-lg">{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="mt-28 grid gap-10 border-t border-ink-700 pt-14 md:grid-cols-12">
          <h2 className="kicker md:col-span-2">{aboutPage.practice.heading}</h2>
          <div className="max-w-3xl space-y-7 md:col-span-8 md:col-start-4">
            {aboutPage.practice.paragraphs.map((paragraph) => (
              <p key={paragraph} className="body-text text-lg">{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="mt-28 border-t border-ink-700 pt-14">
          <h2 className="kicker mb-10">{aboutPage.domains.heading}</h2>
          <ul className="grid overflow-hidden border border-ink-700 sm:grid-cols-2 lg:grid-cols-3">
            {aboutPage.domains.items.map((item, index) => (
              <li key={item} className="flex min-h-36 gap-5 border-b border-r border-ink-700 bg-ink-900 p-6 text-bone-300">
                <span className="card-index pt-1">{String(index + 1).padStart(2, "0")}</span>
                <span className="leading-7">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-28 border-t border-ink-700 pt-20">
          <p className="pullquote ml-8 max-w-3xl md:ml-12">{aboutPage.closing}</p>
          <div className="mt-14 flex flex-wrap gap-4">
            <Link href="/work-with-me" className="btn-primary">Work with me ↗</Link>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost">GitHub ↗</a>
          </div>
        </section>
      </article>
    </>
  );
}
