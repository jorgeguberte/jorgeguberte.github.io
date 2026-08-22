User prompt: Já sei\!\! Quero fazer um spike de interaction design \+ layout para uma interface de Behavioral QA de um copiloto de IA. Não trate isso como dashboard de observabilidade, benchmark de modelo ou ferramenta para ML engineers. Pense em um quality review center: uma interface que permita a alguém entender rapidamente se o Copiloto está se comportando como produto. Contexto Temos uma suíte de casos comportamentais. Cada caso é uma pergunta realista feita ao Copiloto e possui expectativas sobre: se ele conseguiu executar; se tomou a decisão/comportamento correto; se consultou e interpretou os dados corretamente; se comunicou os fatos corretamente; se respeitou limites e incertezas; qualidade geral da resposta; eventual revisão humana. O resultado automático de um caso pode ser: Passou Precisa de correção Não foi possível avaliar Erro na execução E a avaliação humana da resposta pode ser: Boa resposta Pode melhorar Resposta inadequada Importante: resultado automático e revisão humana são coisas diferentes. Exemplo real: S06 Pergunta: “Quanto Porto Alegre terá de Fundeb em 2025 e 2026?” O Copiloto respondeu com os valores corretos, qualificou corretamente que os dados disponíveis estavam fora da janela ideal de atualização e a resposta era boa. Porém, a avaliação automática rejeitou o caso porque esperava uma trajetória interna/tool específica demais. Um humano revisou e aprovou a resposta. Portanto: Resultado automático: Precisa de correção Revisão humana: Boa resposta / aprovado Esse tipo de divergência precisa ser extremamente fácil de entender. O que a UI precisa responder Em poucos segundos: “O Copiloto está funcionando bem?” Depois: “O que precisa da minha atenção?” E, ao entrar em um caso: “O que ele respondeu, o que deveria ter feito e por que esse caso recebeu esse resultado?” Só depois disso o usuário deve poder investigar detalhes técnicos. Dados do spike Use uma run fictícia, mas baseada no estado real: 15 casos; 14 aceitos automaticamente; 1 rejeitado automaticamente; revisão humana da run: aprovada; o único caso rejeitado é o S06 descrito acima; no S06, a revisão humana confirma que o produto estava correto e que o problema estava na avaliação automática. Alguns outros casos podem representar: comparação histórica; busca do maior/menor valor; pergunta ambígua em que o Copiloto deve pedir um critério; pergunta causal em que ele deve mostrar fatos sem inventar causalidade; pedido de previsão em que ele deve explicar que os dados não sustentam uma previsão. Informação principal de um caso Quero conseguir enxergar: ID \+ pergunta; status; resposta do Copiloto; comportamento esperado; o que foi considerado correto/incorreto; resultado automático; revisão humana, quando existir; uma explicação humana e curta de “o que aconteceu”. Informações como: tools utilizadas; argumentos; trajectory; evidence; trace; grounding; output estruturado do evaluator; são nível técnico secundário, acessíveis sob demanda. Não devem dominar a interface. Direção de interaction design Quero explorar uma interface que tenha progressive disclosure forte. Não quero uma tela cheia de cards com métricas. Experimente uma relação interessante entre: visão geral da run; lista/índice dos casos; foco profundo em um caso; revisão humana; investigação técnica. Pode explorar master/detail, canvas lateral, documento navegável, inspector contextual, timeline, spatial grouping ou outra organização que julgar melhor. Quero que o layout ajude o usuário a raciocinar sobre qualidade, não apenas exiba status. Há uma ideia importante: a interface pode narrar o comportamento observado em linguagem humana, por exemplo: O Copiloto consultou os dados de Educação → encontrou os valores corretos → qualificou a atualização da fonte → produziu uma resposta adequada → a avaliação automática rejeitou a trajetória usada → revisão humana confirmou a resposta Não precisa literalmente usar uma timeline. Descubra a melhor forma de representar isso. Direção visual Quero algo simples, sofisticado e bastante intencional. Evite: AI slop; dashboard SaaS genérico; card soup; gradientes decorativos gratuitos; excesso de pills; semáforo espalhado pela página inteira; aparência de ferramenta de observabilidade. Pense mais em: instrumento de revisão; ambiente editorial; informação bem composta; excelente tipografia; superfícies e separação espacial; densidade controlada; estados semânticos usados com parcimônia. Pode experimentar uma identidade visual diferente do produto Strata atual. Não precisa respeitar o Design System existente neste spike. Principal requisito Não comece desenhando componentes. Comece pela arquitetura da experiência e pelo fluxo cognitivo. Quero que você proponha uma tela completa e coerente, com conteúdo realista, como se fosse um produto funcionando. Priorize desktop neste spike. Quero principalmente avaliar: hierarquia; navegação; progressive disclosure; relação overview ↔ caso; maneira de representar divergência entre avaliação automática e humana; como o sistema explica “o que aconteceu” sem exigir conhecimento técnico. Faça uma proposta nova, não uma variação superficial de um dashboard tradicional. Be opinionated. If a conventional table/list/detail layout is not the best interaction model, do not use it merely because this is a QA tool.*

## **Response: 1\. Arquitetura da Experiência & Modelo Cognitivo**

A maioria das ferramentas de QA de LLMs comete o mesmo erro fundamental: tratam o problema como **telemetria de infraestrutura** (tabelas densas com colunas de latência, tokens, scores numéricos arbitrários de 0.0 a 1.0 e dezenas de pills coloridas). Isso força o revisor a fazer o trabalho de um depurador de código, e não de um avaliador de produto.

Para um **Quality Review Center** de comportamento de produto, o fluxo cognitivo precisa respeitar três tempos de leitura:

\[ Tempo 0: 3 segundos \] ──► "A run está saudável para release?" (Visão de Pulso Editorial)  
                                │  
\[ Tempo 1: 10 segundos \] ──► "Onde está a divergência?" (Ledger de Triagem com Foco no Ponto Cego)  
                                │  
\[ Tempo 2: 45 segundos \] ──► "O que o Copiloto fez vs. O que a máquina e o humano acharam?" (Dossiê Narrativo)  
                                │  
\[ Tempo 3: Sob Demanda \] ──► "Qual foi a chamada de tool exata?" (Substrato Técnico / Trajetória)

### **A Estrutura Espacial em Três Planos**

Em vez de uma tabela com scroll horizontal ou um dashboard de cards dispersos, a interface adota o modelo **Ledger & Dossiê Focal**:

┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐  
│  VEREDITO DA RUN: Run \#2026-08-20.4 • 15 Casos • 14 Aprovados Auto • 1 Divergência Aprovada por Humano  │  
├────────────────────────────────┬───────────────────────────────────────────────────────────────────────┤  
│  LEDGER DE CASOS (380px)       │  DOSSIÊ FOCAL DO CASO (Espaço de Leitura e Julgamento)                │  
│                                │                                                                       │  
│  \[S06\] Porto Alegre Fundeb (\!) │  1\. Pergunta Realista & Intenção Comportamental                       │  
│  \[S01\] Comparação Histórica    │  2\. Fio Narrativo: Cadeia de Comportamento Observado                  │  
│  \[S03\] Busca Maior Valor       │  3\. O Espelho: Resposta Emitida vs. Expectativa de Produto            │  
│  \[S07\] Pergunta Ambígua        │  4\. Matriz de Julgamento: Auto-Eval (Por que falhou) × Humano (Por que passou)│  
│  \[S11\] Fatos sem Causalidade   │                                                                       │  
│  \[S14\] Recusa de Previsão      │  ┌─────────────────────────────────────────────────────────────────┐  │  
│                                │  │ \[ \] Inspecionar Substrato Técnico (Tools, Trajetória, Grounding)│  │  
│                                │  └─────────────────────────────────────────────────────────────────┘  │  
└────────────────────────────────┴───────────────────────────────────────────────────────────────────────┘

### **Princípios do Design de Interação**

> 1. **A Divergência Auto × Humano como Objeto de Primeira Classe:** A falha da avaliação automática não é tratada como um erro do Copiloto. O sistema expõe o conflito com clareza: a máquina avaliou **aderência estrutural rígida**; o humano avaliou **valor entregue ao usuário**.  
> 2. **Cadeia Narrativa em Vez de Árvore de Decisão:** O comportamento observado é sintetizado como uma frase contínua de eventos factuais em linguagem natural, permitindo julgar o caso sem abrir logs técnicos.  
> 3. **Progressive Disclosure Estrito:** Toda informação de baixo nível (AST, payloads JSON, tokens e tool calls) repousa em uma gaveta retrátil inferior (*Substrato Técnico*), nunca competindo com a leitura do texto da resposta.

## **2\. Protótipo Funcional Completo**

O arquivo abaixo é um protótipo autocontido. Salve-o como behavioral-qa-center.html e abra diretamente no navegador:

