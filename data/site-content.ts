export const profile = {
  name: "Jorge Guberte",
  title: "AI Engineer · Agent Systems Architect · São Paulo, Brazil",
  hero:
    "I build AI systems that remember better, retrieve smarter, and stay useful over time.",
  intro:
    "From agent memory architectures to low-resource language models, I'm interested in systems that carry context, adapt, and do real work outside the demo.",
  aboutSnippet:
    "I'm a software engineer focused on AI systems, agent architectures, and interfaces for working with context over time. I'm especially interested in memory models, retrieval, orchestration, and the weird edge where software starts behaving more like a cognitive system than a static tool.",
};

export const navLinks = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Labs", href: "/labs/" },
  { label: "GitHub", href: "https://github.com/jorgeguberte", external: true },
  { label: "Email", href: "mailto:jorgeguberte@gmail.com", external: true },
];

export const nowItems = [
  "Designing and refining the Y2K Sensory Design System for neurodivergent accessibility.",
  "Exploring long-term memory, context engineering, and MCP workflows.",
  "Running and testing LLM inference systems on Modal.",
  "Designing AI products and agent workflows at Hub Esfera.",
];

export const selectedWork = [
  {
    name: "Y2K Sensory Design System",
    href: "/labs/y2k-sensory/",
    primary:
      "A brutalist-inspired design framework unifying maximalist Y2K aesthetics with strict neurodivergent accessibility (AttentionGuard).",
    secondary:
      "Built with a dual-layer CSS architecture to isolate decorative animations from functional UI, offering tailored cognitive presets for TDAH and Autism.",
    tags: ["HTML/CSS", "Three.js", "Accessibility", "Design"],
    links: [
      { label: "Open Lab", href: "/labs/y2k-sensory/" }
    ],
  },
  {
    name: "Multiverse",
    href: "https://github.com/jorgeguberte/multiverse",
    primary:
      "A state management library with Git-style branching semantics.",
    secondary:
      "Useful for applications that need forkable state, experimentation, and timeline-safe UX patterns.",
    tags: ["TypeScript", "State", "React"],
    links: [{ label: "GitHub", href: "https://github.com/jorgeguberte/multiverse" }],
  },
  {
    name: "Ayvu-Talian",
    href: "https://github.com/jorgeguberte/ayvu-talian-base",
    primary:
      "A decoder-only transformer trained for Talian, a minority language spoken in southern Brazil.",
    secondary:
      "An exploration of low-resource NLP, language preservation, and model-building from scratch.",
    tags: ["NLP", "PyTorch", "Low-resource LMs"],
    links: [{ label: "GitHub", href: "https://github.com/jorgeguberte/ayvu-talian-base" }],
  },
];

export const writingIntro =
  "Notes on memory, context, infrastructure, and the realities of building AI systems outside toy demos.";

export const aboutPage = {
  intro:
    "Jorge Augusto Guberte is an AI engineer and systems builder based in São Paulo, focused on agent memory, orchestration, generative interfaces, and applied LLM systems.",
  careAbout: [
    "Memory architectures for long-running AI agents",
    "Context engineering, retrieval, and orchestration",
    "Open-source infrastructure for agentic systems",
    "Low-resource language models and language preservation",
    "Elegant systems with strange constraints",
  ],
  work: [
    {
      title: "Hub Esfera",
      role: "Co-Founder & Principal AI Engineer",
      description:
        "Designing AI products and agent workflows for complex public-sector data, with a strong focus on orchestration, memory, and API-driven systems.",
    },
    {
      title: "Independent AI systems work",
      role: "Builder / Consultant",
      description:
        "Prototyping agent architectures, retrieval pipelines, and experimental AI interfaces that turn abstract ideas into systems people can actually use.",
    },
    {
      title: "Earlier software engineering work",
      role: "Full-stack / Backend",
      description:
        "A long foundation in web platforms, APIs, and product engineering that now feeds directly into how I design AI systems.",
    },
  ],
  stackGroups: [
    {
      title: "Languages",
      items: ["Python", "TypeScript", "JavaScript", "Rust"],
    },
    {
      title: "AI Systems",
      items: ["MCP", "LangGraph", "CrewAI", "Mastra", "RAG", "Evaluation Pipelines"],
    },
    {
      title: "Infra",
      items: ["Modal", "Docker", "GCP", "GitHub Actions", "vLLM"],
    },
    {
      title: "Data",
      items: ["PostgreSQL", "Qdrant", "Memgraph", "Redis", "DuckDB"],
    },
  ],
  closing:
    "I like systems that feel alive: things that remember, decay, branch, adapt, and become more useful with time.",
};

export const isPublicPost = (post: { tags?: string[]; slug: string }) =>
  !(post.tags ?? []).includes("meta") && post.slug !== "hello-world" && post.slug !== "testing-blog";
