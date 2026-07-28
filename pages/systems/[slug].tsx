import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { systemProjects, SystemProject } from "../../data/site-content";
import { SeoHead } from "../../components/SeoHead";

interface SystemPageProps {
  project: SystemProject;
}

export default function SystemPage({ project }: SystemPageProps) {
  return (
    <>
      <SeoHead
        title={`${project.name} — Systems — Jorge Guberte`}
        description={`${project.oneLiner} ${project.description}`}
        path={`/systems/${project.slug}`}
      />

      <article className="shell py-20 md:py-28">
        <nav className="mb-12">
          <Link href="/systems" className="link-quiet">
            ← Systems
          </Link>
        </nav>

        <div className="mb-8 flex items-center gap-6">
          <span className="h-px w-12 bg-brass-500/70" />
          <p className="kicker">
            {project.kind === "flagship" ? "Flagship system" : "Open source"}
          </p>
        </div>
        <h1 className="display text-5xl md:text-7xl">{project.name}</h1>
        <p className="display-italic mt-5 text-2xl md:text-3xl">
          {project.oneLiner}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <p className="status">{project.status}</p>
          <p className="tag">{project.stack.join(" · ")}</p>
          {project.install && (
            <p className="font-mono text-xs text-bone-500">$ {project.install}</p>
          )}
        </div>

        {/* Overview */}
        <section className="mt-16 border-t border-ink-700 pt-12">
          <h2 className="kicker mb-8">Overview</h2>
          <p className="body-text max-w-2xl text-lg leading-9">
            {project.description}
          </p>
        </section>

        {/* Capabilities */}
        <section className="mt-16 border-t border-ink-700 pt-12">
          <h2 className="kicker mb-8">What it does</h2>
          <ul className="max-w-2xl space-y-5">
            {project.capabilities.map((item, i) => (
              <li key={i} className="flex gap-5">
                <span className="num-marker pt-1.5">{i + 1}.</span>
                <span className="body-text">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Connection to the thesis */}
        <section className="mt-16 border-t border-ink-700 pt-12">
          <h2 className="kicker mb-10">Why it exists</h2>
          <p className="pullquote ml-8 max-w-3xl md:ml-12">
            {project.thesisLink}
          </p>
        </section>

        {/* Footer CTA */}
        <section className="mt-16 border-t border-ink-700 pt-12">
          <div className="flex flex-wrap items-center gap-4">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                {link.label} →
              </a>
            ))}
            <Link href="/work-with-me" className="btn-primary">
              Build something like this →
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: systemProjects.map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<SystemPageProps> = async ({ params }) => {
  const project = systemProjects.find((p) => p.slug === params?.slug);
  if (!project) return { notFound: true };
  return { props: { project } };
};
