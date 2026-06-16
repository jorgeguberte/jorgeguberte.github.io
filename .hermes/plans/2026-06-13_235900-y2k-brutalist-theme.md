# Y2K Brutalist Theme — Novo Tema para jorgeguberte.github.io

> **For Hermes:** Use subagent-driven-development para implementar task por task.

**Goal:** Criar um terceiro tema visual para o site pessoal do Jorge Guberte — que não seja o INK (editorial/elegante) nem o ACID (Y2K override), mas um tema **novo, BRUTALISTA DO ZERO**, com identidade própria, densidade visual chinesa, e personalidade forte.

**Architecture:** O tema vive como um terceiro estado no toggle de temas (atualmente INK ↔ ACID). Será um conjunto de CSS custom properties + classes utilitárias que transformam completamente o visual do site quando ativado. O tema herda tokens do Y2K Design System (em `/mnt/c/users/jorge/nest/y2k-design-system/src/tokens/`) mas reimagina a identidade visual do site — não é um "override" do editorial, é uma roupa completamente diferente.

**Tech Stack:** Next.js (Pages Router) + Tailwind CSS + CSS custom properties. Sem dependências novas.

**Branch nova:** `y2k-brutalist` (derivada de `narrative-rework`)

---
## Contexto Atual

- O site usa **Next.js Pages Router** (não App Router)
- Estilos globais em `/root/nest/jorgeguberte.github.io/styles/globals.css` (Tailwind + @theme)
- Y2K override em `styles/y2k-override.css` (classe `.y2k-active` no `<html>`)
- Toggle de temas em `components/Layout.tsx` (ThemeToggle) — lê `localStorage.theme`
- Tema default: Y2K (inline script em `_document.tsx` aplica `y2k-active` se `localStorage.theme !== 'editorial'`)
- Branch do redesign atual: `narrative-rework`
- Y2K Design System: `/mnt/c/users/jorge/nest/y2k-design-system/` com tokens de cor, tipografia, motion + dual-layer CSS + AttentionGuard

## O Que O Novo Tema Deve Ser

**Nome provisório: "CHROME"** — referência ao Y2K design system, metal, reflexo, dureza.

**Vibe:**
- Brutalista de verdade — sem cantos arredondados, sem sombras suaves, sem "elegância"
- Verde ácido (`#7fff00` / `#ccff00`) + preto absoluto (`#050508`) + branco sujo (`#e8e8f0`) + pink elétrico (`#ff00aa`) como acento secundário
- Tipografia agressiva — display em sans-serif bold (Space Grotesk ou similar), corpo em monospace (JetBrains Mono), títulos enormes
- Scanlines, noise grain, glitch, chromatic aberration — mas tudo no chaos layer (`pointer-events: none`, `aria-hidden`)
- Densidade de informação alta — nada de "respiro" vazio, cada pixel trabalhado
- Bordas grossas, 2px sólidas, sem border-radius
- Inspirado em: interface de MiniDisc player, CRTs, terminals, cyberpunk brasileiro

**Diferença do tema ACID atual:**
- ACID é um override que troca as cores do editorial (marrom→verde) mantendo a estrutura de layout elegante
- CHROME é um tema **independente** — layout diferente, tipografia diferente, densidade diferente, personalidade diferente
- ACID = "editorial de pesquisa universitária pintado de verde"
- CHROME = "terminal de computador dos anos 2000 quebrado que virou obra de arte"

## Estrutura de Arquivos

### Novos arquivos a criar:

```
styles/chrome-tokens.css           # Tokens do tema CHROME (custom properties)
styles/chrome-theme.css            # Regras de estilo do tema CHROME
components/ChromeLayout.tsx        # (opcional) Layout component específico do CHROME
```

### Arquivos a modificar:

```
components/Layout.tsx              # Adicionar terceiro estado no ThemeToggle
pages/_app.tsx                     # Importar chrome-tokens.css + chrome-theme.css
pages/_document.tsx                # Inline script reconhece 3 temas (editorial, y2k, chrome)
pages/index.tsx                    # (opcional: tweaks específicos pro CHROME)
```

### Estratégia de toggle (3 estados):

