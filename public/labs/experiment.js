(() => {
  const experiments = [
    {
      slug: "minidisc-album",
      collection: "y2k-sensory",
      title: "MiniDisc player",
      description:
        "A little machine for listening. Rotate the hardware, open the shutter, follow the lyrics.",
      hint: "Drag to rotate \u00b7 press play",
      category: "Audio + objects",
      art: "disc",
      url: "y2k-sensory/minidisc-album.html",
    },
    {
      slug: "semantic-lod",
      collection: "interaction",
      title: "Documents with depth",
      description:
        "One document. Four distances. Move from the headline into the evidence without leaving the page.",
      hint: "Choose a depth \u00b7 explore a block",
      category: "Reading + reasoning",
      art: "layers",
      url: "interaction/semantic-lod.html",
    },
    {
      slug: "attractor-collider",
      collection: "interaction",
      title: "Strange attractors",
      description:
        "A field of chaotic trajectories. Place a gravity well and bend the system with your hands.",
      hint: "Drag inside the field",
      category: "Systems + motion",
      art: "orbits",
      url: "interaction/attractor-collider.html",
    },
    {
      slug: "ai-hologram",
      collection: "y2k-sensory",
      title: "A voice with a body",
      description:
        "An animated hologram with browser speech and scripted conversational responses.",
      hint: "Type a message \u00b7 enable voice",
      category: "Audio + objects",
      art: "orb",
      url: "y2k-sensory/ai-hologram.html",
    },
    {
      slug: "semantic-chisel",
      collection: "interaction",
      title: "Semantic chisel",
      description:
        "Squeeze a paragraph to its essentials, split an argument, or merge two blocks into one.",
      hint: "Select a block \u00b7 use its handles",
      category: "Reading + reasoning",
      art: "chisel",
      url: "interaction/semantic-chisel.html",
    },
    {
      slug: "borrow-mesh",
      collection: "interaction",
      title: "Tactile borrow mesh",
      description:
        "Rust lifetimes become a physical relationship. Move the drop point and watch a conflict emerge.",
      hint: "Drag the lifetime handle",
      category: "Systems + motion",
      art: "mesh",
      url: "interaction/borrow-mesh.html",
    },
    {
      slug: "ghost-diffs",
      collection: "interaction",
      title: "Ghost diffs",
      description:
        "Keep the original in view while exploring alternate versions of an argument.",
      hint: "Explore the inline alternatives",
      category: "Reading + reasoning",
      art: "ghost",
      url: "interaction/ghost-diffs.html",
    },
    {
      slug: "prosodic-typography",
      collection: "interaction",
      title: "Typography that speaks",
      description:
        "Pace, emphasis, and tension become visible properties of a sentence.",
      hint: "Adjust the expressive controls",
      category: "Reading + reasoning",
      art: "type",
      url: "interaction/prosodic-typography.html",
    },
    {
      slug: "semantic-oscilloscope",
      collection: "interaction",
      title: "Semantic oscilloscope",
      description:
        "A visual sketch of coherence: inspect how a changing signal changes the reading experience.",
      hint: "Adjust the signal controls",
      category: "Systems + motion",
      art: "wave",
      url: "interaction/semantic-oscilloscope.html",
    },
    {
      slug: "rhythmic",
      collection: "y2k-sensory",
      title: "Rhythm & attention",
      description:
        "A visual metronome, a spinning disc, and text that follows the beat. Set your own pace.",
      hint: "Choose a tempo \u00b7 start the beat",
      category: "Audio + objects",
      art: "rhythm",
      url: "y2k-sensory/rhythmic.html",
    },
    {
      slug: "ps1-agent",
      collection: "y2k-sensory",
      title: "PS1 agent core",
      description:
        "Low-poly nodes, crunchy geometry, and a console from an alternative computing history.",
      hint: "Boot the console \u00b7 explore",
      category: "Systems + motion",
      art: "ps1",
      url: "y2k-sensory/ps1-agent.html",
    },
    {
      slug: "index",
      collection: "y2k-sensory",
      title: "Sensory playground",
      description:
        "A hands-on collection of interface textures, motion settings, and tactile controls.",
      hint: "Try the controls \u00b7 change the mood",
      category: "Audio + objects",
      art: "sensory",
      url: "y2k-sensory/index.html",
    },
  ];
  const current = location.pathname
    .split("/")
    .filter(Boolean)
    .slice(-2)
    .join("/");
  const index = experiments.findIndex((item) => item.url === current);
  const nav = document.createElement("nav");
  nav.className = "lab-nav";
  nav.setAttribute("aria-label", "Experiment navigation");
  const home = document.createElement("a");
  home.href = "../index.html";
  home.textContent = "← Labs";
  nav.append(home);
  const label = document.createElement("label");
  const caption = document.createElement("span");
  caption.textContent = "Explore";
  label.append(caption);
  const select = document.createElement("select");
  select.setAttribute("aria-label", "Choose an experiment");
  const placeholder = document.createElement("option");
  placeholder.textContent = "Choose an experiment";
  placeholder.value = "";
  select.append(placeholder);
  experiments.forEach((item, i) => {
    const option = document.createElement("option");
    option.value = item.url;
    option.textContent = `${String(i + 1).padStart(2, "0")} / ${item.title}`;
    option.selected = i === index;
    select.append(option);
  });
  select.value = index >= 0 ? experiments[index].url : "";
  select.addEventListener("change", () => {
    if (select.value) location.href = "../" + select.value;
  });
  label.append(select);
  nav.append(label);
  const next = document.createElement("a");
  const nextItem = experiments[(index + 1) % experiments.length];
  next.href = "../" + nextItem.url;
  next.className = "lab-next";
  next.textContent = "Next experiment →";
  next.setAttribute("aria-label", "Next experiment: " + nextItem.title);
  nav.append(next);
  document.body.prepend(nav);
  if (index >= 0) {
    const tip = document.createElement("details");
    tip.className = "lab-tip";
    const summary = document.createElement("summary");
    summary.textContent = "How to explore";
    const p = document.createElement("p");
    p.textContent =
      experiments[index].hint + ". " + experiments[index].description;
    tip.append(summary, p);
    nav.after(tip);
  }
})();