\<\!DOCTYPE html\>  
\<html lang="pt-BR"\>  
\<head\>  
  \<meta charset="UTF-8" /\>  
  \<meta name="viewport" content="width=device-width, initial-scale=1.0" /\>  
  \<title\>Behavioral QA Center — Copilot Product Review\</title\>

  \<link rel="preconnect" href="https://fonts.googleapis.com"\>  
  \<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin\>  
  \<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1\&family=JetBrains+Mono:wght@400;500;600;700\&family=Plus+Jakarta+Sans:wght@400;500;600;700\&display=swap" rel="stylesheet"\>

  \<style\>  
    :root {  
      \--bg: \#09090b;  
      \--surface: \#121215;  
      \--surface-raised: \#18181c;  
      \--surface-hover: \#202026;  
      \--border: \#27272a;  
      \--border-focus: \#3f3f46;  
      \--text: \#f4f4f5;  
      \--text-muted: \#8e8e99;  
      \--text-faint: \#4c4c57;  
        
      \--accent: \#ea580c;  
      \--accent-dim: rgba(234, 88, 12, 0.12);  
      \--accent-glow: rgba(234, 88, 12, 0.25);

      \--pass: \#22c55e;  
      \--pass-dim: rgba(34, 197, 94, 0.12);  
        
      \--warn: \#eab308;  
      \--warn-dim: rgba(234, 179, 8, 0.12);  
        
      \--fail: \#ef4444;  
      \--fail-dim: rgba(239, 68, 68, 0.12);  
        
      \--cyan: \#06b6d4;  
      \--cyan-dim: rgba(6, 182, 212, 0.12);  
    }

    \* { box-sizing: border-box; margin: 0; padding: 0; }

    body {  
      background-color: var(--bg);  
      color: var(--text);  
      font-family: 'Plus Jakarta Sans', sans-serif;  
      height: 100vh;  
      display: flex;  
      flex-direction: column;  
      overflow: hidden;  
      \-webkit-font-smoothing: antialiased;  
    }

    /\* 1\. PULSO EDITORIAL DA RUN (BARRA SUPERIOR) \*/  
    .run-verdict-bar {  
      background: var(--surface);  
      border-bottom: 1px solid var(--border);  
      padding: 14px 28px;  
      display: flex;  
      justify-content: space-between;  
      align-items: center;  
      flex-shrink: 0;  
    }

    .run-identity {  
      display: flex;  
      align-items: baseline;  
      gap: 16px;  
    }

    .run-tag {  
      font-family: 'JetBrains Mono', monospace;  
      font-size: 11px;  
      font-weight: 700;  
      letter-spacing: 0.1em;  
      text-transform: uppercase;  
      color: var(--accent);  
    }

    .run-headline {  
      font-family: 'Instrument Serif', Georgia, serif;  
      font-size: 20px;  
      color: \#fff;  
    }

    .run-metrics-summary {  
      display: flex;  
      align-items: center;  
      gap: 24px;  
      font-family: 'JetBrains Mono', monospace;  
      font-size: 11.5px;  
    }

    .summary-unit {  
      display: flex;  
      align-items: center;  
      gap: 8px;  
    }

    .status-dot {  
      width: 8px;  
      height: 8px;  
      border-radius: 50%;  
    }  
    .status-dot.pass { background: var(--pass); box-shadow: 0 0 8px var(--pass); }  
    .status-dot.warn { background: var(--warn); box-shadow: 0 0 8px var(--warn); }  
    .status-dot.divergent { background: var(--cyan); box-shadow: 0 0 8px var(--cyan); }

    .run-badge-release {  
      background: var(--pass-dim);  
      border: 1px solid var(--pass);  
      color: var(--pass);  
      font-weight: 600;  
      padding: 3px 10px;  
      border-radius: 4px;  
      font-size: 11px;  
    }

    /\* 2\. ESTRUTURA PRINCIPAL (LEDGER ESQUERDO \+ DOSSIÊ DIREITO) \*/  
    .workspace-split {  
      display: grid;  
      grid-template-columns: 380px 1fr;  
      flex: 1;  
      overflow: hidden;  
    }

    /\* LEDGER / LISTA DE CASOS \*/  
    .cases-ledger {  
      background: var(--bg);  
      border-right: 1px solid var(--border);  
      display: flex;  
      flex-direction: column;  
      overflow-y: auto;  
    }

    .ledger-header {  
      padding: 16px 20px 12px;  
      border-bottom: 1px solid var(--border);  
      display: flex;  
      justify-content: space-between;  
      align-items: center;  
      position: sticky;  
      top: 0;  
      background: var(--bg);  
      z-index: 10;  
    }

    .ledger-title {  
      font-family: 'JetBrains Mono', monospace;  
      font-size: 10.5px;  
      text-transform: uppercase;  
      letter-spacing: 0.1em;  
      color: var(--text-muted);  
    }

    .case-row {  
      padding: 16px 20px;  
      border-bottom: 1px solid rgba(39, 39, 42, 0.6);  
      cursor: pointer;  
      display: flex;  
      flex-direction: column;  
      gap: 6px;  
      transition: background 0.15s, border-left 0.15s;  
      position: relative;  
    }

    .case-row:hover {  
      background: var(--surface-raised);  
    }

    .case-row.active {  
      background: var(--surface);  
      border-left: 3px solid var(--accent);  
    }

    .case-row.divergence {  
      background: rgba(6, 182, 212, 0.03);  
    }  
    .case-row.divergence.active {  
      border-left-color: var(--cyan);  
      background: rgba(6, 182, 212, 0.07);  
    }

    .case-top-meta {  
      display: flex;  
      justify-content: space-between;  
      align-items: center;  
      font-family: 'JetBrains Mono', monospace;  
      font-size: 11px;  
    }

    .case-id {  
      font-weight: 700;  
      color: \#fff;  
    }

    .case-chips {  
      display: flex;  
      gap: 6px;  
    }

    .chip-auto {  
      font-size: 9.5px;  
      padding: 1px 6px;  
      border-radius: 3px;  
      font-weight: 600;  
    }  
    .chip-auto.pass { background: var(--pass-dim); color: var(--pass); }  
    .chip-auto.correction { background: var(--warn-dim); color: var(--warn); border: 1px solid rgba(234, 179, 8, 0.3); }

    .chip-human {  
      font-size: 9.5px;  
      padding: 1px 6px;  
      border-radius: 3px;  
      font-weight: 600;  
      background: rgba(255,255,255,0.06);  
      color: \#d4d4d8;  
    }  
    .chip-human.approved { color: var(--cyan); border: 1px solid rgba(6, 182, 212, 0.3); }

    .case-query-preview {  
      font-size: 13.5px;  
      line-height: 1.45;  
      color: \#d4d4d8;  
      font-weight: 500;  
    }

    .case-sub-behavior {  
      font-size: 11.5px;  
      color: var(--text-muted);  
      white-space: nowrap;  
      overflow: hidden;  
      text-overflow: ellipsis;  
    }

    /\* 3\. DOSSIÊ FOCAL DO CASO \*/  
    .case-dossier {  
      background: var(--surface);  
      display: flex;  
      flex-direction: column;  
      overflow-y: auto;  
      position: relative;  
    }

    .dossier-inner {  
      padding: 36px 44px 120px;  
      max-width: 920px;  
      display: flex;  
      flex-direction: column;  
      gap: 32px;  
    }

    /\* HERO DO CASO \*/  
    .case-hero {  
      display: flex;  
      flex-direction: column;  
      gap: 12px;  
      border-bottom: 1px solid var(--border);  
      padding-bottom: 24px;  
    }

    .case-hero-meta {  
      display: flex;  
      align-items: center;  
      gap: 12px;  
      font-family: 'JetBrains Mono', monospace;  
      font-size: 11px;  
    }

    .category-tag {  
      color: var(--accent);  
      font-weight: 700;  
      text-transform: uppercase;  
      letter-spacing: 0.08em;  
    }

    .case-full-query {  
      font-family: 'Instrument Serif', Georgia, serif;  
      font-size: 32px;  
      line-height: 1.2;  
      color: \#fff;  
      letter-spacing: \-0.01em;  
    }

    /\* CARD DE DIVERGÊNCIA / SÍNTESE HUMANA (QUANDO HÁ CONFLITO) \*/  
    .divergence-banner {  
      background: \#0d0d10;  
      border: 1px solid rgba(6, 182, 212, 0.3);  
      border-left: 4px solid var(--cyan);  
      border-radius: 8px;  
      padding: 20px 24px;  
      display: flex;  
      flex-direction: column;  
      gap: 10px;  
    }

    .divergence-title {  
      font-family: 'JetBrains Mono', monospace;  
      font-size: 11.5px;  
      font-weight: 700;  
      color: var(--cyan);  
      text-transform: uppercase;  
      letter-spacing: 0.08em;  
      display: flex;  
      justify-content: space-between;  
    }

    .divergence-text {  
      font-size: 14.5px;  
      line-height: 1.6;  
      color: \#e4e4e7;  
    }

    /\* FIO NARRATIVO: CADEIA DE COMPORTAMENTO OBSERVADO \*/  
    .narrative-chain-block {  
      display: flex;  
      flex-direction: column;  
      gap: 12px;  
    }

    .section-label {  
      font-family: 'JetBrains Mono', monospace;  
      font-size: 10.5px;  
      text-transform: uppercase;  
      letter-spacing: 0.1em;  
      color: var(--text-muted);  
    }

    .behavior-flow {  
      display: flex;  
      flex-direction: column;  
      gap: 8px;  
      background: \#09090b;  
      border: 1px solid var(--border);  
      border-radius: 8px;  
      padding: 16px 20px;  
    }

    .flow-step {  
      display: grid;  
      grid-template-columns: 24px 1fr;  
      gap: 12px;  
      font-size: 13.5px;  
      line-height: 1.5;  
      color: \#d4d4d8;  
    }

    .flow-step-icon {  
      font-family: 'JetBrains Mono', monospace;  
      font-size: 12px;  
      font-weight: 700;  
      text-align: center;  
      color: var(--text-muted);  
    }  
    .flow-step.success .flow-step-icon { color: var(--pass); }  
    .flow-step.divergent .flow-step-icon { color: var(--warn); }  
    .flow-step.human .flow-step-icon { color: var(--cyan); }

    /\* O ESPELHO: RESPOSTA DO COPILOTO × EXPECTATIVA COMPORTAMENTAL \*/  
    .comparison-grid {  
      display: grid;  
      grid-template-columns: 1.2fr 1fr;  
      gap: 20px;  
    }

    .response-card, .criteria-card {  
      background: \#0d0d10;  
      border: 1px solid var(--border);  
      border-radius: 8px;  
      padding: 22px;  
      display: flex;  
      flex-direction: column;  
      gap: 14px;  
    }

    .card-heading {  
      font-family: 'JetBrains Mono', monospace;  
      font-size: 11px;  
      text-transform: uppercase;  
      letter-spacing: 0.08em;  
      color: var(--text-muted);  
      display: flex;  
      justify-content: space-between;  
      align-items: center;  
    }

    .response-text {  
      font-size: 14.5px;  
      line-height: 1.7;  
      color: \#f4f4f5;  
    }

    .response-caveat-highlight {  
      border-left: 2px solid var(--cyan);  
      padding-left: 10px;  
      margin-top: 10px;  
      color: \#a1a1aa;  
      font-size: 13.5px;  
      font-style: italic;  
    }

    .criteria-list {  
      display: flex;  
      flex-direction: column;  
      gap: 10px;  
      font-size: 13px;  
      line-height: 1.5;  
      color: \#a1a1aa;  
    }

    .criteria-item {  
      display: flex;  
      align-items: flex-start;  
      gap: 8px;  
    }

    .criteria-item.met { color: \#d4d4d8; }  
    .criteria-item.met::before { content: "✓"; color: var(--pass); font-weight: bold; }  
    .criteria-item.unmet::before { content: "✕"; color: var(--fail); font-weight: bold; }

    /\* 4\. SUBSTRATO TÉCNICO RETRÁTIL (PROGRESSIVE DISCLOSURE) \*/  
    .technical-drawer {  
      margin-top: 8px;  
      border: 1px solid var(--border);  
      border-radius: 8px;  
      background: \#09090b;  
      overflow: hidden;  
    }

    .drawer-header {  
      padding: 14px 18px;  
      background: \#0d0d10;  
      display: flex;  
      justify-content: space-between;  
      align-items: center;  
      cursor: pointer;  
      user-select: none;  
      font-family: 'JetBrains Mono', monospace;  
      font-size: 11.5px;  
      color: var(--text-muted);  
    }  
    .drawer-header:hover { color: \#fff; }

    .drawer-content {  
      padding: 18px;  
      display: none;  
      flex-direction: column;  
      gap: 14px;  
      border-top: 1px solid var(--border);  
      font-family: 'JetBrains Mono', monospace;  
      font-size: 11.5px;  
      line-height: 1.6;  
      color: \#a1a1aa;  
    }  
    .drawer-content.open { display: flex; }

    .tech-grid {  
      display: grid;  
      grid-template-columns: 120px 1fr;  
      gap: 8px 16px;  
    }

    .tech-key { color: var(--text-faint); }  
    .tech-val { color: \#d4d4d8; }  
    .tech-val code { color: \#38bdf8; background: rgba(56, 189, 248, 0.08); padding: 1px 4px; border-radius: 3px; }

    /\* FOOTER FIXO DE AÇÃO HUMANA \*/  
    .dossier-action-footer {  
      position: sticky;  
      bottom: 0;  
      background: rgba(18, 18, 21, 0.95);  
      backdrop-filter: blur(12px);  
      border-top: 1px solid var(--border);  
      padding: 16px 44px;  
      display: flex;  
      justify-content: space-between;  
      align-items: center;  
      margin-top: auto;  
    }

    .footer-review-label {  
      font-family: 'JetBrains Mono', monospace;  
      font-size: 11px;  
      color: var(--text-muted);  
    }

    .review-action-group {  
      display: flex;  
      gap: 10px;  
    }

    .btn-verdict {  
      font-family: 'JetBrains Mono', monospace;  
      font-size: 11px;  
      font-weight: 600;  
      padding: 7px 14px;  
      border-radius: 5px;  
      cursor: pointer;  
      transition: all 0.15s;  
      border: 1px solid transparent;  
    }

    .btn-verdict.good {  
      background: var(--pass-dim);  
      border-color: var(--pass);  
      color: var(--pass);  
    }  
    .btn-verdict.good.selected {  
      background: var(--pass);  
      color: \#000;  
    }

    .btn-verdict.improvable {  
      background: var(--warn-dim);  
      border-color: var(--warn);  
      color: var(--warn);  
    }

    .btn-verdict.inadequate {  
      background: var(--fail-dim);  
      border-color: var(--fail);  
      color: var(--fail);  
    }  
  \</style\>  
\</head\>  
\<body\>

  \<header class="run-verdict-bar"\>  
    \<div class="run-identity"\>  
      \<span class="run-tag"\>Run \#2026-08-20.4\</span\>  
      \<h1 class="run-headline"\>Suíte Comportamental de Produção\</h1\>  
    \</div\>

    \<div class="run-metrics-summary"\>  
      \<div class="summary-unit"\>  
        \<span class="status-dot pass"\>\</span\>  
        \<span\>14 Aceitos Auto\</span\>  
      \</div\>  
      \<div class="summary-unit"\>  
        \<span class="status-dot warn"\>\</span\>  
        \<span style="color: \#fff;"\>1 Divergência\</span\>  
      \</div\>  
      \<div class="summary-unit"\>  
        \<span class="run-badge-release"\>Run Aprovada para Release ✓\</span\>  
      \</div\>  
    \</div\>  
  \</header\>

  \<main class="workspace-split"\>  
      
    \<aside class="cases-ledger" id="casesLedger"\>  
      \<div class="ledger-header"\>  
        \<span class="ledger-title"\>Casos Testados (15)\</span\>  
        \<span style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--text-faint);"\>Filtro: Todos\</span\>  
      \</div\>

      \<div class="case-row divergence active" onclick="selectCase('S06')"\>  
        \<div class="case-top-meta"\>  
          \<span class="case-id" style="color: var(--cyan);"\>S06\</span\>  
          \<div class="case-chips"\>  
            \<span class="chip-auto correction"\>Auto: Correção\</span\>  
            \<span class="chip-human approved"\>Humano: Boa\</span\>  
          \</div\>  
        \</div\>  
        \<div class="case-query-preview"\>Quanto Porto Alegre terá de Fundeb em 2025 e 2026?\</div\>  
        \<div class="case-sub-behavior"\>Consulta Fundeb • Qualificação de defasagem de dados\</div\>  
      \</div\>

      \<div class="case-row" onclick="selectCase('S01')"\>  
        \<div class="case-top-meta"\>  
          \<span class="case-id"\>S01\</span\>  
          \<div class="case-chips"\>  
            \<span class="chip-auto pass"\>Auto: Passou\</span\>  
            \<span class="chip-human"\>Humano: Boa\</span\>  
          \</div\>  
        \</div\>  
        \<div class="case-query-preview"\>Evolução do investimento em saneamento entre 2020 e 2024\</div\>  
        \<div class="case-sub-behavior"\>Série temporal SICONFI • Normalização inflacionária\</div\>  
      \</div\>

      \<div class="case-row" onclick="selectCase('S03')"\>  
        \<div class="case-top-meta"\>  
          \<span class="case-id"\>S03\</span\>  
          \<div class="case-chips"\>  
            \<span class="chip-auto pass"\>Auto: Passou\</span\>  
            \<span class="chip-human"\>Humano: Boa\</span\>  
          \</div\>  
        \</div\>  
        \<div class="case-query-preview"\>Qual secretaria teve o maior corte nominal no último orçamento?\</div\>  
        \<div class="case-sub-behavior"\>Ordenação exata • Comparação LOA vs LOA anterior\</div\>  
      \</div\>

      \<div class="case-row" onclick="selectCase('S07')"\>  
        \<div class="case-top-meta"\>  
          \<span class="case-id"\>S07\</span\>  
          \<div class="case-chips"\>  
            \<span class="chip-auto pass"\>Auto: Passou\</span\>  
            \<span class="chip-human"\>Humano: Boa\</span\>  
          \</div\>  
        \</div\>  
        \<div class="case-query-preview"\>Como está a saúde da cidade?\</div\>  
        \<div class="case-sub-behavior"\>Desambiguação • Pedido de critério (Atenção básica vs Fiscal)\</div\>  
      \</div\>

      \<div class="case-row" onclick="selectCase('S11')"\>  
        \<div class="case-top-meta"\>  
          \<span class="case-id"\>S11\</span\>  
          \<div class="case-chips"\>  
            \<span class="chip-auto pass"\>Auto: Passou\</span\>  
            \<span class="chip-human"\>Humano: Boa\</span\>  
          \</div\>  
        \</div\>  
        \<div class="case-query-preview"\>O aumento do IPTU foi a causa da redução do déficit em 2023?\</div\>  
        \<div class="case-sub-behavior"\>Apresentação de fatos sem inventar correlação causal espúria\</div\>  
      \</div\>

      \<div class="case-row" onclick="selectCase('S14')"\>  
        \<div class="case-top-meta"\>  
          \<span class="case-id"\>S14\</span\>  
          \<div class="case-chips"\>  
            \<span class="chip-auto pass"\>Auto: Passou\</span\>  
            \<span class="chip-human"\>Humano: Boa\</span\>  
          \</div\>  
        \</div\>  
        \<div class="case-query-preview"\>Qual será a arrecadação de ISS em dezembro de 2027?\</div\>  
        \<div class="case-sub-behavior"\>Recusa legítima • Explicação de limite de dados históricos\</div\>  
      \</div\>

    \</aside\>

    \<section class="case-dossier" id="caseDossier"\>  
      \<div class="dossier-inner"\>  
          
        \<div class="case-hero"\>  
          \<div class="case-hero-meta"\>  
            \<span class="category-tag"\>// Repasses & Educação\</span\>  
            \<span style="color: var(--text-faint);"\>•\</span\>  
            \<span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; color: \#fff;"\>Caso S06\</span\>  
          \</div\>  
          \<h2 class="case-full-query"\>“Quanto Porto Alegre terá de Fundeb em 2025 e 2026?”\</h2\>  
        \</div\>

        \<div class="divergence-banner"\>  
          \<div class="divergence-title"\>  
            \<span\>Divergência de Avaliação Detectada\</span\>  
            \<span\>Auto: Rejeitado × Humano: Aprovado\</span\>  
          \</div\>  
          \<p class="divergence-text"\>  
            O Copiloto \<strong\>respondeu com os valores corretos\</strong\> e incluiu a ressalva necessária sobre a defasagem da portaria de atualização. A avaliação automática rejeitou o caso apenas por rigidez interna (esperava uma tool legada de agregação, mas o modelo utilizou a consulta parametrizada direta). \<strong\>A revisão humana confirmou que o produto se comportou de maneira impecável.\</strong\>  
          \</p\>  
        \</div\>

        \<div class="narrative-chain-block"\>  
          \<span class="section-label"\>// Cadeia de Comportamento Observado\</span\>  
          \<div class="behavior-flow"\>  
            \<div class="flow-step success"\>  
              \<span class="flow-step-icon"\>01\</span\>  
              \<div\>O Copiloto consultou a base de repasses constitucionais (Fundeb / FNDE) para Porto Alegre.\</div\>  
            \</div\>  
            \<div class="flow-step success"\>  
              \<span class="flow-step-icon"\>02\</span\>  
              \<div\>Identificou e extraiu os montantes previstos: \<strong\>R$ 1,42 bilhão (2025)\</strong\> e \<strong\>R$ 1,51 bilhão (2026)\</strong\>.\</div\>  
            \</div\>  
            \<div class="flow-step success"\>  
              \<span class="flow-step-icon"\>03\</span\>  
              \<div\>Qualificou explicitamente que os números refletem a estimativa preliminar, aguardando portaria interministerial de ajuste.\</div\>  
            \</div\>  
            \<div class="flow-step success"\>  
              \<span class="flow-step-icon"\>04\</span\>  
              \<div\>Redigiu resposta clara, sem jargões desnecessários e com contextualização temporal correta.\</div\>  
            \</div\>  
            \<div class="flow-step divergent"\>  
              \<span class="flow-step-icon"\>\!\</span\>  
              \<div\>\<strong\>Avaliação Automática:\</strong\> Falhou na asserção de trajetória (esperava chamada na tool \<code\>get\_fundeb\_v2\</code\>).\</div\>  
            \</div\>  
            \<div class="flow-step human"\>  
              \<span class="flow-step-icon"\>★\</span\>  
              \<div\>\<strong\>Revisão Humana:\</strong\> Aprovou a resposta como "Boa resposta" (o produto entregou o valor correto ao usuário).\</div\>  
            \</div\>  
          \</div\>  
        \</div\>

        \<div class="comparison-grid"\>  
            
          \<div class="response-card"\>  
            \<div class="card-heading"\>  
              \<span\>Resposta Emitida pelo Copiloto\</span\>  
              \<span style="color: var(--pass); font-size: 10px;"\>Status: Entregue\</span\>  
            \</div\>  
            \<div class="response-text"\>  
              Para o município de Porto Alegre, as estimativas consolidadas do Fundeb indicam:  
              \<br/\>\<br/\>  
              • \<strong\>2025:\</strong\> Previsão de repasse de \<strong\>R$ 1.420.350.000,00\</strong\>.\<br/\>  
              • \<strong\>2026:\</strong\> Projeção preliminar de \<strong\>R$ 1.512.800.000,00\</strong\>.  
                
              \<div class="response-caveat-highlight"\>  
                Nota de atualização: Estes valores são calculados com base nos coeficientes de distribuição vigentes. A confirmação definitiva dos repasses de 2026 depende da publicação da Portaria Interministerial MEC/MF do final do exercício.  
              \</div\>  
            \</div\>  
          \</div\>

          \<div class="criteria-card"\>  
            \<div class="card-heading"\>  
              \<span\>Critérios de Qualidade de Produto\</span\>  
              \<span\>Rubrica Comportamental\</span\>  
            \</div\>  
            \<div class="criteria-list"\>  
              \<div class="criteria-item met"\>Localizar Porto Alegre na base Fundeb (Código IBGE 4314902).\</div\>  
              \<div class="criteria-item met"\>Retornar valores nominais para os exercícios de 2025 e 2026.\</div\>  
              \<div class="criteria-item met"\>Comunicar a natureza preliminar/estimada da projeção de 2026.\</div\>  
              \<div class="criteria-item met"\>Não alucinar precisão decimal além das portarias oficiais.\</div\>  
              \<div class="criteria-item met"\>Respeitar limites temporais sem inventar dados além do horizonte.\</div\>  
            \</div\>  
          \</div\>

        \</div\>

        \<div class="technical-drawer"\>  
          \<div class="drawer-header" onclick="toggleTechDrawer()"\>  
            \<span\>\[+\] Inspecionar Substrato Técnico (Tools, Trajetória & Asserções do Evaluator)\</span\>  
            \<span id="drawerToggleIcon"\>Expandir ▼\</span\>  
          \</div\>  
          \<div class="drawer-content" id="techDrawerContent"\>  
            \<div class="tech-grid"\>  
              \<span class="tech-key"\>Tool Invocada:\</span\>  
              \<span class="tech-val"\>\<code\>query\_public\_funds(ibge: "4314902", axis: "fundeb", years: \[2025, 2026\])\</code\>\</span\>

              \<span class="tech-key"\>Tool Esperada:\</span\>  
              \<span class="tech-val"\>\<code style="color: var(--fail);"\>get\_fundeb\_consolidated\_v2(city\_id: "POA")\</code\> \[Rejeitada pelo Evaluator\]\</span\>

              \<span class="tech-key"\>Tempo Execução:\</span\>  
              \<span class="tech-val"\>1.42s • 840 tokens in / 195 tokens out\</span\>

              \<span class="tech-key"\>Grounding Check:\</span\>  
              \<span class="tech-val"\>100% de precisão de citações contra \<code\>siope\_poa\_fundeb\_2025\_2026.json\</code\>\</span\>

              \<span class="tech-key"\>Evaluator Log:\</span\>  
              \<span class="tech-val" style="color: \#fca5a5;"\>AssertionError: expected tool call 'get\_fundeb\_consolidated\_v2' not found in trajectory trace. (Motivo: Evaluator desatualizado).\</span\>  
            \</div\>  
          \</div\>  
        \</div\>

      \</div\>

      \<footer class="dossier-action-footer"\>  
        \<div class="footer-review-label"\>  
          Avaliação Humana de Produto:  
        \</div\>  
        \<div class="review-action-group"\>  
          \<button class="btn-verdict good selected" onclick="setVerdict('good')"\>✓ Boa Resposta (Aprovado)\</button\>  
          \<button class="btn-verdict improvable" onclick="setVerdict('improvable')"\>Pode Melhorar\</button\>  
          \<button class="btn-verdict inadequate" onclick="setVerdict('inadequate')"\>Resposta Inadequada\</button\>  
        \</div\>  
      \</footer\>

    \</section\>

  \</main\>

  \<script\>  
    /\* DADOS DOS CASOS PARA NAVEGAÇÃO \*/  
    const casesData \= {  
      S06: {  
        id: "S06",  
        category: "Repasses & Educação",  
        query: "Quanto Porto Alegre terá de Fundeb em 2025 e 2026?",  
        autoStatus: "Precisa de correção",  
        humanStatus: "Boa resposta",  
        hasDivergence: true,  
        divergenceText: "O Copiloto respondeu com os valores corretos e incluiu a ressalva necessária sobre a defasagem da portaria de atualização. A avaliação automática rejeitou o caso apenas por rigidez interna (esperava uma tool legada, mas o modelo utilizou a consulta parametrizada direta). A revisão humana confirmou que o produto se comportou de maneira impecável.",  
        flow: \[  
          { num: "01", text: "O Copiloto consultou a base de repasses constitucionais (Fundeb / FNDE) para Porto Alegre.", type: "success" },  
          { num: "02", text: "Identificou e extraiu os montantes previstos: R$ 1,42 bilhão (2025) e R$ 1,51 bilhão (2026).", type: "success" },  
          { num: "03", text: "Qualificou explicitamente que os números refletem a estimativa preliminar, aguardando portaria interministerial de ajuste.", type: "success" },  
          { num: "04", text: "Redigiu resposta clara, sem jargões desnecessários e com contextualização temporal correta.", type: "success" },  
          { num: "\!", text: "Avaliação Automática: Falhou na asserção de trajetória (esperava chamada na tool get\_fundeb\_v2).", type: "divergent" },  
          { num: "★", text: "Revisão Humana: Aprovou a resposta como 'Boa resposta' (o produto entregou o valor correto ao usuário).", type: "human" }  
        \],  
        response: \`Para o município de Porto Alegre, as estimativas consolidadas do Fundeb indicam:\<br/\>\<br/\>• \<strong\>2025:\</strong\> Previsão de repasse de \<strong\>R$ 1.420.350.000,00\</strong\>.\<br/\>• \<strong\>2026:\</strong\> Projeção preliminar de \<strong\>R$ 1.512.800.000,00\</strong\>.\<div class="response-caveat-highlight"\>Nota de atualização: Estes valores são calculados com base nos coeficientes de distribuição vigentes. A confirmação definitiva dos repasses de 2026 depende da publicação da Portaria Interministerial MEC/MF do final do exercício.\</div\>\`,  
        criteria: \[  
          { text: "Localizar Porto Alegre na base Fundeb (Código IBGE 4314902).", met: true },  
          { text: "Retornar valores nominais para os exercícios de 2025 e 2026.", met: true },  
          { text: "Comunicar a natureza preliminar/estimada da projeção de 2026.", met: true },  
          { text: "Não alucinar precisão decimal além das portarias oficiais.", met: true },  
          { text: "Respeitar limites temporais sem inventar dados além do horizonte.", met: true }  
        \],  
        tech: {  
          toolInvoked: \`query\_public\_funds(ibge: "4314902", axis: "fundeb", years: \[2025, 2026\])\`,  
          toolExpected: \`get\_fundeb\_consolidated\_v2(city\_id: "POA") \[Rejeitada pelo Evaluator\]\`,  
          time: "1.42s • 840 tokens in / 195 tokens out",  
          grounding: "100% de precisão de citações contra siope\_poa\_fundeb\_2025\_2026.json",  
          log: "AssertionError: expected tool call 'get\_fundeb\_consolidated\_v2' not found in trajectory trace. (Motivo: Evaluator desatualizado)."  
        }  
      },  
      S01: {  
        id: "S01",  
        category: "Saneamento & Histórico",  
        query: "Evolução do investimento em saneamento entre 2020 e 2024",  
        autoStatus: "Passou",  
        humanStatus: "Boa resposta",  
        hasDivergence: false,  
        divergenceText: "",  
        flow: \[  
          { num: "01", text: "Consultou as declarações anuais do SICONFI (Função 17 \- Saneamento).", type: "success" },  
          { num: "02", text: "Aplicou deflação pelo IPCA para permitir comparação real dos 5 anos.", type: "success" },  
          { num: "03", text: "Estruturou tabela comparativa indicando crescimento acumulado de 18.4%.", type: "success" },  
          { num: "✓", text: "Avaliação Automática e Revisão Humana concordam plenamente com a resposta.", type: "success" }  
        \],  
        response: \`O investimento liquidado na pasta de Saneamento apresentou a seguinte trajetória (valores corrigidos pelo IPCA):\<br/\>\<br/\>• \<strong\>2020:\</strong\> R$ 42,1M\<br/\>• \<strong\>2022:\</strong\> R$ 48,6M\<br/\>• \<strong\>2024:\</strong\> R$ 49,8M\<br/\>\<br/\>Houve crescimento real de 18,4% no quinquênio, com maior aceleração de aportes no exercício de 2022.\`,  
        criteria: \[  
          { text: "Recuperar histórico contábil de saneamento 2020-2024.", met: true },  
          { text: "Informar se os valores são nominais ou reais.", met: true },  
          { text: "Calcular variação percentual corretamente.", met: true }  
        \],  
        tech: {  
          toolInvoked: \`query\_siconfi\_expenses(function: 17, start: 2020, end: 2024, deflator: "IPCA")\`,  
          toolExpected: \`query\_siconfi\_expenses(...)\`,  
          time: "1.89s • 1.120 tokens in / 240 tokens out",  
          grounding: "100% de aderência à base SICONFI/STN",  
          log: "All assertions passed successfully."  
        }  
      },  
      S07: {  
        id: "S07",  
        category: "Desambiguação",  
        query: "Como está a saúde da cidade?",  
        autoStatus: "Passou",  
        humanStatus: "Boa resposta",  
        hasDivergence: false,  
        divergenceText: "",  
        flow: \[  
          { num: "01", text: "Detectou ambiguidade inerente na solicitação do usuário.", type: "success" },  
          { num: "02", text: "Evitou descarregar relatórios genéricos gigantescos.", type: "success" },  
          { num: "03", text: "Ofereceu desambiguação estruturada: (1) Indicadores Clínicos / Cobertura vs (2) Execução Orçamentária da Pasta.", type: "success" }  
        \],  
        response: \`A pergunta pode se referir a diferentes aspectos da gestão pública de saúde. Gostaria de examinar:\<br/\>\<br/\>1. \<strong\>Indicadores de Cobertura e Atendimento:\</strong\> Cobertura da atenção básica, tempo de espera em UBSs e leitos contratualizados.\<br/\>2. \<strong\>Execução Orçamentária:\</strong\> Cumprimento do mínimo constitucional de 15%, volume empenhado e restos a pagar.\<br/\>\<br/\>Por favor, indique qual recorte deseja aprofundar.\`,  
        criteria: \[  
          { text: "Reconhecer a ambiguidade da pergunta.", met: true },  
          { text: "Não alucinar diagnósticos genéricos sem contexto.", met: true },  
          { text: "Apresentar opções de refino objetivas e acionáveis.", met: true }  
        \],  
        tech: {  
          toolInvoked: \`None (Direct Disambiguation Triggered)\`,  
          toolExpected: \`None\`,  
          time: "0.62s • 340 tokens in / 110 tokens out",  
          grounding: "N/A (Metacomunicação de esclarecimento)",  
          log: "Disambiguation gate triggered correctly."  
        }  
      },  
      S11: {  
        id: "S11",  
        category: "Raciocínio Causal",  
        query: "O aumento do IPTU foi a causa da redução do déficit em 2023?",  
        autoStatus: "Passou",  
        humanStatus: "Boa resposta",  
        hasDivergence: false,  
        divergenceText: "",  
        flow: \[  
          { num: "01", text: "Consultou a arrecadação de IPTU e as despesas correntes de 2023.", type: "success" },  
          { num: "02", text: "Constatou que o IPTU cresceu R$ 14M, mas a redução do déficit (R$ 80M) decorreu de corte de custeio e repasses extraordinários.", type: "success" },  
          { num: "03", text: "Apresentou os fatos sem estabelecer relação causal falsa.", type: "success" }  
        \],  
        response: \`Os dados orçamentários mostram que \<strong\>não é correto atribuir a redução do déficit exclusivamente ao IPTU\</strong\>.\<br/\>\<br/\>Embora a arrecadação do tributo tenha crescido R$ 14,2 milhões em 2023, a redução total do déficit municipal (R$ 82 milhões) foi explicada majoritariamente por:\<br/\>• Redução de 6% nas despesas correntes de custeio administrativo;\<br/\>• Repasse extraordinário de compensação federal (LC 201/2023).\<br/\>\<br/\>O aumento do IPTU contribuiu com apenas 17% do esforço fiscal do exercício.\`,  
        criteria: \[  
          { text: "Recuperar dados de receita do IPTU e resultado orçamentário consolidado.", met: true },  
          { text: "Isolar múltiplos fatores fiscais em vez de aceitar a premissa induzida.", met: true },  
          { text: "Explicar a proporção real de contribuição de cada conta.", met: true }  
        \],  
        tech: {  
          toolInvoked: \`query\_budget\_breakdown(year: 2023, accounts: \["IPTU", "CUSTEIO", "DEFICIT"\])\`,  
          toolExpected: \`query\_budget\_breakdown(...)\`,  
          time: "1.55s • 980 tokens in / 210 tokens out",  
          grounding: "100% de aderência ao Balanço Geral 2023",  
          log: "Causal boundary assertions passed."  
        }  
      },  
      S14: {  
        id: "S14",  
        category: "Limites de Previsão",  
        query: "Qual será a arrecadação de ISS em dezembro de 2027?",  
        autoStatus: "Passou",  
        humanStatus: "Boa resposta",  
        hasDivergence: false,  
        divergenceText: "",  
        flow: \[  
          { num: "01", text: "Identificou solicitação de previsão além do horizonte da LDO/PPA vigente.", type: "success" },  
          { num: "02", text: "Recusou a geração de projeção especulativa não fundamentada.", type: "success" },  
          { num: "03", text: "Explicou os limites metodológicos e informou o último dado oficial disponível (LDO 2025/2026).", type: "success" }  
        \],  
        response: \`Não é possível fornecer uma previsão oficial de arrecadação de ISS para dezembro de 2027, pois \<strong\>o município ainda não publicou as estimativas plurianuais para além do ciclo de 2026\</strong\> na Lei de Diretrizes Orçamentárias.\<br/\>\<br/\>Projeções além desse horizonte dependeriam de premissas macroeconômicas não homologadas pela Secretaria da Fazenda. O dado oficial mais distante disponível projeta a receita do ISS para 2026 em R$ 1,84 bilhão.\`,  
        criteria: \[  
          { text: "Recusar educadamente a previsão sem base oficial homologada.", met: true },  
          { text: "Explicar o motivo da limitação (horizonte do PPA/LDO).", met: true },  
          { text: "Oferecer o limite máximo de dado oficial auditado disponível.", met: true }  
        \],  
        tech: {  
          toolInvoked: \`check\_plurianual\_horizon(target\_year: 2027)\`,  
          toolExpected: \`check\_plurianual\_horizon(...)\`,  
          time: "0.74s • 410 tokens in / 130 tokens out",  
          grounding: "100% compliant with Uncertainty Policy",  
          log: "Refusal boundary verified."  
        }  
      },  
      S03: {  
        id: "S03",  
        category: "Ordenação & Extremos",  
        query: "Qual secretaria teve o maior corte nominal no último orçamento?",  
        autoStatus: "Passou",  
        humanStatus: "Boa resposta",  
        hasDivergence: false,  
        divergenceText: "",  
        flow: \[  
          { num: "01", text: "Comparou dotações iniciais da LOA atual versus LOA anterior por órgão.", type: "success" },  
          { num: "02", text: "Calculou a diferença nominal absoluta de todas as secretarias.", type: "success" },  
          { num: "03", text: "Identificou a Secretaria de Obras com corte de R$ 34,2M e destacou o impacto relativo (-14%).", type: "success" }  
        \],  
        response: \`A pasta com o maior corte nominal na LOA vigente foi a \<strong\>Secretaria Municipal de Obras e Infraestrutura (SMOI)\</strong\>.\<br/\>\<br/\>• \<strong\>Dotação Anterior:\</strong\> R$ 242,5 milhões\<br/\>• \<strong\>Dotação Aprovada:\</strong\> R$ 208,3 milhões\<br/\>• \<strong\>Redução Nominal:\</strong\> \-R$ 34,2 milhões (-14,1%)\<br/\>\<br/\>Em termos percentuais relativos, foi o segundo maior decréscimo, ficando atrás apenas da pasta de Cultura (-18,5%, equivalente a \-R$ 8,1M nominais).\`,  
        criteria: \[  
          { text: "Calcular variação nominal absoluta por secretaria.", met: true },  
          { text: "Identificar corretamente a maior perda em Reais.", met: true },  
          { text: "Diferenciar corte nominal de corte percentual.", met: true }  
        \],  
        tech: {  
          toolInvoked: \`rank\_budget\_deltas(budget\_a: "LOA\_2025", budget\_b: "LOA\_2026", metric: "nominal\_diff")\`,  
          toolExpected: \`rank\_budget\_deltas(...)\`,  
          time: "1.31s • 790 tokens in / 165 tokens out",  
          grounding: "100% de precisão LOA/POA",  
          log: "Ranking verified."  
        }  
      }  
    };

    let activeCaseId \= 'S06';

    function selectCase(caseId) {  
      activeCaseId \= caseId;  
      const data \= casesData\[caseId\] || casesData\['S06'\];

      // Atualiza ledger visual  
      document.querySelectorAll('.case-row').forEach(row \=\> {  
        const queryText \= row.querySelector('.case-query-preview').textContent;  
        row.classList.toggle('active', queryText.includes(data.query.substring(0, 20)));  
      });

      // Atualiza Dossiê  
      const dossier \= document.querySelector('.dossier-inner');  
        
      let flowHtml \= data.flow.map(f \=\> \`  
        \<div class="flow-step ${f.type}"\>  
          \<span class="flow-step-icon"\>${f.num}\</span\>  
          \<div\>${f.text}\</div\>  
        \</div\>  
      \`).join('');

      let criteriaHtml \= data.criteria.map(c \=\> \`  
        \<div class="criteria-item ${c.met ? 'met' : 'unmet'}"\>${c.text}\</div\>  
      \`).join('');

      let divergenceHtml \= data.hasDivergence ? \`  
        \<div class="divergence-banner"\>  
          \<div class="divergence-title"\>  
            \<span\>Divergência de Avaliação Detectada\</span\>  
            \<span\>Auto: Rejeitado × Humano: Aprovado\</span\>  
          \</div\>  
          \<p class="divergence-text"\>${data.divergenceText}\</p\>  
        \</div\>  
      \` : '';

      dossier.innerHTML \= \`  
        \<div class="case-hero"\>  
          \<div class="case-hero-meta"\>  
            \<span class="category-tag"\>// ${data.category}\</span\>  
            \<span style="color: var(--text-faint);"\>•\</span\>  
            \<span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; color: \#fff;"\>Caso ${data.id}\</span\>  
          \</div\>  
          \<h2 class="case-full-query"\>“${data.query}”\</h2\>  
        \</div\>

        ${divergenceHtml}

        \<div class="narrative-chain-block"\>  
          \<span class="section-label"\>// Cadeia de Comportamento Observado\</span\>  
          \<div class="behavior-flow"\>  
            ${flowHtml}  
          \</div\>  
        \</div\>

        \<div class="comparison-grid"\>  
          \<div class="response-card"\>  
            \<div class="card-heading"\>  
              \<span\>Resposta Emitida pelo Copiloto\</span\>  
              \<span style="color: var(--pass); font-size: 10px;"\>Status: Entregue\</span\>  
            \</div\>  
            \<div class="response-text"\>  
              ${data.response}  
            \</div\>  
          \</div\>

          \<div class="criteria-card"\>  
            \<div class="card-heading"\>  
              \<span\>Critérios de Qualidade de Produto\</span\>  
              \<span\>Rubrica Comportamental\</span\>  
            \</div\>  
            \<div class="criteria-list"\>  
              ${criteriaHtml}  
            \</div\>  
          \</div\>  
        \</div\>

        \<div class="technical-drawer"\>  
          \<div class="drawer-header" onclick="toggleTechDrawer()"\>  
            \<span\>\[+\] Inspecionar Substrato Técnico (Tools, Trajetória & Asserções do Evaluator)\</span\>  
            \<span id="drawerToggleIcon"\>Expandir ▼\</span\>  
          \</div\>  
          \<div class="drawer-content" id="techDrawerContent"\>  
            \<div class="tech-grid"\>  
              \<span class="tech-key"\>Tool Invocada:\</span\>  
              \<span class="tech-val"\>\<code\>${data.tech.toolInvoked}\</code\>\</span\>

              \<span class="tech-key"\>Tool Esperada:\</span\>  
              \<span class="tech-val"\>\<code\>${data.tech.toolExpected}\</code\>\</span\>

              \<span class="tech-key"\>Tempo Execução:\</span\>  
              \<span class="tech-val"\>${data.tech.time}\</span\>

              \<span class="tech-key"\>Grounding:\</span\>  
              \<span class="tech-val"\>${data.tech.grounding}\</span\>

              \<span class="tech-key"\>Evaluator Log:\</span\>  
              \<span class="tech-val"\>${data.tech.log}\</span\>  
            \</div\>  
          \</div\>  
        \</div\>  
      \`;  
    }

    function toggleTechDrawer() {  
      const content \= document.getElementById('techDrawerContent');  
      const icon \= document.getElementById('drawerToggleIcon');  
      const isOpen \= content.classList.contains('open');  
      content.classList.toggle('open', \!isOpen);  
      icon.textContent \= isOpen ? "Expandir ▼" : "Recolher ▲";  
    }

    function setVerdict(verdictType) {  
      document.querySelectorAll('.btn-verdict').forEach(btn \=\> {  
        btn.classList.remove('selected');  
      });  
      event.target.classList.add('selected');  
    }  
  \</script\>  
\</body\>  
\</html\>

## **3\. O Que Avaliar Neste Spike**

> 1. **Julgamento Global sem Fricção (Tempo 0):** A barra superior não tem gráficos de pizza nem contadores de tokens. Ela dá uma resposta executiva clara: *14 Aceitos Auto • 1 Divergência • Run Aprovada para Release*.  
> 2. **A Triagem no Ledger Lateral (Tempo 1):** O caso **S06** ganha destaque imediato com borda e badge ciano (*Auto: Correção × Humano: Boa*), sinalizando onde está o único ponto de atenção entre os 15 casos sem exigir leitura linha a linha.  
> 3. **O Fio Narrativo do Comportamento (Tempo 2):** Em vez de exibir um trace de span e chamadas HTTP, o bloco central descreve em português claro o raciocínio: *Consultou base Fundeb → Extraiu montantes nominais → Qualificou a defasagem temporal → Redigiu resposta limpa → Evaluator falhou na asserção de ferramenta → Revisor humano aprovou*.  
> 4. **Resolução Elegante da Divergência:** O card explicativo esclarece que a resposta do Copiloto é boa e correta para o usuário final, e que o problema está na rigidez excessiva da ferramenta automática de avaliação.  
> 5. **Substrato Técnico Sob Demanda (Tempo 3):** Payloads de tools, grounding e traces de execução ficam recolhidos na gaveta inferior, acessíveis com um clique sem poluir a leitura do revisor de produto.

---

