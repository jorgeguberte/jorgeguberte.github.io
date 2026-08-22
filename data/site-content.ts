/**
 * Site content model — Jorge Guberte
 * Positioning: Principal AI Systems Architect who ships.
 * The memory thesis is the differentiator; production proof is the foundation.
 */

export const thesis =
  "AI systems should retain context, adapt over time, and remain useful beyond a single interaction.";

export const profile = {
  name: "Jorge Guberte",
  title: "Principal AI Systems Architect",
  eyebrow: "Principal AI Systems Architect \u00b7 S\u00e3o Paulo, Brazil \u00b7 Remote-friendly",
  subhead:
    "Twelve years building scalable platforms \u2014 now focused on applied AI systems architecture: agent orchestration, cognitive memory, RAG pipelines, and generative UI. I take foundation models out of the chat box and into persistent, autonomous products that run in production.",
  email: "hey@jorgeguberte.com",
  github: "https://github.com/jorgeguberte",
  linkedin: "https://www.linkedin.com/in/jorgeguberte",
  orcid: "https://orcid.org/0009-0001-1198-1065",
};

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Lab", href: "/lab" },
  { label: "Systems", href: "/systems" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
];

/** Recruiter-facing proof strip — every number is verifiable. */
export const proofStats = [
  { value: "12+", label: "Years shipping software", note: "Platforms, distributed systems, data pipelines" },
  { value: "Production", label: "B2G AI platform live", note: "Strata serves city profiles incl. Porto Alegre/RS" },
  { value: "2.8M ops/s", label: "State-fork allocation", note: "multiverse-js benchmarked at 430ns per fork" },
  { value: "5.39M", label: "Param LLM from scratch", note: "Ayvu-Talian: tokenizer, training, inference" },
];

export type WorkItem = {
  slug: string;
  name: string;
  kind: string;
  oneLiner: string;
  description: string;
  highlights: string[];
  stack: string[];
  status: string;
  href: string;
  external?: boolean;
};

