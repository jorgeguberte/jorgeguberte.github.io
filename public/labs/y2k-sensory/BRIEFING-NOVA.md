# Sensory Lab v3 — Architecture Briefing for Nova

## Your Mission
Read this doc, then propose a concrete page architecture for Sensory Lab v3. Be opinionated, specific, and think in pixels/z-indices/grid-areas, not abstract vibes. Jorge wants code after this.

## What We Know (From Research PDF)

### The v2 Was Rejected
"SaaS with dark theme and accent green." 900px centered, sections stacked like plates, nothing surprises. The chaos layer was three orbs at opacity 0.08 — invisible. VU Meters were dead ornaments showing static values. The user READ about dual-layer but never EXPERIENCED it. Zero constructionism.

### Three Design Pillars

**1. Chinese UI Density (6 named patterns)**
- Three-Layer Transparent Window (Douyin): independent z-index layers for scrolling text, particles, entrance anims
- Floating Action Layer (Taobao): persistent overlay buttons above scrollable content → position:fixed
- Danmaku Overlay (Douyin): scrolling text as transparent layer → Canvas/CSS + pointer-events:none
- Dual-Column Waterfall (Xiaohongshu): masonry grid, algorithm-driven
- Tab-Within-Tab (Taobao): nested navigation, sticky headers
- Live Social Proof Ticker: WebSocket real-time counters

Key insight: "Density signals liveness, not chaos." Western minimalism accidentally signals emptiness.

**2. Flash-Era Mechanics (8 mechanics, modern equivalents)**
- Cursor-as-Force-Field (Yugop) → Matter.js + pointer as force vector
- Cinematic Timeline (2Advanced) → GSAP Timeline
- Generative Composition (Praystation) → p5.js / Canvas API
- Desktop-as-Container (Windows 93) → 98.css + draggable windows
- Progressive Disclosure via Exploration → CSS :hover + clip-path
- Dual-Layer Parallel Interface (Yugop/MoMA) → mix-blend-mode overlays
- Parallax Depth Planes → CSS scroll-driven animations
- Spatial Map Navigation → Three.js / D3 force-directed

Fun-vs-frustration: surprise must be user-initiated and reversible. Escape hatches mandatory.

**3. Real Brutalism (not aesthetic brutalism)**
Test: "If removing ALL CSS makes the site unreadable, it's performance, not brutalism."
NOT brutalist: mono fonts chosen for aesthetic, CSS borders to look "raw", scanlines, glitch, CRT, hard drop-shadows on cards, border-radius:0 as "design token."
IS brutalist: system defaults, structure visible because never hidden, design driven by function, removing CSS = equally readable.

### Constructionist Artifact
"Sensory Profile Card": 3-6 parameter sliders → real-time visual output → URL-encoded state + PNG download. Magic: the output could not have been predicted by the designer. Possibility space exceeds pre-renderable options.

### Neurodivergent Framework
- Richness as DEFAULT, calm as OPT-IN (critical — ADHD needs structured HIGH perceptual load, not less)
- CSS custom properties (--animation-speed, --density-mode) in localStorage
- Settings panel must be the most conventional, predictable element on the page

### Audio-Visual Mapping Vocabulary
Onset→Scale, Spectral Centroid→Color, RMS→Opacity, Bass→Vertical displacement, Beat→Periodic cycle

### Anti-Pasteurization Toolkit (20 techniques)
Low: custom scrollbars, hover personality, scroll-driven anims, container queries
Medium: custom cursor, clip-path layouts, View Transitions, variable fonts animated, kinetic typography, SVG filters
High: generative backgrounds (Canvas/WebGL), spatial navigation, physics-based UI (Matter.js), 3D scenes (Three.js)

## What You Need To Answer

A. **PAGE STRUCTURE** — This is NOT a scroll-linear landing page. What IS it? A dashboard? A desktop environment? A spatial map? A DAW-like rack? A control room?

B. **3-5 PATTERNS TO IMPLEMENT FIRST** — Across ALL THREE traditions. Which patterns, exactly where on the page. Be specific: "Three-Layer Window structure for the entire page with Danmaku layer at z-index 10 showing real-time sensory telemetry" > "use layering."

C. **CONSTRUCTIONIST ARTIFACT** — What exactly does the user build? How many sliders/parameters? What's the visual output? How does URL-sharing work?

D. **FIRST MEANINGFUL INTERACTION** — User arrives → sees what? → does what first? → experiences what? Map the first 10 seconds.

E. **CSS ARCHITECTURE** — How do you achieve density without chaos? Specific z-index ranges, grid-template-areas, container queries, stacking contexts.

F. **BRUTALIST HONESTY MOMENT** — What structural element stays EXPOSED? What would still work if all CSS were removed?

G. **THE ANTI-PASTEURIZATION STATEMENT** — What specific visual decision makes someone say "this is NOT a template"?

## Constraints
- Single HTML page + CSS + JS (Vanilla or lightweight. No React framework for this page.)
- Must work in /root/nest/jorgeguberte.github.io/public/labs/y2k-sensory/ (replacing v2 files)
- Build: `cd /root/nest/jorgeguberte.github.io && npm run build` (Next.js static export, page is plain HTML)
- Fonts available: Space Grotesk, JetBrains Mono (already loaded in project)
- CSS custom properties for theming (Y2K Design System tokens available)
- Must respect prefers-reduced-motion
- Keyboard navigable, screen-reader friendly (aria-hidden on decorative layers)

## Deliverable
A concrete architecture doc (bullet points OK), not a moodboard. Think in z-indices, grid areas, and CSS custom properties. Be blunt. If something is "legalzinho" but not radical, say so. English for technical, Brazilian Portuguese slang where it fits naturally.