// Application Logic for Y2K Brutalist & Neurodivergent Sensory Lab

// SENSORY_MODES — canonical mode list
var SENSORY_MODES = ["high-stim", "balanced", "calm"];
var STORAGE_KEY = "y2k-sensory-mode";

// Load persisted mode or default to "balanced"
function loadSavedMode() {
  // 1. Check localStorage for user preference
  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (_) {}
  if (saved && SENSORY_MODES.includes(saved)) return saved;

  // 2. Respect OS-level reduced-motion preference
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "calm";
  }

  // 3. Default
  return "balanced";
}

// Apply sensory mode to DOM + sync active button + persist
function applySensoryMode(mode) {
  document.documentElement.setAttribute("data-sensory", mode);

  // Sync dock button active state + aria-checked
  var dock = document.getElementById("sensory-dock");
  if (dock) {
    var btns = dock.querySelectorAll(".dock-btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle("active", btns[i].dataset.target === mode);
      btns[i].setAttribute("aria-checked", btns[i].dataset.target === mode ? "true" : "false");
    }
  }

  // Persist to localStorage
  try { localStorage.setItem(STORAGE_KEY, mode); } catch (_) {}
}

// Listen for OS reduced-motion changes during session
if (window.matchMedia) {
  window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", function (e) {
    if (e.matches) {
      applySensoryMode("calm");
      toastFeedback("⚠️ Sistema solicitou redução de movimento. Modo Calm ativado.");
    } else {
      var saved = null;
      try { saved = localStorage.getItem(STORAGE_KEY); } catch (_) {}
      if (saved && SENSORY_MODES.includes(saved)) {
        applySensoryMode(saved);
      } else {
        applySensoryMode("balanced");
      }
      toastFeedback("Sistema voltou ao modo anterior.");
    }
  });
}

// Toast feedback controller (Lacuna #9)
var toastTimer = null;
function toastFeedback(message) {
  var existing = document.querySelector(".sensory-toast");
  if (existing) existing.remove();
  if (toastTimer) clearTimeout(toastTimer);

  var toast = document.createElement("div");
  toast.className = "sensory-toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger enter animation
  requestAnimationFrame(function () {
    toast.classList.add("sensory-toast--visible");
  });

  // Auto-dismiss after 2.5s
  toastTimer = setTimeout(function () {
    if (toast.parentNode) {
      toast.classList.remove("sensory-toast--visible");
      setTimeout(function () { if (toast.parentNode) toast.remove(); }, 400);
    }
  }, 2500);
}