```
localStorage.theme:
  'editorial' → .theme-editorial (atual INK, marrom/bege)
  'y2k'       → .theme-y2k (atual ACID, verde ácido override)
  'chrome'    → .theme-chrome (NOVO, brutalista do zero)
```

O `<html>` recebe a classe correspondente. O inline script em `_document.tsx` precisa ser atualizado pra reconhecer os 3 temas.

---

## Task-by-Task Plan

### Task 1: Criar branch e explorar estrutura atual

**Objective:** Criar branch `y2k-brutalist` a partir de `narrative-rework`

**Files:**
- Git: branch nova

**Step 1:** Criar branch
```bash
cd /root/nest/jorgeguberte.github.io
git checkout narrative-rework
git pull origin narrative-rework  # se existir remota
git checkout -b y2k-brutalist
```

**Step 2:** Verificar se o build funciona
```bash
npm run build  # ou next build
```

---

### Task 2: Criar chrome-tokens.css

**Objective:** Definir as custom properties do tema CHROME — paleta de cores, tipografia, motion.

**Files:**
- Create: `styles/chrome-tokens.css`

**Design Tokens:**

```css
/* ===========================================
   CHROME THEME — CORE TOKENS
   Y2K Brutalism puro. Sem concessões.
   =========================================== */

:root.theme-chrome {
  /* --- Chrome Metal Palette --- */
  --chrome-bg: #050508;
  --chrome-surface: #0a0a0f;
  --chrome-elevated: #0f0f18;
  --chrome-border: #1a1a28;
  --chrome-text: #e8e8f0;
  --chrome-text-secondary: #8888a0;
  --chrome-text-muted: #484868;

  /* --- Accents --- */
  --chrome-acid: #7fff00;
  --chrome-acid-dim: #4db800;
  --chrome-pink: #ff00aa;
  --chrome-cyan: #00e5ff;
  --chrome-purple: #9b00ff;

  /* --- Typography --- */
  --chrome-font-display: 'Space Grotesk', 'Inter', system-ui, sans-serif;
  --chrome-font-mono: 'JetBrains Mono', 'IBM Plex Mono', monospace;
  --chrome-font-body: 'JetBrains Mono', 'IBM Plex Mono', monospace;

  /* --- Motion (BPM-synced, 140 BPM) --- */
  --chrome-bpm: 140;
  --chrome-beat: calc(60s / var(--chrome-bpm));
  --chrome-bar: calc(var(--chrome-beat) * 4);

  /* --- Borders --- */
  --chrome-border-width: 2px;
  --chrome-radius: 0;

  /* --- Effects --- */
  --chrome-glow-acid: 0 0 20px rgba(127, 255, 0, 0.15);
  --chrome-glow-pink: 0 0 20px rgba(255, 0, 170, 0.15);
}
```

**Step:** Criar arquivo com o conteúdo acima.

---

### Task 3: Criar chrome-theme.css

**Objective:** Regras de estilo que transformam o site quando `.theme-chrome` está ativo no `<html>`.

**Files:**
- Create: `styles/chrome-theme.css`

**Conteúdo base:**