export const featuredWork: WorkItem[] = [
  {
    slug: "strata",
    name: "Strata",
    kind: "Hub Esfera \u00b7 Production B2G",
    oneLiner: "A municipal intelligence platform with an embedded AI copilot.",
    description:
      "Multi-source public-data ingestion (BigQuery, PNCP, FNDE, INEP) materialized into an embedded DuckDB analytical layer for ultra-low-latency agent queries. Deterministic LangGraph agent with skill-based reasoning, sandboxed read-only tools, and full LangSmith observability \u2014 serving real municipalities with agent-driven decision support.",
    highlights: [
      "Live in production serving city profiles including Porto Alegre/RS",
      "Data flywheel: bureaucratic PDFs, gazettes, and spreadsheets into Parquet + agent-optimized Markdown",
      "Enterprise multi-tenancy: Cloud SQL, environment-scoped config, Clerk RBAC",
    ],
    stack: ["LangGraph", "DuckDB", "Cloud Run", "BigQuery", "PostgreSQL"],
    status: "In production",
    href: "/systems/strata",
  },
  {
    slug: "multiverse",
    name: "Multiverse",
    kind: "Open source \u00b7 Benchmarked",
    oneLiner: "Git-style branching semantics for synchronous UI state.",
    description:
      "A high-performance state management library addressing the Single-Timeline State Paradox: fork application state, explore alternate timelines, merge what works. Proxy lazy-evaluation plus a CRDT-lite patch engine make hundreds of concurrent isolated branches near-free.",
    highlights: [
      "Fork allocation at 2.8M ops/s (430ns) \u2014 118,000x mutation cost ratio",
      "LWW merge optimized to 44.9K ops/s (26\u00b5s) \u2014 inside a 60fps frame window",
      "npm-installable, typed, dependency-light TypeScript core",
    ],
    stack: ["TypeScript", "Proxy lazy-eval", "CRDT-lite patches"],
    status: "Open source \u00b7 MIT",
    href: "https://github.com/jorgeguberte/multiverse",
    external: true,
  },
  {
    slug: "pixie",
    name: "Pixie",
    kind: "Embodied AI \u00b7 Real-time voice",
    oneLiner: "An embodied 3D companion with bidirectional live voice.",
    description:
      "Real-time bidirectional voice streaming over Gemini Live API WebSockets (16kHz/24kHz PCM), physics-based locomotion with Rapier, synchronous spatial tool execution, and 3D lip-sync driven by live audio amplitude. Observer mode builds pointer heatmaps for context-aware spatial commentary.",
    highlights: [
      "Sub-latency WebSocket voice loop with real tool execution in 3D space",
      "Audio-amplitude-driven lip-sync, no precomputed visemes",
      "Neurodivergent-first interaction constraints from day one",
    ],
    stack: ["React", "Three.js", "Rapier", "Gemini Live API"],
    status: "Active R&D",
    href: "/systems/pixie",
  },
  {
    slug: "ayvu-talian",
    name: "Ayvu-Talian",
    kind: "Low-resource NLP \u00b7 Open",
    oneLiner: "A language model trained from scratch for Talian.",
    description:
      "A 5.39M-parameter decoder-only transformer trained for Talian, a Venetian-derived language spoken in southern Brazil. Full pipeline owned end-to-end: corpus curation, custom tokenizer, training, and inference \u2014 language modeling where the failure mode is cultural loss, not a lost benchmark point.",
    highlights: [
      "Every layer understood \u2014 no pretrained shortcuts hiding the constraints",
      "Tokenization for unstable orthography and heavy Portuguese code-switching",
      "Corpus construction as fieldwork on a living minority language",
    ],
    stack: ["PyTorch", "From-scratch transformer"],
    status: "Open source",
    href: "https://github.com/jorgeguberte/ayvu-talian-base",
    external: true,
  },
];

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Co-Founder & Principal AI Architect",
    org: "Hub Esfera",
    period: "Sep 2024 \u2014 Present",
    location: "S\u00e3o Paulo, Brazil \u00b7 Hybrid",
    summary:
      "Architected Strata, a municipal intelligence platform for the public sector (B2G) with an embedded AI copilot \u2014 deployed on Cloud Run, serving production city profiles with live data pipelines and agent-driven decision support.",
    bullets: [
      "Designed multi-source public-data ingestion (BigQuery, PNCP, FNDE, INEP) into an embedded analytical DuckDB layer for ultra-low-latency agent queries.",
      "Built a deterministic LangGraph agent with skill-based reasoning, sandboxed read-only analytical tools, and full LangSmith observability across education, procurement, and budget domains.",
      "Engineered data-flywheel pipelines converting unstructured bureaucratic datasets (high-volume PDFs, official gazettes, Fundeb spreadsheets) into structured Parquet snapshots and agent-optimized Markdown.",
      "Deployed scalable multi-municipality tenancy via environment-scoped configuration, Cloud SQL persistence, and Clerk-authenticated RBAC.",
      "Prototyped generative-UI layers reducing cognitive load in high-density government dashboards.",
    ],
  },
  {
    role: "Lead Applied AI Architect",
    org: "Independent AI Systems Research",
    period: "Jan 2023 \u2014 Present",
    location: "Remote",
    summary:
      "Ongoing applied R&D across agent memory, state management, generative UI, and multimodal AI \u2014 from experimental architectures to production-ready open-source libraries.",
    bullets: [
      "LoomDB: graph-based temporal memory substrate (Rust/WASM) implementing biological decay models to reduce context bloat while preserving retrieval precision.",
      "multiverse-js: Git-style branching state library \u2014 fork allocation at 2.8M ops/s, LWW merge optimized from O(N) scan to 44.9K ops/s.",
      "CBR Audiotech / Prosodia: full async audio-intelligence pipeline (Next.js, BullMQ, Modal GPU, Cloudflare R2) with a prosodic adaptation engine for cross-cultural music generation; validated across two active music labels.",
      "AYVU-Talian: decoder-only transformer from scratch on Talian \u2014 data curation, custom tokenizer, training, inference.",
      "Pixie: embodied 3D web companion with Gemini Live API voice streaming, spatial tool execution, and amplitude-driven lip-sync.",
    ],
  },
  {
    role: "Senior Developer Analyst (Contract)",
    org: "Bosch Digital",
    period: "2023 \u00b7 5 months",
    location: "Campinas, Brazil \u00b7 Remote",
    summary:
      "Enterprise data integration and infrastructure modernization across complex SAP ecosystems, backend services, and distributed systems.",
    bullets: [
      "Architected impact-analysis protocols for critical data pipelines, presenting technical strategy directly to German headquarters.",
    ],
  },
  {
    role: "Software Engineering Foundation",
    org: "SeePix \u00b7 Martin Luz \u00b7 EgypTeam \u00b7 Interactus",
    period: "2006 \u2014 2015",
    location: "Brazil",
    summary:
      "Nine years of production engineering before AI: distributed delivery platforms, high-traffic campaign sites, cloud-native Python, and interactive media for global brands.",
    bullets: [
      "SeePix (2014\u201315): highly distributed digital-signage delivery with edge isolation and robust content sync (PHP/Symfony).",
      "Martin Luz (2012\u201313): Tech Lead on high-traffic seasonal campaigns for Walmart and Sony; drove internal Agile and CI/CD adoption.",
      "EgypTeam (2008\u201311): cloud-native Python on Google App Engine; foundational data pipelines for early RL environments (Unity3D).",
      "Interactus (2006\u201307): interactive multimedia for major brands, including Nike's Joga3/JogaBonito global campaign.",
    ],
  },
];