document.addEventListener("DOMContentLoaded", function () {
  var consoleOutput = document.getElementById("console-output");
  var sensoryDock = document.getElementById("sensory-dock");
  var focusDot = document.getElementById("focus-dot");
  var anchorCanvas = document.getElementById("anchor-canvas");

  var triggerDiagnostic = document.getElementById("trigger-diagnostic");
  var btnIntensity = document.getElementById("btn-intensity");
  var btnContrast = document.getElementById("btn-contrast");
  var btnClearLogs = document.getElementById("btn-clear-logs");

  // Helper to log state changes in terminal console style
  function logDiag(message, type) {
    type = type || "info";
    var timestamp = new Date().toLocaleTimeString();
    var prefix = "[INFO]";
    var colorClass = "";

    if (type === "success") {
      prefix = "[ OK ]";
      colorClass = "diag-green";
    } else if (type === "warn") {
      prefix = "[WARN]";
      colorClass = "diag-blue";
    } else if (type === "error") {
      prefix = "[FAIL]";
      colorClass = "text-red-500";
    }

    var logItem = document.createElement("div");
    logItem.innerHTML = '<span class="text-zinc-600">' + timestamp + '</span> <span class="' + colorClass + '">' + prefix + ' ' + message + '</span>';
    consoleOutput.appendChild(logItem);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
  }

  // Clear log system
  if (btnClearLogs) {
    btnClearLogs.addEventListener("click", function () {
      consoleOutput.innerHTML = "";
      logDiag("Log de telemetria reiniciado.", "success");
    });
  }

  // --- APPLY SAVED SENSORY MODE ON LOAD (Lacunas #1 + #7) ---
  (function () {
    var initialMode = loadSavedMode();
    document.documentElement.setAttribute("data-sensory", initialMode);

    // Apply Calm Mode DOM cleanup if starting in calm (Lacuna #5)
    if (initialMode === "calm") {
      applyCalmDomCleanup();
    }

    // Sync active button state
    var dock = document.getElementById("sensory-dock");
    if (dock) {
      var btns = dock.querySelectorAll(".dock-btn");
      for (var i = 0; i < btns.length; i++) {
        btns[i].classList.toggle("active", btns[i].dataset.target === initialMode);
      }
    }

    // Toast on initial load if non-default mode
    if (initialMode === "calm") {
      toastFeedback("🛡️ Calm Mode ativado — movimentos pausados, saturação reduzida. Preferência salva.");
    } else if (initialMode === "high-stim") {
      toastFeedback("⚡ High-Stim ativado — movimento sutil para ancorar atenção. Preferência salva.");
    }
  })();

  // 1. Sensory Dock Controller
  if (sensoryDock) {
    sensoryDock.addEventListener("click", function (e) {
      var targetBtn = e.target.closest(".dock-btn");
      if (!targetBtn) return;

      var mode = targetBtn.dataset.target;
      applySensoryMode(mode);

      // Lacuna #5: DOM cleanup on mode switch
      applyCalmDomCleanup();

      // Lacuna #9: Toast feedback
      if (mode === "high-stim") {
        toastFeedback("⚡ High-Stim ativado — movimento sutil para ancorar atenção.");
        logDiag("Sensory preset: HIGH-STIM activated. Saturation 1.35x. Active canvas noise.", "warn");
      } else if (mode === "balanced") {
        toastFeedback("⚖️ Balanced — parâmetros padrão restaurados.");
        logDiag("Sensory preset: BALANCED mode restored. Default parameters.", "info");
      } else if (mode === "calm") {
        toastFeedback("🛡️ Calm Mode ativado — movimentos pausados, saturação reduzida.");
        logDiag("Sensory preset: CALM MODE activated. Saturation 0.25x. Zero movement.", "success");
      }
    });
  }

  // ---- LACUNA #5: Zero Distraction DOM Cleanup ----
  function applyCalmDomCleanup() {
    var currentMode = document.documentElement.getAttribute("data-sensory");
    var chaosLayer = document.querySelector(".chaos-layer");
    if (!chaosLayer) return;

    if (currentMode === "calm") {
      // Remove noise and ticker elements from DOM entirely
      var noise = chaosLayer.querySelector(".noise-overlay");
      if (noise) noise.remove();
      var ticker = chaosLayer.querySelector(".barcode-ticker");
      if (ticker) ticker.remove();
      // Disable orb animations via class
      chaosLayer.classList.add("chaos-layer--calm");
    } else {
      // Restore elements if they were removed
      if (!chaosLayer.querySelector(".noise-overlay")) {
        var newNoise = document.createElement("div");
        newNoise.className = "noise-overlay";
        chaosLayer.appendChild(newNoise);
      }
      if (!chaosLayer.querySelector(".barcode-ticker")) {
        var newTicker = document.createElement("div");
        newTicker.className = "barcode-ticker";
        newTicker.id = "ticker-bar";
        newTicker.textContent = "SYS_STIMULUS_STREAM_OK // 0101011001 // LAT_4333_MS // STABLE_CONVERGENCE_CONTR_MAPPING";
        chaosLayer.appendChild(newTicker);
      }
      chaosLayer.classList.remove("chaos-layer--calm");
    }
  }

  // 2. Interactive Focus Dot (ADHD Anchor Canvas)
  if (anchorCanvas && focusDot) {
    focusDot.style.left = "calc(50% - 0.75rem)";
    focusDot.style.top = "calc(50% - 0.75rem)";

    anchorCanvas.addEventListener("mousemove", function (e) {
      var rect = anchorCanvas.getBoundingClientRect();
      var x = e.clientX - rect.left - 12;
      var y = e.clientY - rect.top - 12;

      var minX = 4;
      var minY = 4;
      var maxX = rect.width - 28;
      var maxY = rect.height - 28;

      var boundedX = Math.max(minX, Math.min(x, maxX));
      var boundedY = Math.max(minY, Math.min(y, maxY));

      focusDot.style.left = boundedX + "px";
      focusDot.style.top = boundedY + "px";
    });

    anchorCanvas.addEventListener("mouseleave", function () {
      focusDot.style.left = "calc(50% - 0.75rem)";
      focusDot.style.top = "calc(50% - 0.75rem)";
    });
  }

  // 3. Simulated Actions
  if (triggerDiagnostic) {
    triggerDiagnostic.addEventListener("click", function () {
      logDiag("Iniciando varredura analitica do sistema...", "info");
      setTimeout(function () {
        var mode = document.documentElement.getAttribute("data-sensory") || "balanced";
        logDiag("Sensory state check: " + mode.toUpperCase() + " profile verified.", "success");
        logDiag("Acessibilidade WCAG 2.2: Conforme (AA).", "success");
        logDiag("Analise de contraste: 4.85:1 (Estavel).", "success");
        logDiag("Sinais e ancoras sensoriais ativas.", "success");
      }, 600);
    });
  }

  if (btnIntensity) {
    btnIntensity.addEventListener("click", function () {
      logDiag("Disparando: Estimulo de alta intensidade contra a tela...", "warn");

      var body = document.body;
      var originalBg = body.style.backgroundColor;
      body.style.backgroundColor = "#2a020d";

      setTimeout(function () {
        body.style.backgroundColor = "";
        logDiag("Pico de estimulo processado. Controles de animacao respondendo.", "success");
        logDiag("Sinal de renderizacao limpo: Estabilidade de viewport confirmada.", "success");
      }, 250);
    });
  }

  var highContrastActive = false;
  if (btnContrast) {
    btnContrast.addEventListener("click", function () {
      highContrastActive = !highContrastActive;

      if (highContrastActive) {
        document.documentElement.style.setProperty("--card-bg", "#000000");
        document.documentElement.style.setProperty("--border-color", "#00ff66");
        document.documentElement.style.setProperty("--text-secondary", "#ffffff");
        logDiag("Otimizador de contraste: Ativado. Removido efeitos translucidos.", "success");
      } else {
        document.documentElement.style.removeProperty("--card-bg");
        document.documentElement.style.removeProperty("--border-color");
        document.documentElement.style.removeProperty("--text-secondary");
        logDiag("Otimizador de contraste: Desativado. Restabelecido efeito glassmorphism.", "info");
      }
    });
  }

  // Genesis boot logs
  logDiag("Motor de inferencia local ativado. Mapeamento de sinais pronto.", "success");
  logDiag("Acessando diretrizes de design: y2k-design-system.", "info");
  logDiag("Use os botoes de Sensory Dock para modular a intensidade.", "info");
});