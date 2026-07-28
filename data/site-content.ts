/**
 * Site content model — Jorge Guberte
 * One thesis. Systems as instruments. Writing as evidence.
 */

export const thesis =
  "AI systems should retain context, adapt over time, and remain useful beyond a single interaction.";

export const profile = {
  name: "Jorge Guberte",
  eyebrow: "Software Engineer · AI Systems · São Paulo, Brazil",
  subhead:
    "I design and build AI systems that carry context, adapt, and do real work — from agent memory architectures to low-resource language models. One question, pursued for years: what does it take for an AI system to genuinely persist?",
  email: "jorgeguberte@gmail.com",
  github: "https://github.com/jorgeguberte",
  linkedin: "https://www.linkedin.com/in/jorgeguberte",
};

export const navLinks = [
  { label: "Lab", href: "/lab" },
  { label: "Systems", href: "/systems" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
];

export const whyMemory = {
  label: "01 — Why memory",
  paragraphs: [
    "Most AI systems are amnesiac by design. Every session starts from zero: no accumulated context, no evolving understanding of the person on the other side, no continuity of purpose. We've built remarkable reasoning engines and given them the memory of a goldfish.",
    "That's not a model problem. It's an architecture problem — and architecture is where I work.",
    "My research and systems all attack the same gap: how machines retain, structure, decay, and retrieve context over months and years, not minutes. Memory, persistence, and personality are not features to bolt on. They are the substrate.",
  ],
};

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
  "Ongoing research programs. Each one is a different cut at the same question: what does it take for an AI system to genuinely persist?";

export const labPrograms: LabProgram[] = [
  {
    slug: "loomdb",
    name: "LoomDB",
    oneLiner: "A graph-based temporal memory architecture.",
    description:
      "Context as a living graph: activation spreads, attention decays, relevance is a function of time. Memory that behaves less like a database and more like a mind — recency, frequency, and association shaping what surfaces and what fades.",
    status: "Active research",
    themes: ["agent memory", "retrieval", "temporal graphs"],
    question:
      "Can memory retrieval be modeled as spreading activation over a temporal graph — where forgetting is a feature, not a failure?",
    approach: [
      "Activation decay: memories lose energy over time unless reinforced, mirroring human salience.",
      "Active context graph: the working set is a live subgraph, continuously re-weighted as the conversation moves.",
      "Rust core compiled to WASM — the same memory engine runs server-side, in the browser, and embedded in desktop agents.",
    ],
    openProblems: [
      "Consolidation: when should episodic traces merge into semantic structure?",
      "Decay calibration across radically different interaction frequencies.",
      "Benchmarking long-horizon recall without long-horizon datasets.",
    ],
    stack: "Rust · WASM",
  },
  {
    slug: "epcg",
    name: "EPCG",
    oneLiner: "An emergent personality framework for AI agents.",
    description:
      "Personality as structure, not system prompt. EPCG composes agent identity from three interacting layers — Behavior, Belief, and Biography — drawing on category theory to make the composition lawful, inspectable, and stable over time.",
    status: "Early research",
    themes: ["cognitive architectures", "agent identity", "category theory"],
    question:
      "What is the minimal formal structure from which a coherent, persistent agent personality can emerge — and survive thousands of interactions without drifting?",
    approach: [
      "The BBB model: Behavior (what the agent does), Belief (what it holds true), Biography (what it has lived). Each layer constrains the others.",
      "Category-theoretic composition: personality traits as morphisms, identity as the structure preserved across transformations.",
      "Biography accumulates from real interaction history — personality is grown, not authored.",
    ],
    openProblems: [
      "Drift detection: distinguishing healthy character development from degradation.",
      "Belief revision under contradiction without identity collapse.",
      "Evaluation: how do you measure that a personality is the same one, six months later?",
    ],
    stack: "Formal framework",
  },
  {
    slug: "ayvu-talian",
    name: "Ayvu-Talian",
    oneLiner: "Language modeling for minority language preservation.",
    description:
      "A decoder-only transformer trained for Talian, a Venetian-derived language spoken in southern Brazil. What language modeling looks like when the training corpus is a community's living memory, not the internet — and the failure mode is cultural loss.",
    status: "Active research",
    themes: ["low-resource NLP", "cultural persistence", "from-scratch transformers"],
    question:
      "How small can a useful language model be when the language itself is small — and what does 'useful' mean when the goal is preservation, not production?",
    approach: [
      "Decoder-only transformer built from scratch — every layer understood, no pretrained shortcuts hiding the real constraints.",
      "Corpus construction as fieldwork: gathering, cleaning, and structuring a scarce, living textual record.",
      "Tokenization strategies for a language with unstable orthography and heavy code-switching with Portuguese.",
    ],
    openProblems: [
      "Evaluation without native benchmarks or large speaker populations.",
      "Generation that respects dialectal variation instead of flattening it.",
      "Transfer from high-resource relatives (Italian, Venetian) without erasing what makes Talian itself.",
    ],
    stack: "PyTorch · From-scratch transformer",
    link: { label: "GitHub", href: "https://github.com/jorgeguberte/ayvu-talian-base" },
  },
  {
    slug: "y2k-sensory",
    name: "Y2K Sensory",
    oneLiner: "A design framework unifying maximalist Y2K aesthetics with neurodivergent accessibility.",
    description:
      "A dual-layer CSS architecture that isolates decorative animations from functional UI, offering tailored cognitive presets for TDAH and Autism. Built as an exploration in making ambitious visual design that doesn't punish the people using it.",
    status: "Public experiment",
    themes: ["accessibility", "design systems", "neurodivergent-first"],
    question:
      "Can maximalist visual design coexist with strict cognitive accessibility — or are they fundamentally at odds?",
    approach: [
      "Dual-layer CSS: decoration and function isolated into parallel cascade layers.",
      "AttentionGuard: cognitive presets that adjust animation, density, and contrast.",
      "User testing with neurodivergent collaborators to validate real-world usability.",
    ],
    openProblems: [
      "Formalizing accessibility evaluation for decorative animation beyond WCAG checkboxes.",
      "Balancing visual identity with cognitive load across diverse attention profiles.",
    ],
    stack: "HTML/CSS · Three.js",
    link: { label: "Open Lab", href: "/labs/y2k-sensory/" },
  },
];

export type SystemProject = {
  slug: string;
  name: string;
  kind: "flagship" | "oss";
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
    slug: "pixie",
    name: "Pixie",
    kind: "flagship",
    oneLiner: "An embodied AI learning companion.",
    description:
      "Pixie talks, listens, remembers, and grows with the child using it. Built neurodivergent-first: predictable interaction patterns, sensory-considered design, and a memory that lets the companion know you on day ninety the way it couldn't on day one.",
    capabilities: [
      "Voice-native interaction with real tool use — Pixie does things, not just says things.",
      "Long-term memory built on the lab's architecture research: what Pixie learns persists, decays, and consolidates over months.",
      "Embodied presence — a 3D character with continuity of personality, running desktop-native.",
      "Neurodivergent-first interaction design: predictability, sensory regulation, and pacing as first-class constraints, not afterthoughts.",
    ],
    thesisLink:
      "A learning companion is only useful if it remembers — a tutor with amnesia is a stranger every morning. Every lab program feeds this system: memory architecture, persistent personality, interaction design under real cognitive constraints.",
    stack: ["Next.js", "Convex", "Three.js", "Tauri"],
    status: "In active development",
    links: [],
  },
  {
    slug: "multiverse",
    name: "Multiverse",
    kind: "oss",
    oneLiner: "State management with Git-style branching semantics.",
    description:
      "Fork application state, explore alternate timelines, merge what works. Multiverse treats state history as a first-class data structure — the same thinking that drives my memory research, applied to frontend state.",
    capabilities: [
      "Git-style branching: fork, explore, merge, discard — state timelines as cheap, safe operations.",
      "Timeline-safe UX patterns: undo trees, what-if previews, and speculative edits without fear.",
      "Small, typed, dependency-light TypeScript core.",
    ],
    thesisLink:
      "Branching state is memory with alternatives. Multiverse is the open-source, general-purpose expression of how I think about history, persistence, and divergence in software.",
    stack: ["TypeScript"],
    status: "Open source · MIT",
    links: [{ label: "GitHub", href: "https://github.com/jorgeguberte/multiverse" }],
    install: "npm install multiverse",
  },
];

