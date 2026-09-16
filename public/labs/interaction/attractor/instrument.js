/* A self-contained 3D canvas instrument. No network dependency for the simulation. */
(() => {
  "use strict";
  const E = AttractorEngine,
    $ = (id) => document.getElementById(id),
    canvas = $("field"),
    ctx = canvas.getContext("2d");
  if (!ctx) {
    $("feedback").textContent = "Este navegador não disponibilizou Canvas 2D.";
    return;
  }
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const homes = [
    [2.6, 1.2, 0],
    [-2.5, -1, 0.6],
    [0.3, -2.2, -1.4],
  ];
  const defaults = {
    model: "lorenz",
    speed: 1,
    gravity: 0,
    trail: 64,
    palette: "ember",
    seed: 7,
    count: 160,
    yaw: 0.25,
    pitch: -0.3,
    zoom: 1,
    wells: homes.map((w) => [...w]),
  };
  const state = structuredClone(defaults);
  let dirty = true;
  let playing = !reduceMotion.matches,
    particles = [],
    width = 1,
    height = 1,
    dpr = 1,
    elapsed = 0,
    accumulator = 0,
    last = 0,
    frame = 0,
    snapshotRequested = false;
  let pointer = null,
    audio = null,
    audioOn = false,
    volume = 0.04,
    failures = 0;
  const colors = {
    ember: ["#ffb27a", "#ed8158", "#f7e7be"],
    ice: ["#80e4e7", "#579bbc", "#d4f7ef"],
    violet: ["#cca9fc", "#8979cf", "#f2d5ec"],
  };
  const wellColors = ["#ffb27a", "#72d9e1", "#c6a1ef"];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const announce = (text) => {
    $("feedback").textContent = text;
  };
  function loadConfig() {
    const raw = new URLSearchParams(location.search).get("s");
    if (!raw) return;
    try {
      if (raw.length > 3000) throw Error("long");
      const s = JSON.parse(raw);
      if (Object.hasOwn(E.models, s.model)) state.model = s.model;
      if (Object.hasOwn(colors, s.palette)) state.palette = s.palette;
      for (const [key, min, max] of [
        ["speed", 0.1, 2],
        ["gravity", 0, 2],
        ["trail", 12, 100],
        ["seed", 0, 2147483647],
        ["yaw", -20, 20],
        ["pitch", -1.3, 1.3],
        ["zoom", 0.5, 2.5],
      ]) {
        if (typeof s[key] === "number" && Number.isFinite(s[key]))
          state[key] = clamp(s[key], min, max);
      }
      state.seed = Math.floor(state.seed);
      state.trail = Math.round(state.trail);
      if ([80, 160, 240].includes(s.count)) state.count = s.count;
      if (
        Array.isArray(s.wells) &&
        s.wells.length === 3 &&
        s.wells.every(
          (w) =>
            Array.isArray(w) &&
            w.length === 3 &&
            w.every((n) => typeof n === "number" && Number.isFinite(n)),
        )
      )
        state.wells = s.wells.map((w) => w.map((n) => clamp(n, -6, 6)));
      announce(
        "Configuração carregada. Reinicie para reproduzir a mesma semente.",
      );
    } catch {
      announce("Link de configuração inválido. Abrimos o universo padrão.");
    }
  }
  function initParticles() {
    dirty = true;
    particles = E.seeds(state.model, state.count, state.seed).map((p, i) => ({
      p,
      history: [E.display(p, state.model)],
      color: i % 3,
    }));
    // Fill the initial field with actual integrated trajectories, including any restored perturbation.
    for (let n = 0; n < 100; n++)
      for (const p of particles) {
        p.p = E.step(p.p, 0.01, state.model, state.wells, state.gravity);
        if (!E.finite(p.p)) p.p = [...E.models[state.model].initial];
        p.history.push(E.display(p.p, state.model));
      }
    elapsed = 0;
    accumulator = 0;
    failures = 0;
  }
  function sync() {
    dirty = true;
    document
      .querySelectorAll("button[data-model]")
      .forEach((b) =>
        b.setAttribute("aria-pressed", String(b.dataset.model === state.model)),
      );
    document
      .querySelectorAll("[data-palette]")
      .forEach((b) =>
        b.setAttribute(
          "aria-pressed",
          String(b.dataset.palette === state.palette),
        ),
      );
    for (const key of ["speed", "gravity", "trail"]) $(key).value = state[key];
    $("speed-out").textContent = state.speed.toFixed(2) + "×";
    $("gravity-out").textContent = state.gravity.toFixed(2);
    $("trail-out").textContent = state.trail + " passos";
    $("quality").value = state.count;
    $("equations").textContent = E.models[state.model].equation.join("\n");
    $("subtitle").textContent = E.models[state.model].subtitle;
    $("model-label").textContent =
      E.models[state.model].name.toUpperCase() +
      " / RK4 · " +
      state.count +
      " TRAJETÓRIAS";
    $("play").textContent = playing ? "Ⅱ Pausar" : "▶ Explorar";
    $("play").setAttribute("aria-pressed", String(!playing));
    $("running-label").textContent = playing
      ? "EM MOVIMENTO"
      : "TEMPO SUSPENSO";
    canvas.dataset.model = state.model;
    canvas.dataset.playing = String(playing);
  }
  function resize() {
    const r = canvas.getBoundingClientRect();
    width = r.width;
    height = r.height;
    dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }
  function project(v) {
    const cy = Math.cos(state.yaw),
      sy = Math.sin(state.yaw),
      cp = Math.cos(state.pitch),
      sp = Math.sin(state.pitch);
    const x = v[0] * cy + v[2] * sy,
      z = -v[0] * sy + v[2] * cy,
      y = v[1] * cp - z * sp,
      depth = v[1] * sp + z * cp;
    const perspective = 9 / Math.max(3, 9 + depth);
    const scale =
      Math.min(width, height) * (width < 500 ? 0.1 : 0.13) * state.zoom;
    return [
      width * 0.5 + x * scale * perspective,
      height * (width < 500 ? 0.63 : 0.56) - y * scale * perspective,
      depth,
      scale * perspective,
    ];
  }
  function moveWell(index, dx, dy) {
    dirty = true;
    const scale = project(state.wells[index])[3],
      cy = Math.cos(state.yaw),
      sy = Math.sin(state.yaw),
      cp = Math.cos(state.pitch),
      sp = Math.sin(state.pitch);
    const x = dx / scale,
      y = -dy / scale;
    state.wells[index][0] = clamp(
      state.wells[index][0] + x * cy + y * sp * sy,
      -6,
      6,
    );
    state.wells[index][1] = clamp(state.wells[index][1] + y * cp, -6, 6);
    state.wells[index][2] = clamp(
      state.wells[index][2] + x * sy - y * sp * cy,
      -6,
      6,
    );
  }
  function draw() {
    ctx.fillStyle = "#0b1013";
    ctx.fillRect(0, 0, width, height);
    const halo = ctx.createRadialGradient(
      width * 0.5,
      height * 0.56,
      0,
      width * 0.5,
      height * 0.56,
      Math.min(width, height) * 0.5,
    );
    halo.addColorStop(0, "#1b2a3044");
    halo.addColorStop(1, "#0b101300");
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "#26373e50";
    ctx.lineWidth = 0.6;
    for (let j = -5; j <= 5; j++) {
      const a = project([-5, -2.8, j]),
        b = project([5, -2.8, j]),
        c = project([j, -2.8, -5]),
        d = project([j, -2.8, 5]);
      ctx.beginPath();
      ctx.moveTo(a[0], a[1]);
      ctx.lineTo(b[0], b[1]);
      ctx.moveTo(c[0], c[1]);
      ctx.lineTo(d[0], d[1]);
      ctx.stroke();
    }
    // Draw contiguous paths in three depth-of-history bands for luminous, legible filaments.
    ctx.globalCompositeOperation = "lighter";
    const palette = colors[state.palette];
    for (let band = 0; band < 3; band++)
      for (let color = 0; color < 3; color++) {
        ctx.beginPath();
        ctx.strokeStyle = palette[color];
        ctx.lineWidth = band === 2 ? 1.05 : 0.65;
        ctx.globalAlpha = [0.09, 0.2, 0.46][band];
        for (const p of particles) {
          if (p.color !== color) continue;
          const start = Math.max(0, p.history.length - state.trail),
            length = p.history.length - start;
          const from = start + Math.floor((length * band) / 3),
            to = start + Math.floor((length * (band + 1)) / 3);
          for (let k = from; k < to; k++) {
            const v = project(p.history[k]);
            if (k === from) ctx.moveTo(v[0], v[1]);
            else ctx.lineTo(v[0], v[1]);
          }
        }
        ctx.stroke();
      }
    ctx.globalAlpha = 0.8;
    for (const p of particles) {
      const v = project(p.history[p.history.length - 1]);
      ctx.fillStyle = palette[p.color];
      ctx.beginPath();
      ctx.arc(v[0], v[1], 1.1, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    state.wells.forEach((w, i) => {
      const p = project(w),
        active = pointer && pointer.well === i;
      const glow = ctx.createRadialGradient(p[0], p[1], 1, p[0], p[1], 28);
      glow.addColorStop(0, wellColors[i] + "60");
      glow.addColorStop(1, wellColors[i] + "00");
      ctx.fillStyle = glow;
      ctx.fillRect(p[0] - 28, p[1] - 28, 56, 56);
      ctx.strokeStyle = wellColors[i];
      ctx.lineWidth = active ? 1.5 : 0.8;
      ctx.beginPath();
      ctx.ellipse(p[0], p[1], active ? 24 : 18, 8, -0.4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = wellColors[i];
      ctx.beginPath();
      ctx.arc(p[0], p[1], 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = "9px monospace";
      ctx.fillText(["α", "β", "γ"][i], p[0] + 20, p[1] - 12);
    });
    canvas.dataset.resets = String(failures);
    if (snapshotRequested) {
      snapshotRequested = false;
      exportPNG();
    }
  }
  function tick() {
    const h = (1 / 120) * E.models[state.model].rate;
    for (const p of particles) {
      p.p = E.step(p.p, h, state.model, state.wells, state.gravity);
      if (!E.finite(p.p)) {
        p.p = [...E.models[state.model].initial];
        p.history = [];
        failures++;
      }
      p.history.push(E.display(p.p, state.model));
      if (p.history.length > 100) p.history.shift();
    }
    elapsed += h;
  }
  function loop(t) {
    const delta = last ? Math.min((t - last) / 1000, 0.05) : 0;
    last = t;
    if (!document.hidden) {
      if (playing) {
        accumulator += delta * state.speed;
        while (accumulator >= 1 / 120) {
          tick();
          accumulator -= 1 / 120;
        }
      }
      if (playing || dirty) {
        draw();
        dirty = false;
      }
      if (frame++ % 20 === 0) {
        $("running-label").textContent = playing
          ? "EM MOVIMENTO · t " + elapsed.toFixed(1)
          : "TEMPO SUSPENSO";
        updateAudio();
      }
    }
    requestAnimationFrame(loop);
  }
  function togglePlay() {
    playing = !playing;
    accumulator = 0;
    sync();
    updateAudio();
  }
  async function toggleAudio() {
    try {
      if (!audio) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) throw Error("unsupported");
        const context = new AC(),
          master = context.createGain(),
          filter = context.createBiquadFilter(),
          carrier = context.createOscillator(),
          mod = context.createOscillator(),
          depth = context.createGain();
        master.gain.value = 0;
        filter.type = "lowpass";
        filter.frequency.value = 450;
        carrier.type = "sine";
        mod.type = "sine";
        depth.gain.value = 15;
        mod.connect(depth);
        depth.connect(carrier.frequency);
        carrier.connect(filter);
        filter.connect(master);
        master.connect(context.destination);
        carrier.start();
        mod.start();
        audio = { context, master, filter, carrier, mod, depth };
      }
      await audio.context.resume();
      audioOn = !audioOn;
      $("audio").textContent = audioOn ? "♫ Drone ligado" : "♫ Ativar drone";
      $("audio").setAttribute("aria-pressed", String(audioOn));
      updateAudio();
      if (audioOn && !playing)
        announce("Drone ligado. Retome o movimento para ouvir.");
    } catch {
      announce(
        "Áudio indisponível neste navegador. O campo continua funcionando.",
      );
    }
  }
  function updateAudio() {
    if (!audio) return;
    const t = audio.context.currentTime;
    audio.master.gain.setTargetAtTime(
      audioOn && playing && !document.hidden ? volume : 0,
      t,
      0.08,
    );
    audio.carrier.frequency.setTargetAtTime(
      { lorenz: 65.41, aizawa: 82.41, rossler: 55 }[state.model] +
        state.wells[0][1] * 2,
      t,
      0.15,
    );
    audio.mod.frequency.setTargetAtTime(30 + state.speed * 35, t, 0.15);
    audio.depth.gain.setTargetAtTime(12 + state.gravity * 65, t, 0.15);
    audio.filter.frequency.setTargetAtTime(250 + state.gravity * 450, t, 0.15);
  }
  function exportPNG() {
    const out = document.createElement("canvas");
    out.width = canvas.width;
    out.height = canvas.height;
    const c = out.getContext("2d");
    c.drawImage(canvas, 0, 0);
    c.scale(dpr, dpr);
    c.fillStyle = "#0b1013dd";
    c.fillRect(0, height - 60, width, 60);
    c.fillStyle = "#e9eeec";
    c.font = "14px monospace";
    c.fillText(
      "STRANGE ATTRACTOR / " + E.models[state.model].name.toUpperCase(),
      22,
      height - 34,
    );
    c.fillStyle = "#a4b3b9";
    c.font = "9px monospace";
    c.fillText(
      "SEED " +
        state.seed +
        " · GRAVITY " +
        state.gravity.toFixed(2) +
        " · jorgeguberte.com/labs",
      22,
      height - 16,
    );
    out.toBlob((blob) => {
      if (!blob) {
        announce("Não foi possível gerar a imagem.");
        return;
      }
      const url = URL.createObjectURL(blob),
        a = document.createElement("a");
      a.href = url;
      a.download = "attractor-" + state.model + "-" + state.seed + ".png";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 30000);
      announce("Composição salva em PNG.");
    }, "image/png");
  }
  canvas.addEventListener("pointerdown", (e) => {
    if (pointer || e.button > 0) return;
    const r = canvas.getBoundingClientRect(),
      x = e.clientX - r.left,
      y = e.clientY - r.top;
    let well = -1,
      best = 28;
    state.wells.forEach((w, i) => {
      const p = project(w),
        dist = Math.hypot(x - p[0], y - p[1]);
      if (dist < best) {
        best = dist;
        well = i;
      }
    });
    pointer = { id: e.pointerId, x: e.clientX, y: e.clientY, well };
    canvas.setPointerCapture(e.pointerId);
    canvas.style.cursor = "grabbing";
    if (well >= 0 && state.gravity === 0) {
      state.gravity = 0.65;
      sync();
      announce("Gravidade ativada: o nó agora deforma as trajetórias.");
    }
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!pointer || pointer.id !== e.pointerId) return;
    const dx = e.clientX - pointer.x,
      dy = e.clientY - pointer.y;
    if (pointer.well >= 0) moveWell(pointer.well, dx, dy);
    else {
      state.yaw += dx * 0.006;
      state.pitch = clamp(state.pitch + dy * 0.006, -1.3, 1.3);
    }
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    dirty = true;
  });
  function endPointer(e) {
    if (pointer && pointer.id === e.pointerId) {
      pointer = null;
      canvas.style.cursor = "grab";
      if (canvas.hasPointerCapture(e.pointerId))
        canvas.releasePointerCapture(e.pointerId);
    }
  }
  canvas.addEventListener("pointerup", endPointer);
  canvas.addEventListener("pointercancel", endPointer);
  canvas.addEventListener("lostpointercapture", () => {
    pointer = null;
    canvas.style.cursor = "grab";
  });
  canvas.addEventListener(
    "wheel",
    (e) => {
      if (e.ctrlKey) return;
      e.preventDefault();
      dirty = true;
      state.zoom = clamp(state.zoom * Math.exp(-e.deltaY * 0.001), 0.5, 2.5);
    },
    { passive: false },
  );
  canvas.addEventListener("keydown", (e) => {
    if (
      ![
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "+",
        "=",
        "-",
        " ",
      ].includes(e.key)
    )
      return;
    e.preventDefault();
    dirty = true;
    if (e.key === " ") togglePlay();
    else if (e.key === "ArrowLeft") state.yaw -= 0.1;
    else if (e.key === "ArrowRight") state.yaw += 0.1;
    else if (e.key === "ArrowUp")
      state.pitch = clamp(state.pitch - 0.1, -1.3, 1.3);
    else if (e.key === "ArrowDown")
      state.pitch = clamp(state.pitch + 0.1, -1.3, 1.3);
    else state.zoom = clamp(state.zoom * (e.key === "-" ? 0.9 : 1.1), 0.5, 2.5);
  });
  document.querySelectorAll("button[data-model]").forEach((b) =>
    b.addEventListener("click", () => {
      state.model = b.dataset.model;
      initParticles();
      sync();
      updateAudio();
      announce(
        E.models[state.model].name +
          " carregado — arraste o campo para explorar.",
      );
    }),
  );
  document.querySelectorAll("[data-palette]").forEach((b) =>
    b.addEventListener("click", () => {
      state.palette = b.dataset.palette;
      sync();
    }),
  );
  for (const key of ["speed", "gravity", "trail"])
    $(key).addEventListener("input", () => {
      state[key] = Number($(key).value);
      sync();
      updateAudio();
    });
  $("play").addEventListener("click", togglePlay);
  $("reset").addEventListener("click", () => {
    Object.assign(state, structuredClone(defaults), { model: state.model });
    initParticles();
    sync();
    updateAudio();
    announce("Controles, câmera e semente restaurados.");
  });
  $("reseed").addEventListener("click", () => {
    state.seed = (state.seed + 1) % 2147483647;
    initParticles();
    announce("Nova semente: " + state.seed + ".");
  });
  $("home-view").addEventListener("click", () => {
    state.yaw = defaults.yaw;
    state.pitch = defaults.pitch;
    state.zoom = 1;
    dirty = true;
  });
  $("quality").addEventListener("change", () => {
    state.count = Number($("quality").value);
    initParticles();
    sync();
  });
  $("audio").addEventListener("click", toggleAudio);
  $("volume").addEventListener("input", () => {
    volume = Number($("volume").value);
    updateAudio();
  });
  $("capture").addEventListener("click", () => {
    snapshotRequested = true;
    draw();
  });
  $("share").addEventListener("click", async () => {
    const url = new URL(location.href);
    url.search = "";
    url.searchParams.set("s", JSON.stringify(state));
    try {
      await navigator.clipboard.writeText(url.href);
      announce(
        "Link copiado: controles, câmera, nós e semente. Não inclui o instante da simulação.",
      );
    } catch {
      history.replaceState(null, "", url);
      announce(
        "Configuração na barra de endereço. Copie o link para compartilhar.",
      );
    }
  });
  document.querySelectorAll("[data-nudge]").forEach((b) =>
    b.addEventListener("click", () => {
      const [x, y] = b.dataset.nudge.split(",").map(Number),
        i = Number($("well-select").value);
      moveWell(i, x * 20, -y * 20);
      if (state.gravity === 0) state.gravity = 0.65;
      sync();
      announce("Nó " + ["Alfa", "Beta", "Gama"][i] + " movido.");
    }),
  );
  document.addEventListener("visibilitychange", () => {
    last = 0;
    accumulator = 0;
    updateAudio();
  });
  reduceMotion.addEventListener("change", (e) => {
    if (e.matches) {
      playing = false;
      sync();
      updateAudio();
    }
  });
  window.addEventListener("pagehide", () => {
    if (audio) audio.context.suspend();
  });
  loadConfig();
  initParticles();
  sync();
  new ResizeObserver(resize).observe(canvas);
  resize();
  requestAnimationFrame(loop);
})();
