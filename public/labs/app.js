const experiments = [
  {
    title: "Agent Memory Toys",
    description:
      "Tiny interfaces and simulations for exploring recall, decay, reinforcement, and retrieval without the overhead of a full product.",
    stage: "idea",
    tags: ["memory", "agents", "simulation"],
  },
  {
    title: "Generative UI Fragments",
    description:
      "Fast sketches for interfaces that adapt to conversation state, context windows, and structured outputs.",
    stage: "planned",
    tags: ["ui", "genui", "interaction"],
  },
  {
    title: "Inference UX Checks",
    description:
      "Micro tools for testing how model behavior feels in the hands of a user, not just in logs and benchmark tables.",
    stage: "planned",
    tags: ["inference", "evaluation", "ux"],
  },
  {
    title: "Language Preservation Experiments",
    description:
      "Places to try prompt patterns, corpora slices, and lightweight demos around minority language tooling.",
    stage: "idea",
    tags: ["nlp", "language", "ayvu"],
  },
  {
    title: "Context Engineering Notes",
    description:
      "Hybrid zone between prototype and notebook: small artifacts that help reason about context routing and long-running agent state.",
    stage: "forming",
    tags: ["context", "systems", "notes"],
  },
  {
    title: "Weird Useful Utilities",
    description:
      "Single-purpose little tools that are too small for the main site but too good to leave trapped in local folders.",
    stage: "open",
    tags: ["tools", "misc", "playground"],
  },
];

const stageLabel = {
  idea: "seed idea",
  planned: "planned",
  forming: "taking shape",
  open: "open slot",
};

const grid = document.getElementById("card-grid");

grid.innerHTML = experiments
  .map(
    (experiment) => `
      <article class="panel experiment-card">
        <p class="eyebrow">${stageLabel[experiment.stage]}</p>
        <h3>${experiment.title}</h3>
        <p>${experiment.description}</p>
        <div class="experiment-meta">
          ${experiment.tags.map((tag) => `<span class="pill">${tag}</span>`).join("")}
        </div>
        <div class="card-footer">
          <span class="card-link">Waiting for first artifact →</span>
        </div>
      </article>
    `
  )
  .join("");
