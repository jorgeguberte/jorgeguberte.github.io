import Link from "next/link";
import { labIntro, labPrograms } from "../../data/site-content";
import { SeoHead } from "../../components/SeoHead";

export default function LabIndex() {
  return (
    <>
      <SeoHead
        title="The Lab — Jorge Guberte"
        description="Ongoing research programs in agent memory, cognitive architectures, and low-resource language modeling. Each one a different cut at the same question: what does it take for an AI system to genuinely persist?"
        path="/lab"
      />

      <div className="shell py-24 md:py-32">
        <div className="mb-10 flex items-center gap-6">
          <span className="h-px w-12 bg-brass-500/70" />
          <p className="kicker">The Lab</p>
        </div>
        <h1 className="display max-w-4xl text-5xl md:text-6xl">
          Research <em className="font-light text-brass-300">programs</em>, not
          side projects.
        </h1>
        <p className="dek mt-8 max-w-2xl">{labIntro}</p>
        <p className="body-text mt-6 max-w-2xl text-bone-400">
          A lab program is a long-lived investigation: a central question, an
          evolving approach, and open problems stated plainly. Some of this
          work is proprietary; the thinking behind it is not.
        </p>

        <div className="mt-16 space-y-px">
          {labPrograms.map((program, idx) => (
            <Link
              key={program.slug}
              href={`/lab/${program.slug}`}
              className="plane plane-hover group block p-8 md:p-10"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="max-w-2xl">
                  <p className="kicker mb-4">
                    Program {String(idx + 1).padStart(2, "0")}
                  </p>
                  <h2 className="display text-4xl transition-colors group-hover:text-brass-300">
                    {program.name}
                  </h2>
                  <p className="display-italic mt-2 text-xl">
                    {program.oneLiner}
                  </p>
                  <p className="body-text mt-4 text-sm leading-7 text-bone-400">
                    {program.description}
                  </p>
                </div>
                <div className="shrink-0 space-y-3 md:pt-12 md:text-right">
                  <p className="status">{program.status}</p>
                  <p className="tag">{program.themes.join(" · ")}</p>
                  <p className="link-quiet">Read the program →</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20 border-t border-ink-700 pt-12">
          <p className="kicker mb-8">Experiments</p>
          <Link
            href="/labs/psx-vibes.html"
            target="_blank"
            rel="noreferrer"
            className="plane plane-hover group block p-6"
          >
            <span className="display text-2xl transition-colors group-hover:text-brass-300">
              PSX Vibes
            </span>
            <span className="display-italic ml-3 text-lg">
              PlayStation 1 Graphics Demo
            </span>
            <p className="tag mt-3">Three.js · PSX shaders · Low-poly · Dithering · Vertex snapping</p>
          </Link>
        </div>

        <div className="mt-20 border-t border-ink-700 pt-12">
          <p className="body-text max-w-2xl text-bone-400">
            Interested in collaborating on any of these questions — or funding
            the answers?{" "}
            <Link href="/work-with-me" className="link-serif">
              Let's talk.
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