export const skillGroups = [
  { label: "Languages", items: ["Python", "TypeScript", "JavaScript", "Rust (systems integration)"] },
  {
    label: "AI systems",
    items: [
      "Agentic workflows & orchestration",
      "Advanced RAG \u00b7 Context engineering",
      "Semantic & working memory",
      "Model Context Protocol (MCP)",
      "Agent observability & evaluation",
    ],
  },
  {
    label: "Frameworks",
    items: ["Mastra", "FastAPI", "Node.js", "Next.js", "React", "LangChain/LangGraph", "CrewAI", "AI SDK", "BullMQ"],
  },
  {
    label: "Data & storage",
    items: ["PostgreSQL", "Redis", "Qdrant", "Memgraph (Cypher)", "DuckDB", "Cloudflare R2"],
  },
  {
    label: "Cloud & infra",
    items: ["GCP Vertex AI", "AWS Bedrock", "Azure OpenAI", "Modal serverless GPU", "Docker", "GitHub Actions"],
  },
];

export const education = [
  { org: "University of S\u00e3o Paulo (USP)", credential: "Extension: Complex Networks with Python and AI/LLM", year: "2026" },
  { org: "UC San Diego (Coursera)", credential: "Data Structures & Algorithms Specialization", year: "2023" },
  { org: "Col\u00e9gio Marcel Proust", credential: "Technical Degree in Data Processing", year: "2002" },
];

/* ------------------------------------------------------------------ */
/* Research lab — depth behind the positioning                         */
/* ------------------------------------------------------------------ */

export type LabProgram = {
  slug: string;
  name: string;
  oneLiner: string;
  description: string;
  status: string;
  themes: string[];
  question: string;
  approach: string[];
  openProblems: string[];
  stack: string;
  link?: { label: string; href: string };
};

export const labIntro =
  "Ongoing research programs. Each is a different cut at the same question: what does it take for an AI system to genuinely persist?";

export const labPrograms: LabProgram[] = [
  {
    slug: "loomdb",
    name: "LoomDB",
    oneLiner: "A graph-based temporal memory architecture.",
    description:
      "Context as a living graph: activation spreads, attention decays, relevance is a function of time. Memory that behaves less like a database and more like a mind \u2014 recency, frequency, and association shaping what surfaces and what fades.",
    status: "Active research",
    themes: ["agent memory", "retrieval", "temporal graphs"],
    question:
      "Can memory retrieval be modeled as spreading activation over a temporal graph \u2014 where forgetting is a feature, not a failure?",
    approach: [
      "Activation decay: memories lose energy over time unless reinforced, mirroring human salience.",
      "Active context graph: the working set is a live subgraph, continuously re-weighted as the conversation moves.",
      "Rust core compiled to WASM \u2014 the same memory engine runs server-side, in the browser, and embedded in desktop agents.",
    ],
    openProblems: [
      "Consolidation: when should episodic traces merge into semantic structure?",
      "Decay calibration across radically different interaction frequencies.",
      "Benchmarking long-horizon recall without long-horizon datasets.",
    ],
    stack: "Rust \u00b7 WASM",
  },
  {
    slug: "epcg",
    name: "EPCG",
    oneLiner: "An emergent personality framework for AI agents.",
    description:
      "Personality as structure, not system prompt. EPCG composes agent identity from three interacting layers \u2014 Behavior, Belief, and Biography \u2014 drawing on category theory to make the composition lawful, inspectable, and stable over time.",
    status: "Early research",
    themes: ["cognitive architectures", "agent identity", "category theory"],
    question:
      "What is the minimal formal structure from which a coherent, persistent agent personality can emerge \u2014 and survive thousands of interactions without drifting?",
    approach: [
      "The BBB model: Behavior (what the agent does), Belief (what it holds true), Biography (what it has lived). Each layer constrains the others.",
      "Category-theoretic composition: personality traits as morphisms, identity as the structure preserved across transformations.",
      "Biography accumulates from real interaction history \u2014 personality is grown, not authored.",
    ],
    openProblems: [
      "Drift detection: distinguishing healthy character development from degradation.",
      "Belief revision under contradiction without identity collapse.",
      "Evaluation: how do you measure that a personality is the same one, six months later?",
    ],
    stack: "Formal framework",
  },
  {
    slug: "y2k-sensory",
    name: "Y2K Sensory",
    oneLiner: "Maximalist Y2K aesthetics unified with neurodivergent accessibility.",
    description:
      "A dual-layer CSS architecture isolating decorative animation from functional UI, with cognitive presets for ADHD and Autism. An exploration in making ambitious visual design that doesn't punish the people using it.",
    status: "Public experiment",
    themes: ["accessibility", "design systems", "neurodivergent-first"],
    question:
      "Can maximalist visual design coexist with strict cognitive accessibility \u2014 or are they fundamentally at odds?",
    approach: [
      "Dual-layer CSS: decoration and function isolated into parallel cascade layers.",
      "AttentionGuard: cognitive presets adjusting animation, density, and contrast.",
      "User testing with neurodivergent collaborators to validate real-world usability.",
    ],
    openProblems: [
      "Formalizing accessibility evaluation for decorative animation beyond WCAG checkboxes.",
      "Balancing visual identity with cognitive load across diverse attention profiles.",
    ],
    stack: "HTML/CSS \u00b7 Three.js",
    link: { label: "Open Lab", href: "/labs/y2k-sensory/" },
  },
];

