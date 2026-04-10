import Head from "next/head";

const projects = [
  {
    name: "loom-db",
    description:
      "A strict-schema, bio-inspired graph memory engine for AI agents. Engineered in Rust. WASM-ready. Optimized for the Edge.",
    href: "https://github.com/jorgeguberte/loom-db",
    tags: ["Rust", "Graph Database", "AI Agents"],
  },
  {
    name: "multiverse",
    description:
      "State management library with Git-style branching semantics. Fork, merge, and discard state timelines with O(K) copy-on-write performance.",
    href: "https://github.com/jorgeguberte/multiverse",
    tags: ["TypeScript", "State Management", "React"],
  },
  {
    name: "ayvu-talian-base",
    description:
      "Character-level transformer trained to generate text in Talian (Brazilian Venetian), a minority language spoken in southern Brazil. 5.39M parameters for linguistic preservation.",
    href: "https://github.com/jorgeguberte/ayvu-talian-base",
    tags: ["NLP", "PyTorch", "Transformer"],
  },
];

const socials = [
  { label: "GitHub", href: "https://github.com/jorgeguberte" },
  { label: "Email", href: "mailto:jorgeguberte@gmail.com" },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Jorge Guberte — Developer</title>
        <meta
          name="description"
          content="Developer focused on AI/ML systems, open source tools, and making computers do cool stuff."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="min-h-screen px-6 py-16 max-w-3xl mx-auto">
        {/* Hero */}
        <section className="mb-20">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Jorge Guberte
          </h1>
          <p className="text-lg text-neutral-400 leading-relaxed max-w-xl">
            Developer from São Paulo. Building things with code, AI, and
            occasionally overcomplicating simple problems on purpose.
          </p>
        </section>

        {/* About */}
        <section className="mb-20">
          <h2 className="text-sm font-mono uppercase tracking-widest text-emerald-400 mb-4">
            About
          </h2>
          <p className="text-neutral-300 leading-relaxed">
            Developer from São Paulo with a brain that works better with
            computers than without them. I build AI/ML systems, open source
            tools, and anything that forces me to learn something new. Obsessed
            with performance and finding elegant solutions to problems nobody
            asked to solve.
          </p>
        </section>

        {/* Projects */}
        <section className="mb-20">
          <h2 className="text-sm font-mono uppercase tracking-widest text-emerald-400 mb-6">
            Projects
          </h2>
          <div className="grid gap-4">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-neutral-800 rounded-lg p-5 hover:border-emerald-500/50 hover:bg-neutral-900/50 transition-all group"
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <h3 className="font-mono font-medium text-lg group-hover:text-emerald-400 transition-colors">
                    {project.name}
                  </h3>
                  <span className="text-neutral-600 text-sm">→</span>
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="mb-20">
          <h2 className="text-sm font-mono uppercase tracking-widest text-emerald-400 mb-4">
            Contact
          </h2>
          <div className="flex flex-wrap gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-neutral-400 hover:text-emerald-400 transition-colors border border-neutral-800 rounded px-4 py-2 hover:border-emerald-500/50"
              >
                {social.label}
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-neutral-900">
          <p className="text-xs font-mono text-neutral-600">
            © {new Date().getFullYear()} Jorge Guberte
          </p>
        </footer>
      </main>
    </>
  );
}