```css
/* ===========================================
   CHROME THEME — VISUAL LAYER
   Aplica quando .theme-chrome está no <html>
   =========================================== */

/* ---- Keyframes ---- */
@keyframes chrome-flicker {
  0%, 95%, 100% { opacity: 1; }
  96% { opacity: 0.4; }
  97% { opacity: 0.9; }
  98% { opacity: 0.3; }
}

@keyframes chrome-glitch {
  0%, 90%, 100% { transform: translate(0); }
  92% { transform: translate(-2px, 1px); }
  94% { transform: translate(2px, -1px); }
  96% { transform: translate(-1px, 2px); }
}

@keyframes chrome-scan {
  0% { background-position: 0 0; }
  100% { background-position: 0 8px; }
}

/* ---- Base: Background & Text ---- */
.theme-chrome body {
  background: var(--chrome-bg) !important;
  color: var(--chrome-text) !important;
}

.theme-chrome ::selection {
  background: rgba(127, 255, 0, 0.25) !important;
  color: #e8e8f0 !important;
}

/* ---- Typography Overrides ---- */
.theme-chrome h1, .theme-chrome h2, .theme-chrome h3 {
  font-family: var(--chrome-font-display) !important;
  letter-spacing: -0.02em !important;
}

.theme-chrome .display {
  font-family: var(--chrome-font-display) !important;
  font-weight: 700 !important;
  line-height: 1.0 !important;
}

.theme-chrome .kicker {
  font-family: var(--chrome-font-mono) !important;
  color: var(--chrome-acid) !important;
}

.theme-chrome .body-text,
.theme-chrome p {
  font-family: var(--chrome-font-body) !important;
}

/* ---- Nav ---- */
.theme-chrome .nav-link {
  color: var(--chrome-text-secondary) !important;
}
.theme-chrome .nav-link:hover {
  color: var(--chrome-acid) !important;
}
.theme-chrome .nav-link-active {
  color: var(--chrome-acid) !important;
}

/* ---- Cards & Planes ---- */
.theme-chrome .plane,
.theme-chrome .y2k-card {
  border: var(--chrome-border-width) solid var(--chrome-border) !important;
  border-radius: var(--chrome-radius) !important;
  background: var(--chrome-surface) !important;
}

.theme-chrome .plane:hover,
.theme-chrome .y2k-card:hover {
  border-color: var(--chrome-acid-dim) !important;
  box-shadow: var(--chrome-glow-acid) !important;
}

/* ---- Buttons ---- */
.theme-chrome .btn-primary {
  border: var(--chrome-border-width) solid var(--chrome-acid-dim) !important;
  color: var(--chrome-acid) !important;
  background: transparent !important;
  border-radius: var(--chrome-radius) !important;
}

.theme-chrome .btn-primary:hover {
  border-color: var(--chrome-acid) !important;
  box-shadow: var(--chrome-glow-acid) !important;
}

.theme-chrome .btn-ghost {
  border: var(--chrome-border-width) solid var(--chrome-border) !important;
  color: var(--chrome-text-secondary) !important;
  border-radius: var(--chrome-radius) !important;
}

/* ---- Links ---- */
.theme-chrome .link-quiet {
  color: var(--chrome-acid-dim) !important;
}
.theme-chrome .link-quiet:hover {
  color: var(--chrome-acid) !important;
}
.theme-chrome .link-serif {
  color: var(--chrome-acid) !important;
}

/* ---- Folio (section numbers) ---- */
.theme-chrome .folio-num {
  color: var(--chrome-acid-dim) !important;
  opacity: 0.3 !important;
}
.theme-chrome .folio::after {
  background: var(--chrome-border) !important;
}

/* ---- Section Rules & Borders ---- */
.theme-chrome .section-rule {
  border-color: var(--chrome-border) !important;
}
.theme-chrome .border-ink-700 {
  border-color: var(--chrome-border) !important;
}

/* ---- Status indicator ---- */
.theme-chrome .status::before {
  background: var(--chrome-acid) !important;
}

/* ---- Decorative: Scanlines (chaos layer) ---- */
.theme-chrome .y2k-scanlines {
  opacity: 0.04 !important;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.15) 2px,
    rgba(0, 0, 0, 0.15) 4px
  ) !important;
}

/* ---- Decorative: Noise (chaos layer) ---- */
.theme-chrome .y2k-noise {
  opacity: 0.08 !important;
}

/* ---- Glitch hover effects ---- */
.theme-chrome .y2k-glitch-hover:hover {
  animation: chrome-glitch 0.3s steps(1) !important;
}

.theme-chrome .y2k-chrome:hover {
  text-shadow:
    1px 0 1px rgba(255, 0, 170, 0.4),
    -1px 0 1px rgba(0, 229, 255, 0.4) !important;
}

/* ---- Essay / Prose ---- */
.theme-chrome .essay code {
  background: var(--chrome-elevated) !important;
  color: var(--chrome-acid) !important;
  border: 1px solid var(--chrome-border) !important;
}
.theme-chrome .essay blockquote {
  border-left-color: var(--chrome-acid-dim) !important;
}

/* ---- Page frame ---- */
.theme-chrome body::after {
  border-color: rgba(127, 255, 0, 0.06) !important;
}

/* ---- Accessibility ---- */
@media (prefers-reduced-motion: reduce) {
  .theme-chrome .y2k-flicker,
  .theme-chrome .y2k-glitch-hover:hover,
  .theme-chrome .y2k-chrome:hover {
    animation: none !important;
    text-shadow: none !important;
  }
}
```