export const writingIntro =
  "Notes on memory, context, infrastructure, and the realities of building AI systems outside toy demos.";

export const aboutPage = {
  lede: [
    "I'm Jorge Guberte — a software engineer and systems builder in São Paulo, Brazil. I've spent years orbiting a single conviction: AI systems should retain context, adapt over time, and remain useful beyond a single interaction.",
    "Most of the industry optimizes the moment — better answers inside a single session, then total amnesia. I work on the other axis: what happens to an AI system across weeks, months, years. How it accumulates understanding. How it forgets well. How it stays itself.",
  ],
  throughLine: {
    heading: "The through-line",
    paragraphs: [
      "The work splits into a lab and a workshop. In the lab: LoomDB, a temporal memory architecture where context behaves like a living graph; EPCG, a formal framework for emergent, persistent agent personality; Ayvu-Talian, language modeling where the stakes of forgetting are cultural, not technical. In the workshop: Pixie, an embodied learning companion that tests the research in the hardest possible arena — a child's attention; and Multiverse, the open-source expression of how I think about state, history, and divergence.",
      "None of these are side projects. They are one program with multiple instruments.",
    ],
  },
  practice: {
    heading: "The practice",
    paragraphs: [
      "Alongside the research, I'm co-founder and CTO of Hub Esfera, a GovTech company where I architect AI systems for complex public-sector data — agent orchestration, retrieval pipelines, and long-running workflows that real institutions depend on. Production is a forcing function: it keeps the research honest, and the research keeps the production ahead of the curve.",
      "Before all this, a long foundation in software engineering — platforms, APIs, infrastructure — which is why my AI work looks like systems architecture rather than prompt collections.",
    ],
  },
  domains: {
    heading: "Where I operate",
    items: [
      "Agent memory & temporal context architectures",
      "Context engineering & retrieval systems",
      "Cognitive architectures & agent personality",
      "Agent orchestration for long-running applications",
      "Embodied AI & human-AI interaction",
      "Accessibility-first, neurodivergent-first interaction design",
    ],
  },
  closing:
    "I like systems that feel alive: things that remember, decay, branch, adapt, and become more useful with time. If you're building something that needs to last longer than a session, we should talk.",
};

export const workWithMe = {
  title: "I take on engagements where persistence and memory are the hard architectural problems.",
  intro:
    "If you're building agents that need to persist, retrieval that needs to mean something, or AI products that should still be useful in month six — this is what I do all day.",
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
  fit: "Best fit: teams for whom persistence, memory, or long-horizon behavior is core to the product — not a feature on a backlog.",
  cta: "Start the conversation",
};

export const footerContent = {
  thesisLine: thesis,
  location: "São Paulo, Brazil",
};

export const isPublicPost = (post: { tags?: string[]; slug: string }) =>
  !(post.tags ?? []).includes("meta") &&
  post.slug !== "hello-world" &&
  post.slug !== "testing-blog";
