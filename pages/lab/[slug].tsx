import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { labPrograms, LabProgram } from "../../data/site-content";
import { SeoHead } from "../../components/SeoHead";

interface ProgramPageProps {
  program: LabProgram;
}

export default function ProgramPage({ program }: ProgramPageProps) {
  return (
    <>
      <SeoHead
        title={`${program.name} — The Lab — Jorge Guberte`}
        description={`${program.oneLiner} ${program.question}`}
        path={`/lab/${program.slug}`}
      />

      <article className="shell py-20 md:py-28">
        <nav className="mb-12">
          <Link href="/lab" className="link-quiet">
            ← The Lab
          </Link>
        </nav>

        <div className="mb-8 flex items-center gap-6">
          <span className="h-px w-12 bg-brass-500/70" />
          <p className="kicker">Research program</p>
        </div>
        <h1 className="display text-5xl md:text-7xl">{program.name}</h1>
        <p className="display-italic mt-5 text-2xl md:text-3xl">
          {program.oneLiner}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <p className="status">{program.status}</p>
          <p className="tag">{program.themes.join(" · ")}</p>
          <p className="tag">{program.stack}</p>
        </div>

        {/* The question */}
        <section className="mt-16 border-t border-ink-700 pt-12">
          <h2 className="kicker mb-10">The question</h2>
          <p className="pullquote ml-8 max-w-3xl md:ml-12">{program.question}</p>
        </section>

        {/* Overview */}
        <section className="mt-16 border-t border-ink-700 pt-12">
          <h2 className="kicker mb-8">Overview</h2>
          <p className="body-text max-w-2xl">{program.description}</p>
        </section>

        {/* Approach */}
        <section className="mt-16 border-t border-ink-700 pt-12">
          <h2 className="kicker mb-8">Approach</h2>
          <ul className="max-w-2xl space-y-5">
            {program.approach.map((item, i) => (
              <li key={i} className="flex gap-5">
                <span className="num-marker pt-1.5">{i + 1}.</span>
                <span className="body-text">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Open problems */}
        <section className="mt-16 border-t border-ink-700 pt-12">
          <h2 className="kicker mb-8">Open problems</h2>
          <p className="mb-8 max-w-2xl text-sm leading-7 text-bone-500">
            Stated plainly, because pretending they're solved would be the
            opposite of research.
          </p>
          <ul className="max-w-2xl space-y-4">
            {program.openProblems.map((item, i) => (
              <li key={i} className="flex gap-3 body-text text-bone-400">
                <span className="mt-3.5 h-1 w-1 shrink-0 bg-brass-400" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Footer CTA */}
        <section className="mt-16 border-t border-ink-700 pt-12">
          <div className="flex flex-wrap items-center gap-4">
            {program.link && (
              <a
                href={program.link.href}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                {program.link.label} →
              </a>
            )}
            <Link href="/work-with-me" className="btn-primary">
              Collaborate on this →
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: labPrograms.map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<ProgramPageProps> = async ({ params }) => {
  const program = labPrograms.find((p) => p.slug === params?.slug);
  if (!program) return { notFound: true };
  return { props: { program } };
};
