/* Numerical core: RK4 in phase space; gravity wells expressed in display space. */
(function (root) {
  "use strict";
  const models = {
    lorenz: {
      name: "Lorenz",
      subtitle: "A borboleta do caos",
      scale: 0.085,
      center: [0, 0, 25],
      rate: 0.65,
      initial: [0.1, 0, 0],
      equation: ["ẋ = 10(y − x)", "ẏ = x(28 − z) − y", "ż = xy − 8z/3"],
    },
    aizawa: {
      name: "Aizawa",
      subtitle: "Um mundo dentro de uma órbita",
      scale: 2.2,
      center: [0, 0, 0.5],
      rate: 1.2,
      initial: [0.1, 0, 0],
      equation: [
        "ẋ = (z − 0.7)x − 3.5y",
        "ẏ = 3.5x + (z − 0.7)y",
        "ż = 0.6 + 0.95z − z³/3",
        "    − (x²+y²)(1+0.25z) + 0.1zx³",
      ],
    },
    rossler: {
      name: "Rössler",
      subtitle: "Uma espiral que nunca se repete",
      scale: 0.25,
      center: [0, 0, 4],
      rate: 2,
      initial: [0.1, 0, 0],
      equation: ["ẋ = −y − z", "ẏ = x + 0.2y", "ż = 0.2 + z(x − 5.7)"],
    },
  };
  function random(seed) {
    return () => {
      let t = (seed += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function derivative(p, type, wells = [], strength = 0) {
    const [x, y, z] = p;
    let v;
    if (type === "lorenz")
      v = [10 * (y - x), x * (28 - z) - y, x * y - (8 * z) / 3];
    else if (type === "aizawa")
      v = [
        (z - 0.7) * x - 3.5 * y,
        3.5 * x + (z - 0.7) * y,
        0.6 +
          0.95 * z -
          (z * z * z) / 3 -
          (x * x + y * y) * (1 + 0.25 * z) +
          0.1 * z * x * x * x,
      ];
    else v = [-y - z, x + 0.2 * y, 0.2 + z * (x - 5.7)];
    if (strength) {
      const m = models[type];
      for (const w of wells) {
        const q = display(p, type);
        let d = q.map((a, i) => w[i] - a);
        if (type === "lorenz") d = [d[0], -d[2], d[1]];
        const force =
          (strength * 0.45) /
          Math.pow(d.reduce((s, a) => s + a * a, 0) + 0.45, 1.5);
        for (let i = 0; i < 3; i++) v[i] += (d[i] * force) / m.scale;
      }
    }
    return v;
  }
  function step(p, h, type, wells = [], strength = 0) {
    const add = (v, k, f) => v.map((x, i) => x + k[i] * f);
    const a = derivative(p, type, wells, strength),
      b = derivative(add(p, a, h / 2), type, wells, strength);
    const c = derivative(add(p, b, h / 2), type, wells, strength),
      d = derivative(add(p, c, h), type, wells, strength);
    return p.map((x, i) => x + (h * (a[i] + 2 * b[i] + 2 * c[i] + d[i])) / 6);
  }
  function seeds(type, count, seed = 1) {
    let p = [...models[type].initial];
    const rand = random(seed),
      result = [];
    for (let i = 0; i < 6000 + count * 17; i++) {
      p = step(p, 0.01, type);
      if (i >= 6000 && (i - 6000) % 17 === 0)
        result.push(p.map((x) => x + (rand() - 0.5) * 0.002));
    }
    return result;
  }
  function display(p, type) {
    const m = models[type];
    const q = p.map((x, i) => (x - m.center[i]) * m.scale);
    return type === "lorenz" ? [q[0], q[2], -q[1]] : q;
  }
  function finite(p) {
    return p.every((x) => Number.isFinite(x) && Math.abs(x) < 200);
  }
  const api = { models, random, derivative, step, seeds, display, finite };
  root.AttractorEngine = api;
  if (typeof module !== "undefined") module.exports = api;
})(globalThis);
