const test = require("node:test");
const assert = require("node:assert/strict");
const E = require("../public/labs/interaction/attractor/engine.js");
for (const type of Object.keys(E.models)) {
  test(`${type}: finite trajectories and deterministic seeds`, () => {
    const seeds = E.seeds(type, 32, 42);
    assert.equal(seeds.length, 32);
    assert.deepEqual(seeds, E.seeds(type, 32, 42));
    assert.notDeepEqual(seeds, E.seeds(type, 32, 43));
    for (let p of seeds.slice(0, 4)) {
      for (let i = 0; i < 1200; i++) {
        p = E.step(p, (1 / 120) * E.models[type].rate, type);
        assert(E.finite(p));
      }
    }
  });
  test(`${type}: RK4 step refinement converges`, () => {
    const p = E.seeds(type, 1)[0],
      h = 0.001;
    const integrate = (n) => {
      let q = p;
      for (let i = 0; i < n; i++) q = E.step(q, h / n, type);
      return q;
    };
    const reference = integrate(16);
    const distance = (p) => Math.hypot(...p.map((v, i) => v - reference[i]));
    assert(distance(integrate(2)) <= distance(integrate(1)) + 1e-13);
  });
}
test("gravity zero preserves original dynamics; enabled gravity perturbs it", () => {
  const p = [1, 2, 3],
    wells = [
      [2, 1, 0],
      [-2, 0, 1],
    ];
  assert.deepEqual(
    E.step(p, 0.01, "lorenz", wells, 0),
    E.step(p, 0.01, "lorenz"),
  );
  assert.notDeepEqual(
    E.step(p, 0.01, "lorenz", wells, 1),
    E.step(p, 0.01, "lorenz"),
  );
  assert(
    E.step(p, 0.01, "lorenz", [[0.085, 0.17, -1.87]], 2).every(Number.isFinite),
  );
});
test("finite check rejects overflow and non-finite coordinates on every axis", () => {
  assert.equal(E.finite([1, Infinity, 2]), false);
  assert.equal(E.finite([1, 2, NaN]), false);
  assert.equal(E.finite([201, 2, 3]), false);
});
