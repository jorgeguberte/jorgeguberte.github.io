const experiments = [
  {
    title: "Y2K Sensory Design & Attention Lab",
    description:
      "Interactive playground showcasing our Y2K Brutalist & Neurodivergent design system. Experience the AttentionGuard dual-layer layout, real-time sensory state controls (TDAH/Autism), and micro-interaction focus anchors.",
    stage: "open",
    tags: ["design-system", "accessibility", "y2k-brutalist", "attention-guard"],
    url: "./y2k-sensory/index.html",
    linkText: "Abrir Laboratório Sensorial →"
  }
];

const stageLabel = {
  idea: "seed idea",
  planned: "planned",
  forming: "taking shape",
  open: "live experiment",
};

const grid = document.getElementById("card-grid");

grid.innerHTML = experiments
  .map(
    (experiment) => `
      <article class="panel experiment-card" style="transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); background-color: var(--panel); border: 1px solid var(--border); padding: 2rem; border-radius: 2rem; box-shadow: var(--shadow);">
        <p class="eyebrow" style="margin-bottom: 0.75rem;">${stageLabel[experiment.stage]}</p>
        <h3 style="font-family: var(--font-display); font-size: 1.75rem; font-weight: 600; color: #ffffff; margin-bottom: 0.75rem; letter-spacing: -0.01em;">${experiment.title}</h3>
        <p style="font-size: 14px; color: var(--muted); line-height: 1.6; margin-bottom: 1.5rem; font-weight: 300;">${experiment.description}</p>
        <div class="experiment-meta" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
          ${experiment.tags.map((tag) => `<span class="pill" style="display: inline-flex; align-items: center; padding: 0.35rem 0.75rem; border-radius: 9999px; border: 1px solid var(--border); color: #a1a1aa; font-family: var(--font-mono); font-size: 10px; font-weight: 500;">${tag}</span>`).join("")}
        </div>
        <div class="card-footer" style="margin-top: auto;">
          <a class="card-link btn-pill" href="${experiment.url}" style="text-decoration: none; display: inline-flex; align-items: center; gap: 0.75rem; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border); color: #ffffff; font-size: 13px; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 9999px; transition: all 0.3s ease;">
            ${experiment.linkText}
            <span class="arrow-circle" style="width: 1.5rem; height: 1.5rem; border-radius: 50%; background: rgba(255, 255, 255, 0.05); display: flex; align-items: center; justify-content: center;">↗</span>
          </a>
        </div>
      </article>
    `
  )
  .join("");

// Hover micro-animation for the card link
document.querySelectorAll(".card-link").forEach(link => {
  link.addEventListener("mouseenter", () => {
    link.style.borderColor = "var(--accent)";
    link.style.boxShadow = "0 0 15px rgba(0, 255, 102, 0.15)";
    link.querySelector(".arrow-circle").style.backgroundColor = "var(--accent)";
    link.querySelector(".arrow-circle").style.color = "#000000";
  });
  link.addEventListener("mouseleave", () => {
    link.style.borderColor = "var(--border)";
    link.style.boxShadow = "none";
    link.querySelector(".arrow-circle").style.backgroundColor = "rgba(255, 255, 255, 0.05)";
    link.querySelector(".arrow-circle").style.color = "inherit";
  });
});

// Setup active sensory control mapping on index.html if docks exist
const docBtn = document.querySelectorAll(".dock-btn");
if (docBtn.length > 0) {
  docBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
      docBtn.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const mode = btn.dataset.target;
      document.documentElement.setAttribute("data-sensory", mode);
    });
  });
}
