import Link from "next/link";
import { aboutPage, thesis } from "../data/site-content";
import { SeoHead } from "../components/SeoHead";

export default function About() {
  return (
    <>
      <SeoHead
        title="About — Jorge Guberte"
        description="AI systems architect and independent researcher in São Paulo. One thesis, pursued for years: AI systems should retain context, adapt over time, and remain useful beyond a single interaction."
        path="/about"
      />

      <article className="shell py-24 md:py-32">
        <div className="mb-10 flex items-center gap-6">
          <span className="h-px w-12 bg-brass-500/70" />
          <p className="kicker">About · The Architect</p>
        </div>
        <h1 className="display max-w-4xl text-5xl md:text-6xl">
          The work is <em className="font-light text-brass-300">one idea</em>,
          taken seriously.
        </h1>

        <div className="mt-14 grid gap-12 md:grid-cols-12">
          <div className="max-w-2xl space-y-7 md:col-span-8 md:col-start-3">
            {aboutPage.lede.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "font-serif text-2xl leading-snug text-bone-100 md:text-3xl md:leading-[1.35]"
                    : "body-text text-bone-400"
                }
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        <section className="mt-20 border-t border-ink-700 pt-14">
          <h2 className="kicker mb-8">{aboutPage.throughLine.heading}</h2>
          <div className="max-w-2xl space-y-6">
            {aboutPage.throughLine.paragraphs.map((p, i) => (
              <p key={i} className="body-text">
                {p}
              </p>
            ))}
          </div>
        </section>

        <section className="mt-20 border-t border-ink-700 pt-14">
          <h2 className="kicker mb-8">{aboutPage.practice.heading}</h2>
          <div className="max-w-2xl space-y-6">
            {aboutPage.practice.paragraphs.map((p, i) => (
              <p key={i} className="body-text">
                {p}
              </p>
            ))}
          </div>
        </section>

        <section className="mt-20 border-t border-ink-700 pt-14">
          <h2 className="kicker mb-8">{aboutPage.domains.heading}</h2>
          <ul className="grid max-w-3xl gap-x-12 gap-y-4 sm:grid-cols-2">
            {aboutPage.domains.items.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-7 text-bone-200">
                <span className="mt-3 h-1 w-1 shrink-0 bg-brass-400" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20 border-t border-ink-700 pt-14">
          <p className="pullquote ml-8 max-w-2xl md:ml-12">{aboutPage.closing}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/work-with-me" className="btn-primary">
              Work with me →
            </Link>
            <Link href="/lab" className="btn-ghost">
              Enter the lab →
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
