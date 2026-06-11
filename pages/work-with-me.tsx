import { workWithMe, profile } from "../data/site-content";
import { SeoHead } from "../components/SeoHead";

export default function WorkWithMe() {
  return (
    <>
      <SeoHead
        title="Work with me — Jorge Guberte"
        description="Architecture consulting, research collaboration, advisory, and principal-level roles — for teams where persistence, memory, or long-horizon behavior is core to the product."
        path="/work-with-me"
      />

      <div className="shell py-24 md:py-32">
        <div className="mb-10 flex items-center gap-6">
          <span className="h-px w-12 bg-brass-500/70" />
          <p className="kicker">Work with me</p>
        </div>
        <h1 className="display max-w-4xl text-4xl leading-tight md:text-5xl">
          I take on a small number of engagements where{" "}
          <em className="font-light text-brass-300">the memory problem</em> is
          the hard problem.
        </h1>
        <p className="dek mt-8 max-w-2xl">{workWithMe.intro}</p>

        <div className="mt-16 grid gap-px bg-ink-700 sm:grid-cols-2">
          {workWithMe.engagements.map((engagement, i) => (
            <div key={engagement.name} className="bg-ink-950 p-9">
              <span className="font-serif text-lg italic text-ink-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-4 font-serif text-2xl text-bone-100">
                {engagement.name}
              </h2>
              <p className="mt-4 text-sm leading-7 text-bone-400">
                {engagement.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-ink-700 pt-12">
          <p className="pullquote ml-8 max-w-2xl md:ml-12">{workWithMe.fit}</p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href={`mailto:${profile.email}?subject=Working%20together`}
              className="btn-primary"
            >
              {workWithMe.cta} →
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="link-quiet"
            >
              or find me on LinkedIn
            </a>
          </div>
          <p className="tag mt-8">
            Direct email, no forms: {profile.email}. I reply to everything that
            isn't spam.
          </p>
        </div>
      </div>
    </>
  );
}