---

### Task 4: Atualizar ThemeToggle (Layout.tsx) para 3 estados

**Objective:** Modificar o componente ThemeToggle em `components/Layout.tsx` para alternar entre 3 temas: editorial, y2k, chrome.

**Files:**
- Modify: `components/Layout.tsx`

**Mudanças:**
1. Trocar `useState(true)` por `useState<'editorial' | 'y2k' | 'chrome'>('chrome')`
2. Atualizar o `useEffect` para ler o tema atual do DOM
3. No toggle, ciclar: editorial → y2k → chrome → editorial
4. Atualizar labels e classes CSS aplicadas
5. Atualizar aria-label e title

**Estratégia do toggle:**
```tsx
const themes = ['editorial', 'y2k', 'chrome'] as const;
// No toggle:
const currentIndex = themes.indexOf(theme);
const nextTheme = themes[(currentIndex + 1) % themes.length];
```

**Labels no botão:**
- editorial → mostra "INK"
- y2k → mostra "ACID" 
- chrome → mostra "CHROME"

---

### Task 5: Atualizar inline script no _document.tsx

**Objective:** Modificar o script que roda antes da hidratação para reconhecer os 3 temas.

**Files:**
- Modify: `pages/_document.tsx`

**Mudança:** O script atual só conhece 'editorial' e default (y2k). Precisa reconhecer 'chrome' como um terceiro estado, aplicando a classe `.theme-chrome`.

---

### Task 6: Atualizar _app.tsx

**Objective:** Importar os novos arquivos CSS.

**Files:**
- Modify: `pages/_app.tsx`

**Mudança:**
```tsx
import "../styles/globals.css";
import "../styles/y2k-override.css";
import "../styles/chrome-tokens.css";   // NOVO
import "../styles/chrome-theme.css";     // NOVO
```

---

### Task 7: Verificar build e testar

**Objective:** Garantir que o build passa sem erro.

**Files:**
- N/A (terminal)

**Step 1:** Rodar build
```bash
npm run build
```
Expected: exit 0, sem erros de CSS ou TypeScript.

**Step 2:** (Opcional) Rodar dev server e verificar visualmente se os 3 temas funcionam:
- INK (editorial) — marrom/bege/latão
- ACID (y2k) — verde ácido override
- CHROME (chrome) — novo tema brutalista

---

### Task 8: Commit

**Objective:** Commitar as mudanças no branch `y2k-brutalist`.

```bash
git add styles/chrome-tokens.css styles/chrome-theme.css
git add components/Layout.tsx pages/_app.tsx pages/_document.tsx
git commit -m "feat: add CHROME theme — pure Y2K brutalism, third theme state"
```

---

## Riscos e Trade-offs

1. **Complexidade do toggle:** 3 estados é mais complexo que 2. O ThemeToggle precisa ser claro visualmente sobre qual tema está ativo.
2. **Manutenção:** Cada novo tema adiciona ~200 linhas de CSS. Se a identidade visual mudar muito no futuro, pode ficar pesado manter 3 temas. Sugestão: tratar CHROME como o tema definitivo e eventualmente eliminar os outros dois.
3. **Tailwind purge:** Como as classes são aplicadas dinamicamente via CSS (!important), não afeta o purge do Tailwind. Mas classes Tailwind usadas diretamente nos componentes (ex: `text-bone-100`) vão continuar existindo — o tema CHROME sobrescreve com !important.
4. **Consistência entre páginas:** Verificar se todas as páginas (lab, systems, writing, work-with-me) renderizam corretamente com o tema CHROME.

## Verificação

- [ ] Build passa (`npm run build` → exit 0)
- [ ] Tema INK funciona (marrom/bege/latão)
- [ ] Tema ACID funciona (verde ácido override)
- [ ] Tema CHROME funciona (novo visual brutalista)
- [ ] Tema persiste entre páginas (localStorage)
- [ ] Tema persiste entre sessões (localStorage)
- [ ] Scanlines e noise grain aparecem no CHROME
- [ ] Toggle cíclico: editorial → y2k → chrome → editorial
- [ ] Labels corretas no botão: INK / ACID / CHROME