import Link from "next/link";
import { posts } from "#site/content";
import {
  profile,
  thesis,
  whyMemory,
  labIntro,
  labPrograms,
  systemsIntro,
  systemProjects,
  writingIntro,
  workWithMe,
  isPublicPost,
} from "../data/site-content";
import { SeoHead } from "../components/SeoHead";
import { MemoryField } from "../components/MemoryField";

export default function Home() {
  const latestPosts = [...posts]
    .filter(isPublicPost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const pixie = systemProjects.find((p) => p.slug === "pixie")!;
  const multiverse = systemProjects.find((p) => p.slug === "multiverse")!;

  return (
    <>
      <SeoHead
        title="Jorge Guberte — AI Systems Architect & Independent Researcher"
        description={thesis}
        path="/"
      />

      {/* ============ BRUTALIST DECORATIVE LAYERS (pointer-events:none) ============ */}
      <div className="bt-scanlines" aria-hidden="true" />
      <div className="bt-noise" aria-hidden="true" />
      <div className="bt-page-frame" aria-hidden="true" />

      {/* ============ HERO: front page of a journal ============ */}
      <section className="relative overflow-hidden border-b border-ink-700 bt-divider--hairline">
        <MemoryField />
        <div className="shell relative py-28 md:py-40">
          <div className="mb-10 flex items-center gap-6">
            <span className="h-px w-12 bg-brass-500/70" />
            <p className="kicker">{profile.eyebrow}</p>
          </div>
          <h1 className="display max-w-5xl text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] y2k-chrome bt-drift">
            AI systems should{" "}
            <em className="font-light text-brass-300">retain context</em>, adapt
            over time, and remain useful{" "}
            <em className="font-light text-brass-300">
              beyond a single interaction
            </em>
            .
          </h1>
          <p className="dek mt-12 max-w-2xl">{profile.subhead}</p>
          <div className="mt-14 flex flex-wrap gap-5">
            <Link href="/about" className="btn-primary">
              Read the thesis
            </Link>
            <Link href="/systems" className="btn-ghost">
              See the systems
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 01 — WHY MEMORY ============ */}
      <section className="section bt-divider--hairline">
        <div className="shell">
          <div className="folio mb-14">
            <span className="folio-num">i.</span>
            <p className="kicker">Why memory</p>
          </div>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-7 md:col-start-3">
              <p className="font-serif text-2xl leading-snug text-bone-100 md:text-3xl md:leading-[1.35]">
                {whyMemory.paragraphs[0]}
              </p>
              <div className="mt-10 space-y-6 border-l border-ink-700 pl-8 y2k-acid-border bt-barcode">
                {whyMemory.paragraphs.slice(1).map((p, i) => (
                  <p key={i} className="body-text text-bone-400">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 02 — THE LAB ============ */}
      <section className="section section-rule bt-divider">
        <div className="shell">
          <div className="folio mb-6">
            <span className="folio-num">ii.</span>
            <p className="kicker">The Lab</p>
          </div>
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="dek max-w-2xl">{labIntro}</p>
            <Link href="/lab" className="link-quiet shrink-0">
              Enter the lab →
            </Link>
          </div>

          <div className="bt-grid md:grid-cols-3">
            {labPrograms.map((program, idx) => (
              <Link
                key={program.slug}
                href={`/lab/${program.slug}`}
                className="bt-card group flex flex-col gap-5 p-9 bt-crosshair"
              >
                <span className="bt-rev-tag">UNIT / {String(idx + 1).padStart(2, "0")}</span>
                <h3 className="font-serif text-3xl text-bone-100 transition-colors group-hover:text-brass-300">
                  {program.name}
                </h3>
                <p className="font-serif text-base italic leading-7 text-bone-400">
                  {program.oneLiner}
                </p>
                <p className="text-sm leading-7 text-bone-500">
                  {program.description.split(". ").slice(0, 2).join(". ")}.
                </p>
                <div className="mt-auto space-y-3 pt-6 bt-divider--hairline">
                  <p className="status">{program.status}</p>
                  <p className="tag">{program.themes.join(" · ")}</p>
                  <data className="bt-coord" value={program.slug}>
                    COORD: {program.slug.toUpperCase()}
                  </data>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 03 — THE SYSTEMS ============ */}
      <section className="section section-rule bt-divider">
        <div className="shell">
          <div className="folio mb-6">
            <span className="folio-num">iii.</span>
            <p className="kicker">The Systems</p>
          </div>
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="dek max-w-2xl">{systemsIntro}</p>
            <Link href="/systems" className="link-quiet shrink-0">
              All systems →
            </Link>
          </div>

          {/* Flagship — Pixie, full editorial feature */}
          <Link
            href="/systems/pixie"
            className="bt-card plane-hover group block p-10 md:p-14 bt-barcode"
          >
            <div className="grid gap-10 md:grid-cols-12">
              <div className="md:col-span-8">
                <p className="kicker mb-6 bt-frame--dir">Flagship · Case study</p>
                <h3 className="display text-4xl transition-colors group-hover:text-brass-300 md:text-5xl">
                  {pixie.name}
                </h3>
                <p className="display-italic mt-3 text-2xl md:text-3xl">
                  {pixie.oneLiner}
                </p>
                <p className="body-text mt-8 max-w-2xl text-bone-400">
                  {pixie.description}
                </p>
              </div>
              <div className="flex flex-col justify-between gap-8 md:col-span-4 md:border-l md:border-ink-700 md:pl-10">
                <ul className="space-y-5">
                  {pixie.capabilities.slice(0, 3).map((c, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="num-marker pt-1">{i + 1}.</span>
                      <span className="text-sm leading-7 text-bone-300">
                        {c.split(" — ")[0].split(":")[0]}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-3 bt-divider--hairline">
                  <p className="tag">{pixie.stack.join(" · ")}</p>
                  <p className="link-quiet">Read the case study →</p>
                  <samp className="bt-unit-id">REV 2.6</samp>
                </div>
              </div>
            </div>
          </Link>

          {/* Secondary — Multiverse */}
          <Link
            href="/systems/multiverse"
            className="bt-card plane-hover group mt-px block p-10"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="kicker mb-4 bt-frame--angle">Open source</p>
                <h3 className="font-serif text-3xl text-bone-100 transition-colors group-hover:text-brass-300">
                  {multiverse.name}
                  <span className="display-italic ml-3 text-xl">
                    {multiverse.oneLiner}
                  </span>
                </h3>
                <p className="mt-4 text-sm leading-7 text-bone-500">
                  {multiverse.description}
                </p>
              </div>
              <div className="shrink-0 space-y-3 md:text-right bt-divider--hairline">
                <p className="tag">{multiverse.status}</p>
                <p className="font-mono text-xs text-bone-500">
                  $ {multiverse.install}
                </p>
                <kbd className="bt-coord">BRANCH / MAIN</kbd>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ============ 04 — WRITING ============ */}
      <section className="section section-rule bt-divider">
        <div className="shell">
          <div className="folio mb-6">
            <span className="folio-num">iv.</span>
            <p className="kicker">Writing</p>
          </div>
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="dek max-w-2xl">{writingIntro}</p>
            <span className="flex shrink-0 gap-6">
              <Link href="/writing" className="link-quiet">
                All writing →
              </Link>
              <a href="/feed.xml" className="link-quiet">
                RSS
              </a>
            </span>
          </div>

          {latestPosts.length > 0 ? (
            <ul className="divide-y divide-ink-700 border-y border-ink-700 bt-grid">
              {latestPosts.map((post) => (
                <li key={post.slug} className="bt-card">
                  <Link
                    href={`/writing/${post.slug}`}
                    className="group grid gap-2 py-8 sm:grid-cols-12 sm:items-baseline"
                  >
                    <time className="tag sm:col-span-2 bt-coord">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })}
                    </time>
                    <span className="sm:col-span-10">
                      <span className="font-serif text-2xl text-bone-100 transition-colors group-hover:text-brass-300">
                        {post.title}
                      </span>
                      <span className="mt-2 block max-w-2xl text-sm leading-7 text-bone-500">
                        {post.description}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="tag border-y border-ink-700 py-10 bt-frame">
              First essays arriving soon. Subscribe via RSS.
            </p>
          )}
        </div>
      </section>

      {/* ============ 05 — WORK WITH ME ============ */}
      <section className="section section-rule bt-divider">
        <div className="shell">
          <div className="folio mb-14">
            <span className="folio-num">v.</span>
            <p className="kicker">Work with me</p>
          </div>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-8 md:col-start-3">
              <h2 className="display text-3xl leading-snug md:text-4xl">
                {workWithMe.title}
              </h2>
              <p className="body-text mt-8 max-w-2xl text-bone-400">
                {workWithMe.intro}
              </p>
              <div className="mt-12">
                <Link href="/work-with-me" className="btn-primary">
                  Start the conversation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TERMINAL GREEN STATUS — SINGLE USE (Pixie = live system) ============ */}
      <div className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8" aria-hidden="true">
        <span className="bt-status-term">
          PIXIE ONLINE
        </span>
      </div>
    </>
  );
}