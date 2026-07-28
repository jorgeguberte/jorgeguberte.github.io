import { profile, workWithMe } from "../data/site-content";
import { SeoHead } from "../components/SeoHead";

export default function WorkWithMe() {
  return (
    <>
      <SeoHead
        title="Work with me — Jorge Guberte"
        description="Architecture consulting, research collaboration, advisory, and principal-level roles — for teams where persistence, memory, or long-horizon behavior is core to the product."
        path="/work-with-me"
      />

      <div className="shell py-24 md:py-36">
        <header>
          <p className="kicker mb-8">Selected engagements</p>
          <h1 className="display max-w-5xl text-5xl md:text-7xl">
            I work where <em className="font-light text-brass-300">memory</em> is the hard problem.
          </h1>
          <p className="dek mt-8 max-w-2xl">{workWithMe.intro}</p>
        </header>

        <div className="mt-20 grid gap-5 sm:grid-cols-2">
          {workWithMe.engagements.map((engagement, index) => (
            <article key={engagement.name} className="research-card min-h-[19rem]">
              <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="mt-12 font-serif text-3xl text-bone-100">{engagement.name}</h2>
              <p className="body-text mt-5 text-sm">{engagement.description}</p>
            </article>
          ))}
        </div>

        <section className="mt-28 border-t border-ink-700 pt-20">
          <p className="pullquote ml-8 max-w-3xl md:ml-12">{workWithMe.fit}</p>
          <div className="mt-14 flex flex-wrap items-center gap-6">
            <a href={"mailto:" + profile.email + "?subject=Working together"} className="btn-primary">
              {workWithMe.cta} ↗
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link-quiet">
              Find me on LinkedIn ↗
            </a>
          </div>
          <p className="tag mt-10 border-l border-brass-400 pl-5 leading-6">
            Direct email, no forms: <a href={"mailto:" + profile.email} className="text-brass-300 underline">{profile.email}</a>.
          </p>
        </section>
      </div>
    </>
  );
}
