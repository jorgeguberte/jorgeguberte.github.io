import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "../styles/afterlight.module.css";

const starVertexShader = `
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  uniform float uNight;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 drift = vec3(
      sin(uTime * 0.08 + aPhase) * 0.009,
      cos(uTime * 0.11 + aPhase) * 0.012,
      0.0
    );
    vec4 viewPosition = modelViewMatrix * vec4(position + drift, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = aSize * (0.82 + 0.18 * sin(uTime * 0.9 + aPhase));
    vColor = color;
    vAlpha = uNight * (0.2 + 0.52 * (0.5 + 0.5 * sin(uTime * 0.75 + aPhase)));
  }
`;

const starFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float distanceFromCenter = length(gl_PointCoord - vec2(0.5));
    float glow = 1.0 - smoothstep(0.08, 0.5, distanceFromCenter);
    gl_FragColor = vec4(vColor, glow * vAlpha);
  }
`;

type AfterlightAtmosphereProps = {
  minute: number;
};

export function AfterlightAtmosphere({ minute }: AfterlightAtmosphereProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef(minute / 52);
  const drawStaticRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    phaseRef.current = minute / 52;
    drawStaticRef.current?.();
  }, [minute]);

  useEffect(() => {
    const host = mountRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch {
      host.dataset.fallback = "true";
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 40);
    camera.position.z = 12;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(host.clientWidth, host.clientHeight, false);
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.setAttribute("role", "presentation");
    host.appendChild(renderer.domElement);
    host.dataset.fallback = "false";

    let seed = 42173;
    const random = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };

    const particleCount = 186;
    const positions = new Float32Array(particleCount * 3);
    const horizontalPositions = new Float32Array(particleCount);
    const sizes = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);
    const duskColor = new THREE.Color("#ffd4a9");
    const nightColor = new THREE.Color("#d8e4ff");
    const blendedColor = new THREE.Color();

    for (let index = 0; index < particleCount; index += 1) {
      const offset = index * 3;
      horizontalPositions[index] = random() * 2 - 1;
      positions[offset + 1] = random() * 1.72 - 0.86;
      positions[offset + 2] = random() * 5 - 3;
      sizes[index] = 1.2 + random() * 2.6;
      phases[index] = random() * Math.PI * 2;
      blendedColor.copy(duskColor).lerp(nightColor, random() * 0.8);
      colors[offset] = blendedColor.r;
      colors[offset + 1] = blendedColor.g;
      colors[offset + 2] = blendedColor.b;
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    starGeometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const starMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uNight: { value: 0 },
      },
      vertexShader: starVertexShader,
      fragmentShader: starFragmentShader,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    stars.frustumCulled = false;
    scene.add(stars);

    const orbit = new THREE.Group();
    const ringMaterials: THREE.MeshBasicMaterial[] = [];
    const ringSpecs = [
      { radius: 0.2, rotation: [0.8, 0.2, 0] as [number, number, number], opacity: 0.45 },
      { radius: 0.255, rotation: [1.3, 0.8, 0.52] as [number, number, number], opacity: 0.26 },
      { radius: 0.31, rotation: [0.25, 0.95, -0.62] as [number, number, number], opacity: 0.2 },
    ];

    ringSpecs.forEach((ring) => {
      const material = new THREE.MeshBasicMaterial({
        color: "#ffe6c6",
        transparent: true,
        opacity: ring.opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      ringMaterials.push(material);
      const mesh = new THREE.Mesh(
        new THREE.TorusGeometry(ring.radius, 0.0022, 6, 96),
        material,
      );
      mesh.rotation.set(...ring.rotation);
      orbit.add(mesh);
    });

    const sunMaterial = new THREE.MeshBasicMaterial({
      color: "#fff0d5",
      transparent: true,
      opacity: 0.24,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sun = new THREE.Mesh(new THREE.SphereGeometry(0.112, 24, 20), sunMaterial);
    orbit.add(sun);

    const moteMaterial = new THREE.MeshBasicMaterial({
      color: "#ffc1a0",
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const mote = new THREE.Mesh(new THREE.SphereGeometry(0.014, 12, 10), moteMaterial);
    orbit.add(mote);
    scene.add(orbit);

    let width = 1;
    let height = 1;
    let aspect = 1;
    let visible = true;
    let animationFrame = 0;
    let pointerTargetX = 0;
    let pointerTargetY = 0;
    let pointerX = 0;
    let pointerY = 0;

    const resize = () => {
      width = Math.max(host.clientWidth, 1);
      height = Math.max(host.clientHeight, 1);
      aspect = width / height;
      camera.left = -aspect;
      camera.right = aspect;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();
      for (let index = 0; index < particleCount; index += 1) {
        positions[index * 3] = horizontalPositions[index] * aspect * 0.94;
      }
      starGeometry.attributes.position.needsUpdate = true;
      renderer.setSize(width, height, false);
    };

    const updateScene = (time: number, animate: boolean) => {
      const phase = phaseRef.current;
      const svgAspect = 1600 / 820;
      const cropX = Math.max(1, svgAspect / aspect);
      const cropY = Math.max(1, aspect / svgAspect);
      const sunX = (1164 / 1600) * cropX - (cropX - 1) / 2;
      const sunY = ((422 + phase * 198) / 820) * cropY - (cropY - 1) / 2;

      starMaterial.uniforms.uTime.value = time;
      starMaterial.uniforms.uNight.value = Math.max(0, Math.min(1, (phase - 0.38) * 2.4));
      orbit.visible = sunX > 0.48 && sunX < 1.14;
      orbit.position.set((sunX * 2 - 1) * aspect, 1 - sunY * 2, 0);
      orbit.rotation.set(0.42, -0.52, animate ? time * 0.055 : 0.12);
      orbit.scale.setScalar(1 + (animate ? Math.sin(time * 0.3) * 0.012 : 0));
      ringMaterials.forEach((material, index) => {
        material.opacity = ringSpecs[index].opacity * (0.94 - phase * 0.52);
      });
      sunMaterial.opacity = 0.25 * Math.max(0, 1 - phase * 1.65);
      mote.position.set(
        Math.cos(time * 0.34) * 0.32,
        Math.sin(time * 0.34) * 0.13,
        0.11,
      );
      moteMaterial.opacity = 0.72 * (0.76 + Math.sin(time * 0.9) * 0.24);

      if (animate) {
        pointerX += (pointerTargetX - pointerX) * 0.024;
        pointerY += (pointerTargetY - pointerY) * 0.024;
      } else {
        pointerX = 0;
        pointerY = 0;
      }
      camera.position.x = pointerX * 0.035;
      camera.position.y = -pointerY * 0.025;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };

    const drawStatic = () => updateScene(0, false);
    drawStaticRef.current = drawStatic;
    resize();
    drawStatic();

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionPreference.matches;
    const tick = (timestamp: number) => {
      animationFrame = 0;
      if (!visible || reducedMotion) return;
      updateScene(timestamp * 0.001, true);
      animationFrame = window.requestAnimationFrame(tick);
    };
    const start = () => {
      if (visible && !reducedMotion && !animationFrame) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };
    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      if (reducedMotion) {
        stop();
        drawStatic();
      } else {
        start();
      }
    };
    const handlePointerMove = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      if (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      ) {
        pointerTargetX = 0;
        pointerTargetY = 0;
        return;
      }
      pointerTargetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointerTargetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      drawStatic();
    });
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    resizeObserver.observe(host);
    intersectionObserver.observe(host);
    motionPreference.addEventListener("change", handleMotionPreference);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motionPreference.removeEventListener("change", handleMotionPreference);
      window.removeEventListener("pointermove", handlePointerMove);
      drawStaticRef.current = null;
      starGeometry.dispose();
      starMaterial.dispose();
      orbit.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      if (renderer.domElement.parentElement === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={styles.atmosphere} aria-hidden="true" />;
}