/* ------------------------------------------------------------------ */
/* Systems                                                             */
/* ------------------------------------------------------------------ */

export type SystemProject = {
  slug: string;
  name: string;
  kind: "flagship" | "oss" | "production";
  oneLiner: string;
  description: string;
  capabilities: string[];
  thesisLink: string;
  stack: string[];
  status: string;
  links: { label: string; href: string }[];
  install?: string;
};

export const systemsIntro =
  "Research that doesn't ship is speculation. These are the systems where the ideas get tested in the real world.";

export const systemProjects: SystemProject[] = [
  {
    slug: "strata",
    name: "Strata",
    kind: "production",
    oneLiner: "Municipal intelligence platform for the public sector.",
    description:
      "An embedded AI copilot on top of live public-data pipelines: multi-source federal and municipal ingestion, an embedded DuckDB analytical layer, and a deterministic LangGraph agent delivering consultative intelligence across education, procurement, and budget domains. In production serving real city profiles.",
    capabilities: [
      "Ultra-low-latency agent analytics over materialized public-data snapshots",
      "Deterministic orchestration with sandboxed read-only tools and LangSmith observability",
      "Data flywheel: bureaucratic PDFs, gazettes, and spreadsheets into Parquet + agent-optimized Markdown",
      "Multi-municipality tenancy with Cloud SQL and Clerk RBAC",
    ],
    thesisLink:
      "Government decisions deserve systems that remember: Strata's whole value is accumulated, structured institutional context \u2014 months of live data an agent can actually reason over.",
    stack: ["LangGraph", "DuckDB", "BigQuery", "Cloud Run", "Cloud SQL"],
    status: "In production \u00b7 Hub Esfera",
    links: [],
  },
  {
    slug: "pixie",
    name: "Pixie",
    kind: "flagship",
    oneLiner: "An embodied AI learning companion.",
    description:
      "Pixie talks, listens, remembers, and grows with the child using it. Real-time bidirectional voice over Gemini Live API, physics-based locomotion, synchronous spatial tool execution, and amplitude-driven lip-sync \u2014 built neurodivergent-first, so predictability and sensory pacing are first-class constraints.",
    capabilities: [
      "Voice-native interaction with real tool use \u2014 Pixie does things, not just says things.",
      "Long-term memory built on the lab's architecture research: learned context persists, decays, consolidates.",
      "Embodied presence \u2014 a 3D character with continuity of personality, desktop-native.",
      "Observer mode: pointer heatmaps driving context-aware spatial commentary.",
    ],
    thesisLink:
      "A learning companion is only useful if it remembers \u2014 a tutor with amnesia is a stranger every morning. Every lab program feeds this system.",
    stack: ["React", "Three.js", "Rapier", "Gemini Live API"],
    status: "In active development",
    links: [],
  },
  {
    slug: "multiverse",
    name: "Multiverse",
    kind: "oss",
    oneLiner: "State management with Git-style branching semantics.",
    description:
      "Fork application state, explore alternate timelines, merge what works. Multiverse treats state history as a first-class data structure \u2014 fork allocation benchmarked at 2.8M ops/s, merges inside a 60fps frame window.",
    capabilities: [
      "Git-style branching: fork, explore, merge, discard \u2014 timelines as cheap, safe operations.",
      "Proxy lazy-evaluation + CRDT-lite patch engine; hundreds of isolated agent branches at near-zero CPU cost.",
      "Timeline-safe UX patterns: undo trees, what-if previews, speculative edits without fear.",
    ],
    thesisLink:
      "Branching state is memory with alternatives \u2014 the open-source expression of how I think about history, persistence, and divergence in software.",
    stack: ["TypeScript"],
    status: "Open source \u00b7 MIT",
    links: [{ label: "GitHub", href: "https://github.com/jorgeguberte/multiverse" }],
    install: "npm install multiverse",
  },
];

