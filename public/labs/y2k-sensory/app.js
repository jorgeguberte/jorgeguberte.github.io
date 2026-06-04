// Sensory Lab v2 — VU Meters + AttentionGuard
// Y2K Brutalism Editorial

var SENSORY_MODES = ["high-stim", "balanced", "calm"];
var STORAGE_KEY = "y2k-sensory-mode";

// --- Sensory state map ---
var SENSORY_PROFILES = {
  "high-stim": { saturation: 1.4, motion: 1.0, contrast: 1.0, noise: 0.05 },
  "balanced":  { saturation: 1.0, motion: 1.0, contrast: 1.0, noise: 0.03 },
  "calm":      { saturation: 0.3, motion: 0.0, contrast: 1.0, noise: 0    }
};

// --- VU Meter state ---
var meterState = { saturation: 1.0, motion: 1.0, contrast: 1.0 };
var meterTimers = [];

function buildMeterSegments(meterEl, count) {
  var segs = meterEl.querySelector(".meter-segments");
  segs.innerHTML = "";
  for (var i = 0; i < count; i++) {
    var seg = document.createElement("div");
    seg.className = "meter-seg";
    segs.appendChild(seg);
  }
}

function updateMeter(meterId, value) {
  var meter = document.getElementById("meter-" + meterId);
  if (!meter) return;
  var segs = meter.querySelectorAll(".meter-seg");
  var activeCount = Math.round(value * segs.length);
  var warnThreshold = Math.round(0.75 * segs.length);
  for (var i = 0; i < segs.length; i++) {
    segs[i].className = "meter-seg";
    if (i < activeCount) {
      segs[i].classList.add(i >= warnThreshold ? "meter-seg--warn" : "meter-seg--active");
    }
  }
  var valEl = document.getElementById("val-" + meterId);
  if (valEl) valEl.textContent = value.toFixed(1);
}

function animateMeterTo(meterId, from, to, duration) {
  var steps = 20;
  var stepTime = duration / steps;
  var step = 0;
  var timer = setInterval(function () {
    step++;
    var t = step / steps;
    var eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOutQuad
    updateMeter(meterId, from + (to - from) * eased);
    if (step >= steps) clearInterval(timer);
  }, stepTime);
  meterTimers.push(timer);
}

function refreshAllMeters() {
  var profile = SENSORY_PROFILES[getCurrentMode()];
  meterState = Object.assign({}, profile);
  updateMeter("saturation", profile.saturation);
  updateMeter("motion", profile.motion);
  updateMeter("contrast", profile.contrast);
}

// --- Sensory state ---
function getCurrentMode() {
  return document.documentElement.getAttribute("data-sensory") || "balanced";
}

function applySensoryMode(mode) {
  document.documentElement.setAttribute("data-sensory", mode);

  // Sync dock buttons + aria
  var dock = document.getElementById("sensory-dock");
  if (dock) {
    var btns = dock.querySelectorAll(".dock-btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle("active", btns[i].dataset.target === mode);
      btns[i].setAttribute("aria-checked", btns[i].dataset.target === mode ? "true" : "false");
    }
  }

  // Calm DOM cleanup
  applyCalmDomCleanup();

  // Animate meters
  refreshAllMeters();

  // Persist
  try { localStorage.setItem(STORAGE_KEY, mode); } catch (_) {}
}

function loadSavedMode() {
  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (_) {}
  if (saved && SENSORY_MODES.includes(saved)) return saved;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "calm";
  return "balanced";
}

// Calm mode DOM cleanup
function applyCalmDomCleanup() {
  var chaosLayer = document.querySelector(".chaos-layer");
  if (!chaosLayer) return;
  var isCalm = getCurrentMode() === "calm";
  if (isCalm) {
    chaosLayer.classList.add("chaos-layer--calm");
    var grain = chaosLayer.querySelector(".grain-overlay");
    if (grain) grain.remove();
  } else {
    chaosLayer.classList.remove("chaos-layer--calm");
    if (!chaosLayer.querySelector(".grain-overlay")) {
      var g = document.createElement("div");
      g.className = "grain-overlay";
      chaosLayer.appendChild(g);
    }
  }
}

// Toast
var toastTimer = null;
function toast(msg) {
  var el = document.querySelector(".sensory-toast");
  if (el) el.remove();
  if (toastTimer) clearTimeout(toastTimer);

  var t = document.createElement("div");
  t.className = "sensory-toast";
  t.textContent = msg;
  document.body.appendChild(t);

  requestAnimationFrame(function () { t.classList.add("sensory-toast--visible"); });
  toastTimer = setTimeout(function () {
    if (t.parentNode) { t.classList.remove("sensory-toast--visible"); setTimeout(function () { if (t.parentNode) t.remove(); }, 350); }
  }, 2200);
}

