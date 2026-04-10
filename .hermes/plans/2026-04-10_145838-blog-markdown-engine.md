# Blog com Markdown — Plano de Implementação

## Contexto

Site pessoal em `jorgeguberte.github.io` já está no ar com Next.js 13 (Pages Router) + Tailwind CSS + deploy automático via GitHub Pages (static export). Jorge quer adicionar um blog que funcione escrevendo só arquivos `.md`/`.mdx`.

## Opções de Engine

### Opção A: Velite (RECOMENDADA)
- Gera TypeScript a partir de arquivos `.mdx` no build
- Tipagem automática, validação de schema (Zod)
- Rápido, moderno, mantido ativamente
- `npm install velite`
- Posts ficam em `content/posts/*.mdx`
- Gera dados estáticos que o Next.js consome direto

### Opção B: next-mdx-remote + gray-matter
- Abordagem clássica, menos abstração
- Lê arquivos `.mdx` em runtime de build com `fs`
- Frontmatter com `gray-matter`, renderização com `next-mdx-remote`
- Mais controle, mais código manual
- `npm install next-mdx-remote gray-matter`

### Opção C: Contentlayer (NÃO RECOMENDADO)
- Era a melhor opção, mas foi **descontinuado** em 2024
- Não usar

## Recomendação: Opção A (Velite)

É o melhor custo-benefício: mínimo de código, máximo de tipagem, zero runtime.

## Plano Passo a Passo

### 1. Instalar dependências
```bash
npm install velite
```

### 2. Criar configuração do Velite
**Arquivo:** `velite.config.ts`

```ts
import { defineConfig, s } from 'velite'

export default defineConfig({
  collections: {
    posts: {
      name: 'Post',
      pattern: 'posts/**/*.mdx',
      schema: s.object({
        title: s.string(),
        slug: s.string(),
        date: s.isodate(),
        description: s.string(),
        tags: s.array(s.string()).optional(),
        content: s.mdx(),
      }),
    },
  },
})
```

### 3. Criar estrutura de posts
**Diretório:** `content/posts/`

Exemplo de post (`content/posts/hello-world.mdx`):
```mdx
---
title: Hello World
slug: hello-world
date: 2026-04-10
description: My first blog post.
tags: [general]
---

# Hello World

This is my first post written in markdown.
```

### 4. Criar páginas do blog
- **`pages/blog/index.tsx`** — Lista de posts (grid com título, data, descrição)
- **`pages/blog/[slug].tsx`** — Página individual do post

### 5. Atualizar landing page
- Adicionar link "Blog" na navegação/contact

### 6. Atualizar build
- Adicionar step do Velite no `next.config.js` ou script de build
- Atualizar `package.json` scripts

### 7. Deploy
- Push automático, GitHub Actions já cuida do resto

## Arquivos que mudam

| Arquivo | Ação |
|---|---|
| `velite.config.ts` | Criar |
| `content/posts/hello-world.mdx` | Criar (exemplo) |
| `pages/blog/index.tsx` | Criar |
| `pages/blog/[slug].tsx` | Criar |
| `pages/index.tsx` | Atualizar (link blog) |
| `package.json` | Atualizar (deps, scripts) |
| `.velite/` | Gerado no build (gitignore) |

## Validação
- [ ] `npm run build` passa
- [ ] `/blog` lista os posts
- [ ] `/blog/hello-world` renderiza o post
- [ ] Deploy automático funciona

## Riscos
- Velite precisa de step extra no build (não é só `next build`)
- Next.js 13 Pages Router — compatível, mas precisa configurar certo

## Pergunta aberta
- Quer começar com a Opção A (Velite) ou prefere a Opção B (mais manual)?