export const writingIntro =
  "Notes on memory, context, infrastructure, and the realities of building AI systems outside toy demos.";

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const aboutPage = {
  lede: [
    "I'm Jorge Guberte \u2014 a software architect in S\u00e3o Paulo with twelve-plus years shipping production systems, now fully focused on applied AI systems architecture.",
    "Most of the industry optimizes the moment: better answers inside a single session, then total amnesia. I work on the other axis \u2014 what happens to an AI system across weeks, months, years. How it accumulates understanding. How it forgets well. How it stays itself. And I hold that research to a production standard: it has to ship, serve real users, and survive real institutions.",
  ],
  throughLine: {
    heading: "The through-line",
    paragraphs: [
      "The work splits into a workshop and a lab. In the workshop: Strata, a B2G municipal intelligence platform running in production at Hub Esfera; Pixie, an embodied learning companion testing the research in the hardest arena there is \u2014 a child's attention. In the lab: LoomDB, a temporal memory architecture where context behaves like a living graph; EPCG, a formal framework for persistent agent personality; Ayvu-Talian, language modeling where the stakes of forgetting are cultural.",
      "None of these are side projects. They are one program with multiple instruments.",
    ],
  },
  practice: {
    heading: "The practice",
    paragraphs: [
      "Before the AI chapter: nine years of foundations \u2014 distributed signage delivery, high-traffic campaign platforms for Walmart and Sony, cloud-native Python, Nike's global Joga3/JogaBonito campaign. That decade is why my AI work looks like systems architecture rather than prompt collections.",
      "Today I'm co-founder and CTO of Hub Esfera, a GovTech company where I architect AI for complex public-sector data. Production is a forcing function: it keeps the research honest, and the research keeps production ahead of the curve.",
    ],
  },
  domains: {
    heading: "Where I operate",
    items: [
      "Agent memory & temporal context architectures",
      "Context engineering & retrieval systems",
      "Agentic orchestration for long-running applications",
      "Advanced RAG & semantic search infrastructure",
      "Generative UI & human-AI interaction",
      "Accessibility-first, neurodivergent-first design",
    ],
  },
  closing:
    "If you're building something that needs to last longer than a session \u2014 or hiring someone who treats AI as architecture rather than incantation \u2014 we should talk.",
};

/* ------------------------------------------------------------------ */
/* Work with me                                                        */
/* ------------------------------------------------------------------ */

export const workWithMe = {
  title: "I take on engagements where persistence and memory are the hard architectural problems.",
  intro:
    "If you're building agents that need to persist, retrieval that needs to mean something, or AI products that should still be useful in month six \u2014 this is what I do all day.",
  engagements: [
    {
      name: "Architecture consulting",
      description:
        "Memory systems, retrieval pipelines, agent orchestration, context engineering. I design the architecture, pressure-test yours, or get hands-on with the hardest layer.",
    },
    {
      name: "Research collaboration",
      description:
        "Joint work on agent memory, cognitive architectures, and low-resource NLP. Open to co-authoring, joint prototyping, and lab-to-lab partnerships.",
    },
    {
      name: "Advisory & partnerships",
      description:
        "Technical advisory for founders and teams building long-running AI products. Cloud and infrastructure partnerships around memory-heavy agent workloads.",
    },
    {
      name: "Principal / staff roles",
      description:
        "For the right team building in this space, I'm open to principal- or staff-level architecture roles. Co-founder and CTO experience; I know what production demands.",
    },
  ],
  fit: "Best fit: teams for whom persistence, memory, or long-horizon behavior is core to the product \u2014 not a feature on a backlog.",
  cta: "Start the conversation",
};

export const footerContent = {
  thesisLine: thesis,
  location: "S\u00e3o Paulo, Brazil",
};

export const isPublicPost = (post: { tags?: string[]; slug: string }) =>
  !(post.tags ?? []).includes("meta") &&
  post.slug !== "hello-world" &&
  post.slug !== "testing-blog";
