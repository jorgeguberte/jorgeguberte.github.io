// ===========================================
// SENSORY LAB v3 — Desktop Environment
// Generative wallpaper + Profile Card + Dock
// ===========================================

(function () {
  "use strict";

  // --- DOM refs ---
  const wallpaperCanvas = document.getElementById("wallpaper");
  const wallpaperCtx = wallpaperCanvas.getContext("2d");
  const profileCanvas = document.getElementById("profile-output");
  const profileCtx = profileCanvas.getContext("2d");
  const desktop = document.getElementById("desktop");
  const danmaku = document.getElementById("danmaku");
  const dock = document.getElementById("dock");

  // --- State ---
  const params = {
    saturation: 1.0,
    motion: 0.5,
    contrast: 1.0,
    noise: 0.15,
    beat: 0.5,
    trail: 0.5,
  };

  let mouse = { x: -1000, y: -1000, active: false };
  let time = 0;
  let frameId;
  let mode = "balanced";

  // --- Resize ---
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;

    wallpaperCanvas.width = w * dpr;
    wallpaperCanvas.height = h * dpr;
    wallpaperCanvas.style.width = w + "px";
    wallpaperCanvas.style.height = h + "px";
    wallpaperCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    profileCanvas.width = profileCanvas.clientWidth * dpr;
    profileCanvas.height = profileCanvas.clientHeight * dpr;
    profileCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
window.addEventListener("resize", resize);
resize();

// --- Wallpaper: generative particle field (Praystation vibe) ---
const particles = [];
const PARTICLE_COUNT = 80;

function initParticles() {
particles.length = 0;
for (let i = 0; i < PARTICLE_COUNT; i++) {
particles.push({
  x: Math.random() * wallpaperCanvas.width / (Math.min(window.devicePixelRatio || 2, 2)),
  y: Math.random() * wallpaperCanvas.height / (Math.min(window.devicePixelRatio || 2, 2)),
  vx: (Math.random() - 0.5) * 0.5,
  vy: (Math.random() - 0.5) * 0.5,
  radius: Math.random() * 2.5 + 1,
  hue: Math.random() < 0.5 ? 90 : (Math.random() < 0.5 ? 195 : 320), // acid, cyan, pink
  phase: Math.random() * Math.PI * 2,
});
}
}
initParticles();

function drawWallpaper() {
const ctx = wallpaperCtx;
const w = wallpaperCanvas.width / (Math.min(window.devicePixelRatio || 2, 2));
const h = wallpaperCanvas.height / (Math.min(window.devicePixelRatio || 2, 2));

// Fade trail — darker = longer trail
const trailAlpha = 0.08 + params.noise * 0.15;
ctx.fillStyle = `rgba(10, 10, 15, ${trailAlpha})`;
ctx.fillRect(0, 0, w, h);

for (const p of particles) {
  // Update position
  p.x += p.vx * params.motion;
  p.y += p.vy * params.motion;

  // Wrap around
  if (p.x < -10) p.x = w + 10;
  if (p.x > w + 10) p.x = -10;
  if (p.y < -10) p.y = h + 10;
  if (p.y > h + 10) p.y = -10;

  // Cursor force-field — particles repel from mouse
  if (mouse.active) {
    const dx = p.x - mouse.x;
    const dy = p.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const forceRadius = 180 * params.trail;
    if (dist < forceRadius && dist > 0) {
      const force = (1 - dist / forceRadius) * 0.8 * params.trail;
      p.vx += (dx / dist) * force * 0.1;
      p.vy += (dy / dist) * force * 0.1;
    }
  }

  // Dampen
  p.vx *= 0.995;
  p.vy *= 0.995;

  // Draw
  const alpha = 0.3 + params.contrast * 0.2;
  const sat = params.saturation * 100;
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
  ctx.fillStyle = `hsla(${p.hue}, ${sat}%, 60%, ${alpha})`;
  ctx.fill();
}

// Beat pulse — subtle background color shift
if (params.beat > 0.3) {
  const beatPhase = Math.sin(time * 0.02) * 0.5 + 0.5;
  const beatAlpha = beatPhase * params.beat * 0.03;
  ctx.fillStyle = `rgba(127, 255, 0, ${beatAlpha})`;
  ctx.fillRect(0, 0, w, h);
}
}

// --- Danmaku: live telemetry scrolling (Chinese UI) ---
const danmakuMessages = [];
const DANMAKU_MAX = 6;

function updateDanmaku() {
const msgs = [
  `FPS: ${Math.round(60 * params.motion)}`,
  `Mouse: ${mouse.active ? Math.round(mouse.x) + "," + Math.round(mouse.y) : "idle"}`,
  `Profile: ${mode}`,
  `Saturation: ${params.saturation.toFixed(1)}`,
  `Motion: ${params.motion.toFixed(1)}`,
  `Trail: ${params.trail.toFixed(1)}`,
];

for (const msg of msgs) {
  if (danmakuMessages.find((m) => m.text === msg)) continue;
  danmakuMessages.push({
    text: msg,
    x: wallpaperCanvas.width / (Math.min(window.devicePixelRatio || 2, 2)) + Math.random() * 200,
    y: 20 + Math.random() * (wallpaperCanvas.height / (Math.min(window.devicePixelRatio || 2, 2)) - 50),
    speed: 0.5 + Math.random() * 0.8,
  });
  if (danmakuMessages.length > DANMAKU_MAX) danmakuMessages.shift();
}
}

// --- Profile Card: reactive generative output ---
const profileParticles = [];
const PROFILE_PARTICLE_COUNT = 200;

function initProfileParticles() {
profileParticles.length = 0;
const pw = profileCanvas.width / (Math.min(window.devicePixelRatio || 2, 2));
const ph = profileCanvas.height / (Math.min(window.devicePixelRatio || 2, 2));
for (let i = 0; i < PROFILE_PARTICLE_COUNT; i++) {
profileParticles.push({
  x: Math.random() * pw,
  y: Math.random() * ph,
  vx: (Math.random() - 0.5) * 2,
  vy: (Math.random() - 0.5) * 2,
  radius: Math.random() * 3 + 1,
  hue: Math.random() * 360,
  connections: [],
});
}
}

function drawProfile() {
const ctx = profileCtx;
const pw = profileCanvas.width / (Math.min(window.devicePixelRatio || 2, 2));
const ph = profileCanvas.height / (Math.min(window.devicePixelRatio || 2, 2));

// Clear with noise grain
ctx.fillStyle = `rgba(8, 8, 12, ${0.85 + params.noise * 0.1})`;
ctx.fillRect(0, 0, pw, ph);

// Noise grain
if (params.noise > 0) {
  const imageData = ctx.getImageData(0, 0, pw, ph);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    if (Math.random() < params.noise * 0.5) {
      const val = Math.random() * 30 * params.contrast;
      data[i] += val;
      data[i + 1] += val;
      data[i + 2] += val;
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

// Update and draw profile particles
for (const p of profileParticles) {
  p.x += p.vx * params.motion;
  p.y += p.vy * params.motion;
  if (p.x < 0) p.x = pw;
  if (p.x > pw) p.x = 0;
  if (p.y < 0) p.y = ph;
  if (p.y > ph) p.y = 0;

  const sat = params.saturation * 80 + 20;
  const alpha = 0.4 + params.contrast * 0.3;

  ctx.beginPath();
  ctx.arc(p.x, p.y, p.radius * params.contrast, 0, Math.PI * 2);
  ctx.fillStyle = `hsla(${p.hue}, ${sat}%, ${55 + params.contrast * 20}%, ${alpha})`;
  ctx.fill();
}
}

// --- Dock controls ---
function setMode(newMode) {
mode = newMode;
desktop.dataset.mode = mode;
document.documentElement.dataset.sensory = mode;
dock.querySelectorAll(".dock-btn[data-mode]").forEach((btn) => {
btn.classList.toggle("active", btn.dataset.mode === mode);
});
}

dock.addEventListener("click", (e) => {
const btn = e.target.closest(".dock-btn");
if (!btn) return;

if (btn.dataset.mode) {
setMode(btn.dataset.mode);
} else if (btn.id === "btn-randomize") {
randomizeParams();
} else if (btn.id === "btn-reset") {
resetParams();
}
});

// --- Parameter controls ---
function updateSliders() {
Object.keys(params).forEach((key) => {
const slider = document.getElementById("param-" + key);
if (slider) slider.value = params[key];
});
}

function randomizeParams() {
params.saturation = +(Math.random() * 2).toFixed(2);
params.motion = +(Math.random() * 2).toFixed(2);
params.contrast = +(Math.random() * 2).toFixed(2);
params.noise = +(Math.random()).toFixed(2);
params.beat = +(Math.random() * 2).toFixed(2);
params.trail = +(Math.random() * 2).toFixed(2);
updateSliders();
updateURL();
}

function resetParams() {
params.saturation = 1.0;
params.motion = 0.5;
params.contrast = 1.0;
params.noise = 0.15;
params.beat = 0.5;
params.trail = 0.5;
updateSliders();
updateURL();
}

document.querySelectorAll(".slider-row input").forEach((slider) => {
slider.addEventListener("input", () => {
const key = slider.id.replace("param-", "");
params[key] = parseFloat(slider.value);
});
slider.addEventListener("change", updateURL);
});

// --- URL state (Constructionist: shareable) ---
function urlParamsToState() {
const qs = new URLSearchParams(window.location.search);
const defaults = { s: 1, m: 0.5, c: 1, n: 0.15, b: 0.5, t: 0.5 };
const map = { s: "saturation", m: "motion", c: "contrast", n: "noise", b: "beat", t: "trail" };

let loaded = false;
for (const [key, param] of Object.entries(map)) {
const val = parseFloat(qs.get(key));
if (!isNaN(val)) {
params[param] = Math.max(0, Math.min(2, val));
loaded = true;
}
}

if (loaded) {
updateSliders();
}
}

function updateURL() {
const qs = new URLSearchParams();
const map = { saturation: "s", motion: "m", contrast: "c", noise: "n", beat: "b", trail: "t" };
for (const [param, key] of Object.entries(map)) {
qs.set(key, params[param].toFixed(2));
}
const url = window.location.pathname + "?" + qs.toString();
window.history.replaceState(null, "", url);
}

// --- Widget buttons ---
document.querySelector(".widget-capture")?.addEventListener("click", () => {
const link = document.createElement("a");
link.download = "sensory-profile-" + Date.now() + ".png";
link.href = profileCanvas.toDataURL("image/png");
link.click();
});

document.querySelector(".widget-share")?.addEventListener("click", () => {
updateURL();
navigator.clipboard.writeText(window.location.href).catch(() => {});
});

// --- Mouse tracking (force-field) ---
document.addEventListener("mousemove", (e) => {
mouse.x = e.clientX;
mouse.y = e.clientY;
mouse.active = true;
});
document.addEventListener("mouseleave", () => {
mouse.active = false;
});

// --- Touch support ---
document.addEventListener("touchmove", (e) => {
mouse.x = e.touches[0].clientX;
mouse.y = e.touches[0].clientY;
mouse.active = true;
}, { passive: true });
document.addEventListener("touchend", () => {
mouse.active = false;
});

// --- Widget dragging ---
let dragTarget = null;
let dragOffsetX = 0, dragOffsetY = 0;

desktop.addEventListener("mousedown", (e) => {
const handle = e.target.closest("[data-drag-handle]");
if (!handle) return;
const widget = handle.closest(".widget");
if (!widget) return;

dragTarget = widget;
const rect = widget.getBoundingClientRect();
dragOffsetX = e.clientX - rect.left;
dragOffsetY = e.clientY - rect.top;
widget.style.zIndex = 60;
e.preventDefault();
});

document.addEventListener("mousemove", (e) => {
if (!dragTarget) return;
dragTarget.style.left = (e.clientX - dragOffsetX) + "px";
dragTarget.style.top = (e.clientY - dragOffsetY) + "px";
});

document.addEventListener("mouseup", () => {
if (dragTarget) {
dragTarget.style.zIndex = "";
dragTarget = null;
}
});

// --- Main loop ---
function loop() {
time++;
drawWallpaper();
drawProfile();
if (time % 30 === 0 && params.motion > 0.1) updateDanmaku();
frameId = requestAnimationFrame(loop);
}

// --- Initialize ---
urlParamsToState();
randomizeParams(); // Start with randomized state — surprise on load
initProfileParticles();
resize();
loop();

// --- Keyboard shortcuts (hidden discovery) ---
document.addEventListener("keydown", (e) => {
if (e.key === "r" && e.ctrlKey) {
e.preventDefault();
randomizeParams();
} else if (e.key === "0" && e.ctrlKey) {
e.preventDefault();
resetParams();
} else if (e.key === "1" && e.ctrlKey) {
e.preventDefault();
setMode("high-stim");
} else if (e.key === "2" && e.ctrlKey) {
e.preventDefault();
setMode("balanced");
} else if (e.key === "3" && e.ctrlKey) {
e.preventDefault();
setMode("calm");
}
});

// --- Handle window resize for particles ---
let resizeTimeout;
window.addEventListener("resize", () => {
clearTimeout(resizeTimeout);
resizeTimeout = setTimeout(() => {
initParticles();
initProfileParticles();
}, 200);
});
})();