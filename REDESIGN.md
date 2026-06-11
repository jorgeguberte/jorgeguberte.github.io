# JORGE GUBERTE — WEBSITE REDESIGN
### The Memory Lab: A Personal Site Built Around a Thesis

---

## 1. SITE MAP

```
jorgeguberte.com
│
├── /                      Home — "The Thesis"
├── /about                 About — "The Architect"
├── /lab                   The Lab — research programs & open questions
│   ├── /lab/loomdb        LoomDB — temporal memory architecture
│   ├── /lab/epcg          EPCG — emergent personality framework
│   └── /lab/ayvu-talian   Ayvu-Talian — low-resource language modeling
├── /systems               Systems — built, shipped, running
│   ├── /systems/pixie     Pixie — embodied AI learning companion
│   └── /systems/multiverse Multiverse — branching state management (OSS)
├── /writing               Writing — essays & research notes
│   ├── /writing/[slug]    Individual essay
│   └── /writing/notes     Shorter research notes (optional sub-feed)
├── /work-with-me          Engagements — consulting, advisory, collaboration
└── /colophon              Colophon — how this site is built (credibility easter egg)
```

**Structural logic.** The site separates *research* (`/lab`) from *systems* (`/systems`). This single decision kills the "side project collector" reading. Research programs are ongoing investigations with open questions; systems are deployed evidence that the research works. Both point back to one thesis, stated on the homepage and never repeated verbatim — only deepened.

---

## 2. NAVIGATION STRUCTURE

**Primary nav (persistent, top, left-aligned wordmark + right-aligned links):**

```
JORGE GUBERTE          Lab    Systems    Writing    About    [ Work with me ]
```

- Five items maximum. "Work with me" is the only visually distinct element (outlined button, not filled — calm, not salesy).
- Wordmark is set in the site's monospace face, lowercase: `jorge guberte`. Clicking it always returns home.
- No dropdowns. No mega-menus. Sub-pages are reached through their section index pages.
- Mobile: nav collapses to a single-line horizontal scroll, not a hamburger. Everything stays one tap away.

**Footer nav (every page):**

```
Lab          Systems        Writing        Elsewhere
LoomDB       Pixie          Latest essays  GitHub
EPCG         Multiverse     RSS            Email
Ayvu-Talian                                LinkedIn

"AI systems should retain context, adapt over time,
 and remain useful beyond a single interaction."

São Paulo, Brazil · Colophon · © Jorge Guberte
```

The thesis lives in the footer of every page. A visitor who reads nothing else still leaves with the sentence.

---

## 3. HOMEPAGE WIREFRAME

```
┌──────────────────────────────────────────────────────────┐
│ jorge guberte        Lab  Systems  Writing  About [Work] │  ← nav
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ████ HERO ██████████████████████████████████████████    │
│  Eyebrow: AI SYSTEMS ARCHITECT · INDEPENDENT RESEARCHER  │
│  H1: Thesis statement (3 lines, large serif)             │
│  Subhead: 2 sentences of grounding                       │
│  [ Read the thesis → ]   [ See the systems → ]           │
│  Background: subtle animated graph — nodes brightening   │
│  and decaying (LoomDB's activation decay, literally)     │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  ████ SECTION: THE PROBLEM (short manifesto block) ████  │
│  3 short paragraphs, max 120 words. Why memory matters.  │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  ████ SECTION: THE LAB (research programs) ████████████  │
│  Section label + 3 cards in one row:                     │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                  │
│  │ LoomDB  │  │ EPCG    │  │ Ayvu-   │                  │
│  │ memory  │  │ persona │  │ Talian  │                  │
│  └─────────┘  └─────────┘  └─────────┘                  │
│  Each card: name, one-line claim, status tag, themes     │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  ████ SECTION: THE SYSTEMS (proof) ████████████████████  │
│  Featured: PIXIE — full-width feature block, image left, │
│  narrative right. One paragraph + 3 capability bullets.  │
│  Secondary: MULTIVERSE — half-width row beneath, with    │
│  GitHub link + npm install line.                         │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  ████ SECTION: WRITING (latest 3) ██████████████████████ │
│  List, not cards: date — title — one-line dek. RSS link. │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  ████ SECTION: WORK WITH ME (single CTA band) ██████████ │
│  One paragraph + one button. Quiet, specific, confident. │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  Footer (thesis + sitemap + elsewhere)                   │
└──────────────────────────────────────────────────────────┘
```

---

## 4. HOMEPAGE COPY

### Hero

**Eyebrow:**
> AI SYSTEMS ARCHITECT · INDEPENDENT RESEARCHER · SÃO PAULO

**H1 (the thesis, set large):**
> AI systems should retain context, adapt over time, and remain useful beyond a single interaction.

**Subhead:**
> I'm Jorge Guberte. I design memory architectures, cognitive frameworks, and long-running AI systems — and I build the products that prove they work. One thesis, pursued for years, across research and production.

**CTAs:**
> `[ Read the thesis → /about ]`   `[ See the systems → /systems ]`

---

### Section: The Problem

**Label:** `01 — WHY MEMORY`

> Most AI systems are amnesiac by design. Every session starts from zero: no accumulated context, no evolving understanding of the person on the other side, no continuity of purpose. We've built remarkable reasoning engines and given them the memory of a goldfish.
>
> That's not a model problem. It's an architecture problem — and architecture is where I work.
>
> My research and systems all attack the same gap: how machines retain, structure, decay, and retrieve context over months and years, not minutes. Memory, persistence, and personality are not features to bolt on. They are the substrate.

---

### Section: The Lab

**Label:** `02 — THE LAB`
**Intro line:**
> Ongoing research programs. Each one is a different cut at the same question: what does it take for an AI system to genuinely persist?

