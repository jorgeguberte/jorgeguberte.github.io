// Application Logic for Y2K Brutalist & Neurodivergent Sensory Lab

document.addEventListener("DOMContentLoaded", () => {
  const consoleOutput = document.getElementById("console-output");
  const sensoryDock = document.getElementById("sensory-dock");
  const focusDot = document.getElementById("focus-dot");
  const anchorCanvas = document.getElementById("anchor-canvas");
  
  // Custom buttons
  const triggerDiagnostic = document.getElementById("trigger-diagnostic");
  const btnIntensity = document.getElementById("btn-intensity");
  const btnContrast = document.getElementById("btn-contrast");
  const btnClearLogs = document.getElementById("btn-clear-logs");

  // Helper to log state changes in terminal console style
  function logDiag(message, type = "info") {
    const timestamp = new Date().toLocaleTimeString();
    let prefix = "[INFO]";
    let colorClass = "";
    
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
    
    const logItem = document.createElement("div");
    logItem.innerHTML = `<span class="text-zinc-600">${timestamp}</span> <span class="${colorClass}">${prefix} ${message}</span>`;
    consoleOutput.appendChild(logItem);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
  }

  // Clear log system
  if (btnClearLogs) {
    btnClearLogs.addEventListener("click", () => {
      consoleOutput.innerHTML = "";
      logDiag("Log de telemetria reiniciado.", "success");
    });
  }

  // 1. Sensory Dock Controller
  if (sensoryDock) {
    sensoryDock.addEventListener("click", (e) => {
      const targetBtn = e.target.closest(".dock-btn");
      if (!targetBtn) return;

      // Remove active from all and add to target
      document.querySelectorAll(".dock-btn").forEach(btn => btn.classList.remove("active"));
      targetBtn.classList.add("active");

      const mode = targetBtn.dataset.target;
      document.documentElement.setAttribute("data-sensory", mode);

      if (mode === "high-stim") {
        logDiag("Sensory preset: HIGH-STIM activated. Saturation 1.35x. Active canvas noise.", "warn");
        logDiag("TDAH Mode: Micro-animations enabled to lock wandering attention.", "info");
      } else if (mode === "balanced") {
        logDiag("Sensory preset: BALANCED mode restored. Default parameters.", "info");
      } else if (mode === "calm") {
        logDiag("Sensory preset: CALM MODE activated. Saturation 0.25x. Zero movement.", "success");
        logDiag("Autism Mode: High contrast, steady elements, zero visual noise.", "success");
      }
    });
  }

  // 2. Interactive Focus Dot (ADHD Anchor Canvas)
  if (anchorCanvas && focusDot) {
    // Initial centering
    focusDot.style.left = "calc(50% - 0.75rem)";
    focusDot.style.top = "calc(50% - 0.75rem)";

    anchorCanvas.addEventListener("mousemove", (e) => {
      const rect = anchorCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left - 12; // Adjusted for dot size
      const y = e.clientY - rect.top - 12;

      // Restrain dot to canvas bounding box
      const minX = 4;
      const minY = 4;
      const maxX = rect.width - 28;
      const maxY = rect.height - 28;

      const boundedX = Math.max(minX, Math.min(x, maxX));
      const boundedY = Math.max(minY, Math.min(y, maxY));

      focusDot.style.left = `${boundedX}px`;
      focusDot.style.top = `${boundedY}px`;
    });

    anchorCanvas.addEventListener("mouseleave", () => {
      // Return smoothly to center
      focusDot.style.left = "calc(50% - 0.75rem)";
      focusDot.style.top = "calc(50% - 0.75rem)";
    });
  }

  // 3. Simulated Actions
  if (triggerDiagnostic) {
    triggerDiagnostic.addEventListener("click", () => {
      logDiag("Iniciando varredura analítica do sistema...", "info");
      setTimeout(() => {
        const mode = document.documentElement.getAttribute("data-sensory") || "balanced";
        logDiag(`Sensory state check: ${mode.toUpperCase()} profile verified.`, "success");
        logDiag("Acessibilidade WCAG 2.2: Conforme (AA).", "success");
        logDiag("Análise de contraste: 4.85:1 (Estável).", "success");
        logDiag("Sinais e âncoras cognitivas ativas.", "success");
      }, 600);
    });
  }

  if (btnIntensity) {
    btnIntensity.addEventListener("click", () => {
      logDiag("Disparando: GRAPH_SHOCK contra o subgrafo ativo...", "warn");
      
      // Flash screen red briefly to simulate shock
      const body = document.body;
      const originalBg = body.style.backgroundColor;
      body.style.backgroundColor = "#2a020d";
      
      setTimeout(() => {
        body.style.backgroundColor = "";
        logDiag("Impacto do choque calculado. Ativação redistribuída de forma conservativa.", "success");
        logDiag("Morfismo estocástico validado: Contração estável (λ <= 1.0).", "success");
      }, 250);
    });
  }

  let highContrastActive = false;
  if (btnContrast) {
    btnContrast.addEventListener("click", () => {
      highContrastActive = !highContrastActive;
      
      if (highContrastActive) {
        document.documentElement.style.setProperty("--card-bg", "#000000");
        document.documentElement.style.setProperty("--border-color", "#00ff66");
        document.documentElement.style.setProperty("--text-secondary", "#ffffff");
        logDiag("Otimizador de contraste: Ativado. Removido efeitos translúcidos.", "success");
      } else {
        document.documentElement.style.removeProperty("--card-bg");
        document.documentElement.style.removeProperty("--border-color");
        document.documentElement.style.removeProperty("--text-secondary");
        logDiag("Otimizador de contraste: Desativado. Restabelecido efeito glassmorphism.", "info");
      }
    });
  }

  // Genesis boot logs
  logDiag("Cérebro Jairo ativado. Mapeamento de sinais pronto.", "success");
  logDiag("Acessando diretrizes de design: y2k-design-system + high-end-visual-design.", "info");
  logDiag("Use os botões de Sensory Dock para modular a intensidade.", "info");
});
