import Head from "next/head";

const projects = [
  {
    name: "loom-db",
    description:
      "Database reativo e performático focado em AI agents. Suporte a triggers, streams e padrões de memória persistente.",
    href: "https://github.com/jorgeguberte/loom-db",
    tags: ["Rust", "Database", "AI Agents"],
  },
  {
    name: "multiverse",
    description:
      "Ferramenta de orquestração para múltiplos ambientes de desenvolvimento e deploy.",
    href: "https://github.com/jorgeguberte/multiverse",
    tags: ["DevOps", "Infrastructure"],
  },
  {
    name: "ayvu-talian-base",
    description:
      "Custom language model for the Talian dialect. 5.39M parameter architecture trained from scratch to explore NLP in low-resource linguistic contexts.",
    href: "https://github.com/jorgeguberte/ayvu-talian-base",
    tags: ["NLP", "PyTorch", "Language Model"],
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
            42 anos, desenvolvedor, e dono de um cérebro que funciona melhor com
            computadores do que sem eles. Trabalho com sistemas de AI/ML,
            ferramentas open source, e qualquer coisa que me faça aprender algo
            novo. Fanático por performance e por encontrar a solução elegante
            para problemas que ninguém pediu pra resolver.
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