**Card 1 — LoomDB**
> **LoomDB**
> A graph-based temporal memory architecture. Context as a living graph: activation spreads, attention decays, relevance is a function of time. Rust → WASM, runs anywhere.
> `STATUS: ACTIVE RESEARCH · PROPRIETARY`
> `themes: agent memory · retrieval · temporal graphs`

**Card 2 — EPCG**
> **EPCG**
> An emergent personality framework for AI agents, inspired by category theory. Personality as the composition of Behavior, Belief, and Biography — not a system prompt, a structure.
> `STATUS: ACTIVE RESEARCH · PROPRIETARY`
> `themes: cognitive architectures · agent identity`

**Card 3 — Ayvu-Talian**
> **Ayvu-Talian**
> Decoder-only transformers for minority language preservation. What language modeling looks like when the training corpus is a community's living memory, not the internet.
> `STATUS: ACTIVE RESEARCH · OPEN QUESTIONS`
> `themes: low-resource NLP · cultural persistence`

**Section CTA:** `[ Enter the lab → /lab ]`

---

### Section: The Systems

**Label:** `03 — THE SYSTEMS`
**Intro line:**
> Research that doesn't ship is speculation. These are the systems where the thesis runs in production.

**Featured — Pixie**
> **Pixie** — An embodied AI learning companion.
>
> Pixie talks, listens, remembers, and grows with the child using it. Built neurodivergent-first: predictable interaction patterns, sensory-considered design, and a memory that lets the companion know you on day ninety the way it couldn't on day one.
>
> - Voice-native interaction with real tool use
> - Long-term memory built on the lab's architecture research
> - Embodied presence — desktop-native, 3D, alive
>
> `STACK: Next.js · Convex · Three.js · Tauri`
> `[ Case study → /systems/pixie ]`

**Secondary — Multiverse**
> **Multiverse** — Open-source state management with Git-style branching semantics. Fork application state, explore alternate timelines, merge what works. The same thinking that drives my memory research, applied to frontend state.
> `TypeScript · MIT · [ GitHub → ]`
> `$ npm install @gubs/multiverse`

---

### Section: Writing

**Label:** `04 — WRITING`
**Intro line:**
> Essays and research notes on memory, context engineering, and the architecture of systems that last.

> *(latest three posts, list format: date — title — dek)*

**Section CTA:** `[ All writing → /writing ]` · `[ RSS ]`

---

### Section: Work With Me (CTA band)

> **I take on a small number of engagements where the memory problem is the hard problem.**
>
> If you're building agents that need to persist, retrieval that needs to mean something, or AI products that should still be useful in month six — I consult, advise, and occasionally join as a principal-level architect. I also co-founded and run engineering at a GovTech company, so I know what production actually demands.
>
> `[ Work with me → /work-with-me ]`

---

## 5. VISUAL LANGUAGE — "HIGH EDITORIAL"

The authority of a printed research journal, set for screens.

**Color.** Warm ink near-blacks (`#0c0b09` → `#383329`), bone off-whites (`#efeae2` → `#6b6254`), and a single brass accent (`#d4a55c`) used like foil-stamping — never neon, never gradient-washed. Selection color is brass. Nothing glows.

**Typography.** Three voices, strictly cast:
- **Newsreader (serif)** — ideas. Display headlines at 72–84px, italic deks, pull quotes, essay body.
- **IBM Plex Mono** — instrumentation. Kickers, tags, statuses, nav, coordinates. Always small, always letterspaced, always uppercase.
- **Inter (sans)** — supporting body text only.

**Editorial devices.**
- Roman-numeral *folio marks* (i. ii. iii.) opening each homepage section, oversized and italic in ink-600.
- Hairline rules everywhere; a fixed 1px *page frame* inset 12px around the viewport — the printed-page edge.
- Pull quotes with oversized hanging quotation marks in brass.
- Drop caps on essay first paragraphs.
- Paper-grain noise overlay at 4% opacity.
- The **MemoryField** hero canvas: a sparse node graph where activation pulses spread and decay — LoomDB's thesis, made literal, at near-subliminal opacity. Respects `prefers-reduced-motion`.

**Layout.** 12-column grid; long-form text indented to columns 3–9 like a book's text block. Cards are flat planes with hairline borders separated by 1px gaps — no shadows, no glass, no radius.

---

## 6. TONE & VOICE GUIDELINES

**Voice:** A researcher who ships. Calm, declarative, precise. Short sentences carrying long thoughts.

**Do:**
- State the thesis as fact, not aspiration. *"Memory is the substrate."*
- Use concrete mechanisms over adjectives. *"Activation spreads, attention decays."*
- Admit open problems plainly. It signals research maturity, not weakness.
- One metaphor per page, maximum, and make it load-bearing. *"A tutor with amnesia is a stranger every morning."*

**Don't:**
- "Passionate about AI." "Cutting-edge." "Revolutionizing." Banned.
- Exclamation marks. Emoji in body copy. Hype verbs.
- Apologize for proprietary work — name it and move on.
- List technologies as identity. Stack lines are metadata, set in mono, small.

---

## 7. FINAL POSITIONING STATEMENT

> **Jorge Guberte is an AI systems architect and independent researcher who has spent years on a single question: what does it take for an AI system to genuinely persist?** His lab develops memory architectures (LoomDB), persistent personality frameworks (EPCG), and language models for cultural preservation (Ayvu-Talian). His systems — Pixie, an embodied learning companion, and Multiverse, open-source branching state — prove the research in production. Co-founder and CTO of a GovTech company, he works at the layer where most AI products fail: month six, not minute one. If persistence, memory, or long-horizon behavior is core to what you're building, he is one of the few people who has been treating it as the main problem all along.
