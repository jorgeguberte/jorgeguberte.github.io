import Link from "next/link";
import { systemsIntro, systemProjects } from "../../data/site-content";
import { SeoHead } from "../../components/SeoHead";

export default function SystemsIndex() {
  return (
    <>
      <SeoHead
        title="Systems — Jorge Guberte"
        description="Built, shipped, running. The systems where the thesis runs in production: Pixie, an embodied AI learning companion, and Multiverse, branching state management."
        path="/systems"
      />

      <div className="shell py-24 md:py-32">
        <div className="mb-10 flex items-center gap-6">
          <span className="h-px w-12 bg-brass-500/70" />
          <p className="kicker">Systems</p>
        </div>
        <h1 className="display max-w-4xl text-5xl md:text-6xl">
          Built, shipped, <em className="font-light text-brass-300">running</em>.
        </h1>
        <p className="dek mt-8 max-w-2xl">{systemsIntro}</p>

        <div className="mt-16 space-y-px">
          {systemProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/systems/${project.slug}`}
              className="plane plane-hover group block p-8 md:p-10"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="max-w-2xl">
                  <p className="kicker mb-4">
                    {project.kind === "flagship" ? "Flagship" : "Open source"}
                  </p>
                  <h2 className="display text-4xl transition-colors group-hover:text-brass-300">
                    {project.name}
                  </h2>
                  <p className="display-italic mt-2 text-xl">
                    {project.oneLiner}
                  </p>
                  <p className="body-text mt-4 text-sm leading-7 text-bone-400">
                    {project.description}
                  </p>
                </div>
                <div className="shrink-0 space-y-3 md:pt-12 md:text-right">
                  <p className="status">{project.status}</p>
                  <p className="tag">{project.stack.join(" · ")}</p>
                  <p className="link-quiet">Case study →</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20 border-t border-ink-700 pt-12">
          <p className="body-text max-w-2xl text-bone-400">
            The research behind these systems lives in{" "}
            <Link href="/lab" className="link-serif">
              the lab.
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
