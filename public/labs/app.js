const experiments = [
  {
    title: "Y2K Sensory Design & Attention Lab",
    description:
      "Interactive playground showcasing our Y2K Brutalist & Neurodivergent design system. Experience the AttentionGuard dual-layer layout, real-time sensory state controls (TDAH/Autism), and micro-interaction focus anchors.",
    stage: "open",
    tags: ["design-system", "accessibility", "y2k-brutalist", "attention-guard"],
    url: "./y2k-sensory/index.html",
    linkText: "Abrir Laboratório Sensorial →"
  },
  {
    title: "Brochacho Virtual MiniDisc Player",
    description:
      "Fully interactive 3D virtual MiniDisc console. Click and drag the hardware in 3D space, hit play to slide the protective metal shutter open and spin the iridescent optical disc, and see lyrics scroll in perfect word-by-word synchronicity.",
    stage: "open",
    tags: ["WebGL", "Three.js", "Audio-Sync", "Interactive-3D"],
    url: "./y2k-sensory/minidisc-album.html",
    linkText: "Inserir MiniDisc Virtual →"
  },
  {
    title: "Y2K AI Audio-Reactive Hologram",
    description:
      "Talk to Jairo (AI Agent) via real-time speech recognition. Experience an organic 3D glassmorphic hologram orb that physically deforms, ripples, and shifts colors dynamically in perfect sync with vocal synthesis and frequency analysis.",
    stage: "open",
    tags: ["Speech-API", "WebGL", "GLSL-Shaders", "Audio-Reactive"],
    url: "./y2k-sensory/ai-hologram.html",
    linkText: "Ativar Orbe Cognitiva →"
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
      
      // Update Three.js background mode dynamically
      updateThreeSensoryMode(mode);
    });
  });
}

// ==========================================
// THREE.JS SPATIAL 3D BACKGROUND SYSTEM
// ==========================================
let scene, camera, renderer, particles, wireframeSphere;
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let rotationSpeed = 0.001;
let currentMode = "balanced";

function initThreeBackground() {
  const container = document.getElementById('canvas3d-container');
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  // 1. Scene setup
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.002);

  // 2. Camera
  camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
  camera.position.z = 250;

  // 3. Renderer with absolute transparency and high quality
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // 4. Create a 3D Particle Constellation (stars)
  const particleGeo = new THREE.BufferGeometry();
  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 800;     // X
    positions[i + 1] = (Math.random() - 0.5) * 800; // Y
    positions[i + 2] = (Math.random() - 0.5) * 800; // Z
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Particle Material using standard glowing square points
  const particleMat = new THREE.PointsMaterial({
    color: 0x00ff66, // Acid green
    size: 2.5,
    transparent: true,
    opacity: 0.4,
    sizeAttenuation: true
  });

  particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // 5. Create a slowly spinning central Wireframe Geodesic Sphere
  const sphereGeo = new THREE.IcosahedronGeometry(75, 2); // Geodesic sphere
  const sphereMat = new THREE.MeshBasicMaterial({
    color: 0x00e5ff, // Cyber cyan
    wireframe: true,
    transparent: true,
    opacity: 0.15
  });
  wireframeSphere = new THREE.Mesh(sphereGeo, sphereMat);
  scene.add(wireframeSphere);

  // 6. Track mouse movements for parallax tilting
  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
  });

  // Handle window resizing
  window.addEventListener('resize', () => {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    if (camera && renderer) {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  });

  // 7. Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    // Camera targets based on mouse position (smooth easing)
    targetX = mouseX * 0.15;
    targetY = mouseY * 0.15;

    // Smoothly ease the camera angle towards mouse target (Parallax!)
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (-targetY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    // Rotate particles and wireframe sphere
    if (particles && currentMode !== "calm") {
      particles.rotation.y += rotationSpeed;
      particles.rotation.x += rotationSpeed * 0.5;
    }
    if (wireframeSphere && currentMode !== "calm") {
      wireframeSphere.rotation.y -= rotationSpeed * 1.5;
      wireframeSphere.rotation.x += rotationSpeed * 0.8;
      
      // Let the sphere pulse gently
      const time = performance.now() * 0.001;
      const scale = 1.0 + Math.sin(time * 2.0) * 0.05;
      wireframeSphere.scale.set(scale, scale, scale);
    }

    renderer.render(scene, camera);
  }
  animate();
}

// Update the 3D canvas state based on sensory preset
function updateThreeSensoryMode(mode) {
  currentMode = mode;
  const container = document.getElementById('canvas3d-container');
  if (!container) return;

  if (mode === "high-stim") {
    // Vivid, highly kinetic pink particles with green grid
    container.style.opacity = "1";
    rotationSpeed = 0.004; // 4x faster!
    if (particles && particles.material) {
      particles.material.color.setHex(0xff0055); // Fuchsia points!
      particles.material.opacity = 0.7;
    }
    if (wireframeSphere && wireframeSphere.material) {
      wireframeSphere.material.color.setHex(0x00ff66); // Acid green grid!
      wireframeSphere.material.opacity = 0.25;
    }
  } else if (mode === "balanced") {
    // Normal, smooth cyan/green
    container.style.opacity = "1";
    rotationSpeed = 0.001;
    if (particles && particles.material) {
      particles.material.color.setHex(0x00ff66); // Acid green points
      particles.material.opacity = 0.4;
    }
    if (wireframeSphere && wireframeSphere.material) {
      wireframeSphere.material.color.setHex(0x00e5ff); // Cyber cyan grid
      wireframeSphere.material.opacity = 0.15;
    }
  } else if (mode === "calm") {
    // Autism profile: completely fade out 3D elements for a quiet background!
    container.style.opacity = "0"; // Smooth fade to black via CSS!
    rotationSpeed = 0.0; // Stop moving to save CPU
  }
}

// Auto-run Three.js setup on load
window.addEventListener('load', () => {
  initThreeBackground();
});