// --- INIT ---
document.addEventListener("DOMContentLoaded", function () {
  // Build meter segments
  buildMeterSegments(document.getElementById("meter-saturation"), 12);
  buildMeterSegments(document.getElementById("meter-motion"), 12);
  buildMeterSegments(document.getElementById("meter-contrast"), 12);

  // Apply saved mode
  var initialMode = loadSavedMode();
  document.documentElement.setAttribute("data-sensory", initialMode);
  applyCalmDomCleanup();

  // Sync dock
  var dock = document.getElementById("sensory-dock");
  if (dock) {
    var btns = dock.querySelectorAll(".dock-btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle("active", btns[i].dataset.target === initialMode);
      btns[i].setAttribute("aria-checked", btns[i].dataset.target === initialMode ? "true" : "false");
    }
  }

  // Initial meter state
  refreshAllMeters();

  if (initialMode !== "balanced") {
    var labels = { "high-stim": "High-Stim ativado", "calm": "Calm Mode ativado" };
    toast(labels[initialMode] || initialMode);
  }

  // --- DOCK CLICK ---
  if (dock) {
    dock.addEventListener("click", function (e) {
      var btn = e.target.closest(".dock-btn");
      if (!btn) return;
      var mode = btn.dataset.target;
      applySensoryMode(mode);

      var msgs = {
        "high-stim": "HIGH-STIM — saturação 1.4x, movimento ativo",
        "balanced":  "BALANCED — parâmetros padrão",
        "calm":      "CALM MODE — movimento zero, saturação 0.3x"
      };
      toast(msgs[mode]);
    });
  }

  // --- ANCHOR CANVAS ---
  var anchorCanvas = document.getElementById("anchor-canvas");
  var focusDot = document.getElementById("focus-dot");
  if (anchorCanvas && focusDot) {
    focusDot.style.left = "calc(50% - 0.625rem)";
    focusDot.style.top = "calc(50% - 0.625rem)";

    anchorCanvas.addEventListener("mousemove", function (e) {
      var rect = anchorCanvas.getBoundingClientRect();
      var x = e.clientX - rect.left - 10;
      var y = e.clientY - rect.top - 10;
      var maxX = rect.width - 22;
      var maxY = rect.height - 22;
      focusDot.style.left = Math.max(4, Math.min(x, maxX)) + "px";
      focusDot.style.top = Math.max(4, Math.min(y, maxY)) + "px";
    });
    anchorCanvas.addEventListener("mouseleave", function () {
      focusDot.style.left = "calc(50% - 0.625rem)";
      focusDot.style.top = "calc(50% - 0.625rem)";
    });
  }

  // --- BUTTON: INTENSITY PEAK ---
  var btnIntensity = document.getElementById("btn-intensity");
  if (btnIntensity) {
    btnIntensity.addEventListener("click", function () {
      // Flash meters
      animateMeterTo("saturation", meterState.saturation, 1.0, 200);
      animateMeterTo("motion", meterState.motion, 1.0, 200);
      animateMeterTo("contrast", meterState.contrast, 0.5, 200);
      setTimeout(function () { refreshAllMeters(); }, 600);

      // Pulse background
      document.body.style.transition = "background 0.15s ease";
      document.body.style.background = "#1a001a";
      setTimeout(function () {
        document.body.style.background = "";
        setTimeout(function () { document.body.style.transition = ""; }, 200);
      }, 150);

      toast("PICO DE ESTÍMULO — medidores respondendo");
    });
  }

  // --- BUTTON: WCAG CONTRAST ---
  var highContrast = false;
  var btnContrast = document.getElementById("btn-contrast");
  if (btnContrast) {
    btnContrast.addEventListener("click", function () {
      highContrast = !highContrast;
      if (highContrast) {
        btnContrast.classList.add("btn--active");
        document.documentElement.style.setProperty("--text-secondary", "#e0e0e0");
        document.documentElement.style.setProperty("--void-mid", "#000000");
        document.documentElement.style.setProperty("--border-subtle", "rgba(127,255,0,0.2)");
        var segs = document.querySelectorAll(".meter-seg");
        for (var i = 0; i < segs.length; i++) segs[i].style.background = segs[i].classList.contains("meter-seg--active") ? "#4db800" : "";
        updateMeter("contrast", 1.0);
        toast("CONTRASTE OTIMIZADO — WCAG 2.2 AA");
      } else {
        btnContrast.classList.remove("btn--active");
        document.documentElement.style.removeProperty("--text-secondary");
        document.documentElement.style.removeProperty("--void-mid");
        document.documentElement.style.removeProperty("--border-subtle");
        var segs = document.querySelectorAll(".meter-seg");
        for (var i = 0; i < segs.length; i++) segs[i].style.background = "";
        updateMeter("contrast", meterState.contrast);
        toast("Contraste padrão restaurado");
      }
    });
  }

  // --- BUTTON: RESET METERS ---
  var btnReset = document.getElementById("btn-reset");
  if (btnReset) {
    btnReset.addEventListener("click", function () {
      refreshAllMeters();
      toast("MEDIDORES RESETADOS");
    });
  }

  // --- OS PREFERS-REDUCED-MOTION LISTENER ---
  if (window.matchMedia) {
    window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", function (e) {
      if (e.matches) {
        applySensoryMode("calm");
        toast("OS solicitou redução de movimento — Calm ativado");
      } else {
        var saved = null;
        try { saved = localStorage.getItem(STORAGE_KEY); } catch (_) {}
        applySensoryMode(saved && SENSORY_MODES.includes(saved) ? saved : "balanced");
        toast("Modo anterior restaurado");
      }
    });
  }
});