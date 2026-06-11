import { useEffect, useRef } from "react";

/**
 * MemoryField — the thesis, made literal.
 * A sparse graph of memory nodes. Activation pulses spread along edges,
 * nodes brighten when activated, then decay back toward darkness.
 * Calm, slow, almost imperceptible. Research-lab energy, not screensaver.
 */
export function MemoryField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Node = { x: number; y: number; a: number; r: number };
    type Edge = { i: number; j: number };
    let nodes: Node[] = [];
    let edges: Edge[] = [];

    function init() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(24, Math.floor((w * h) / 26000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        a: Math.random() * 0.15,
        r: 1 + Math.random() * 1.6,
      }));

      edges = [];
      const maxDist = Math.min(w, h) * 0.22;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (Math.hypot(dx, dy) < maxDist) edges.push({ i, j });
        }
      }
    }

    function activate() {
      // A memory fires: one node lights up, activation spreads to neighbors.
      const idx = Math.floor(Math.random() * nodes.length);
      nodes[idx].a = Math.min(1, nodes[idx].a + 0.9);
      edges.forEach((e) => {
        if (e.i === idx) nodes[e.j].a = Math.min(1, nodes[e.j].a + 0.35);
        if (e.j === idx) nodes[e.i].a = Math.min(1, nodes[e.i].a + 0.35);
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);

      // Edges: visible only when both endpoints carry activation
      edges.forEach((e) => {
        const a = Math.min(nodes[e.i].a, nodes[e.j].a);
        if (a < 0.04) return;
        ctx!.strokeStyle = `rgba(210, 164, 94, ${a * 0.22})`;
        ctx!.lineWidth = 0.6;
        ctx!.beginPath();
        ctx!.moveTo(nodes[e.i].x, nodes[e.i].y);
        ctx!.lineTo(nodes[e.j].x, nodes[e.j].y);
        ctx!.stroke();
      });

      // Nodes: warm brass when active, faint bone at rest
      nodes.forEach((n) => {
        const rest = 0.10;
        const glow = Math.max(n.a, rest);
        ctx!.fillStyle =
          n.a > 0.12
            ? `rgba(210, 164, 94, ${glow * 0.85})`
            : `rgba(168, 159, 145, ${glow * 0.5})`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r + n.a * 1.4, 0, Math.PI * 2);
        ctx!.fill();
        // Decay — the whole point.
        n.a *= 0.985;
      });

      raf = requestAnimationFrame(draw);
    }

    init();

    if (reduceMotion) {
      // Static frame: a few activated nodes, no animation.
      for (let k = 0; k < 5; k++) activate();
      edges.forEach((e) => {
        const a = Math.min(nodes[e.i].a, nodes[e.j].a);
        if (a < 0.04) return;
        ctx.strokeStyle = `rgba(210, 164, 94, ${a * 0.22})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(nodes[e.i].x, nodes[e.i].y);
        ctx.lineTo(nodes[e.j].x, nodes[e.j].y);
        ctx.stroke();
      });
      nodes.forEach((n) => {
        ctx.fillStyle = n.a > 0.12 ? `rgba(210,164,94,${n.a * 0.85})` : `rgba(168,159,145,0.06)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + n.a * 1.4, 0, Math.PI * 2);
        ctx.fill();
      });
      return;
    }

    const pulse = setInterval(activate, 1400);
    raf = requestAnimationFrame(draw);

    const onResize = () => init();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(pulse);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="memory-field" aria-hidden="true" />;
}
