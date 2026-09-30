---
target: site, especially Labs
total_score: 30
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 1
timestamp: 2026-09-24T06-41-24Z
slug: public-labs-index-html
---
# Revisão — site, com foco em Labs

**Método:** duas avaliações independentes (/root/design_review e /root/detector_browser). Página principal e Labs inspecionados no browser; comparação de navegação feita com o código do site.

## Impressão geral

Labs tem personalidade: a combinação de verde ácido, serifas, órbitas e textos sobre “small worlds” parece feita para esse espaço. A coleção é fácil de percorrer quando já estamos nela. O maior problema é a descoberta: “Lab” no menu leva à pesquisa (/lab), enquanto a galeria com 12 experimentos fica em /labs, sem uma entrada clara no menu.

## Pontuação de design

Escala de 0 a 4, em que 4 é muito bom.

| Heurística | Nota | Observação |
|---|---:|---|
| Visibilidade do estado | 4 | Filtros atualizam a contagem e o estado selecionado. |
| Correspondência com o mundo real | 4 | As descrições usam metáforas coerentes e explicam ações concretas. |
| Controle e liberdade | 3 | É simples filtrar, limpar a busca e voltar; dentro dos experimentos, o retorno depende da navegação do browser. |
| Consistência e padrões | 2 | “Lab” e “Labs” levam a áreas diferentes e pouco conectadas. |
| Prevenção de erros | 3 | A filtragem é reversível, mas a busca pode dar falso zero. |
| Reconhecimento em vez de memorização | 2 | Os símbolos dos cartões não mostram como os experimentos realmente se parecem. |
| Flexibilidade e eficiência | 3 | Busca, categorias e “Surprise me” ajudam, com uma lacuna na busca por categoria. |
| Estética e design minimalista | 4 | Direção visual própria e consistente, sem excesso de decoração. |
| Recuperação de erros | 3 | A mensagem vazia sugere trocar o termo ou voltar a “Everything”. |
| Ajuda e documentação | 2 | Os cartões ensinam o primeiro gesto, mas não sinalizam claramente áudio, voz ou movimento antes de abrir. |
| **Total** | **30/40** | **Bom (75%)** |

## Especificidade e carga cognitiva

**Especificidade alta.** A arte e a escrita têm voz própria; não parecem um catálogo genérico. Os símbolos abstratos, porém, deixam a especificidade dos próprios experimentos escondida até o clique.

**Carga cognitiva moderada.** Na galeria, os quatro filtros, a busca, “Surprise me” e os três primeiros cartões aparecem como nove opções visíveis. Os cartões têm categorias, mas os 12 experimentos continuam numa grade longa e contínua. Agrupar visualmente em três blocos ou destacar uma experiência de entrada reduziria o esforço de escolha.

## O que funciona bem

- A linguagem visual e os textos mantêm a mesma personalidade do topo aos cartões.
- Cada cartão dá uma ação inicial concreta, como girar o MiniDisc ou escolher a profundidade do documento.
- Há bons fundamentos de acessibilidade no catálogo: link para pular à coleção, foco visível, controles de pelo menos 44 px e respeito a prefers-reduced-motion.

## Prioridades

1. **[P1] Separar pesquisa de experimentos na navegação.** O menu principal chama de “Lab” a página de programas de pesquisa; os 12 experimentos estão em /labs, cujo cabeçalho só oferece Home e GitHub. Isso pode fazer o visitante concluir que a galeria não existe. Dê nomes distintos — por exemplo, “Research” e “Experiments” — e crie links entre as duas áreas. Evidências: data/site-content.ts:25, pages/lab/index.tsx:73, public/labs/index.html:19. Comando: $impeccable clarify.
2. **[P2] Mostrar prévias reais nos cartões.** Hoje, os cartões usam glifos decorativos. Com 12 opções, imagens ou loops curtos ajudariam a comparar as experiências sem abrir cada uma. Evidência: public/labs/styles.css:226. Comando: $impeccable polish.
3. **[P2] Incluir a categoria na busca.** Ao selecionar “Audio + objects” e buscar “audio”, o resultado cai para zero, embora existam quatro itens nessa categoria. A busca consulta o título e a descrição, mas não a categoria. Evidência: public/labs/app.js:5. Comando: $impeccable harden.

## Alertas por perfil

- **Visitante de primeira viagem:** “Lab” no menu parece ser o caminho para explorar, mas leva à pesquisa; a galeria interativa fica numa rota separada.
- **Visitante no celular:** o CSS organiza os cartões em uma coluna e mantém controles grandes, mas as formas abstratas não ajudam a escolher rapidamente entre 12 itens.
- **Visitante que testa limites:** buscar “audio” dentro da categoria de áudio produz um falso estado vazio. A mensagem orienta a tentar outro termo, mas a causa é a categoria ignorada pela busca.

## Observações menores

As três categorias têm quatro itens cada. A grade, os filtros e a busca foram verificados; não testei cada um dos 12 experimentos individualmente.

O detector automático não apontou problemas, mas operou em fallback por regex porque faltavam dependências do parser; esse resultado pode subcontar achados. A injeção do overlay não era suportada pelo browser disponível, então nenhum overlay ficou visível.

## Perguntas a considerar

- “Lab” deveria significar pesquisa continuada, experimentos interativos ou os dois?
- Qual experimento deve ser a primeira experiência de quem chega à galeria?
- O visitante precisa saber antes do clique quais experimentos usam áudio, voz ou movimento?
