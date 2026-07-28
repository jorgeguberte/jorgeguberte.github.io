"use client";

import Script from "next/script";
import { FormEvent, useMemo, useState } from "react";

type StreamPart = { type?: string; text?: string; message?: string };
type PuterClient = {
  ai: {
    chat: (
      prompt: string,
      options: { model: string; stream: true },
    ) => Promise<AsyncIterable<StreamPart>>;
  };
};

declare global {
  interface Window {
    puter?: PuterClient;
  }
}

const sources = [
  { id: "loomdb", name: "LoomDB", context: "Temporal graph memory with activation decay, spreading relevance, consolidation, and long-horizon retrieval." },
  { id: "epcg", name: "EPCG", context: "A formal agent identity framework built from Behavior, Belief, and Biography, designed for stability without rigidity." },
  { id: "ayvu", name: "Ayvu-Talian", context: "Low-resource language modeling where the corpus is cultural memory and preservation matters more than scale." },
  { id: "pixie", name: "Pixie", context: "An embodied learning companion with persistent memory, predictable interaction, and neurodivergent-first design." },
  { id: "multiverse", name: "Multiverse", context: "Application state with branching timelines, safe speculative changes, merges, and recoverable history." },
];

const starter = "What new system could emerge if these ideas were designed as one architecture?";

export function ContextLab() {
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState<string[]>(["loomdb", "epcg"]);
  const [question, setQuestion] = useState(starter);
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const selectedSources = useMemo(
    () => sources.filter((source) => selected.includes(source.id)),
    [selected],
  );

  function toggleSource(id: string) {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  async function generate(event: FormEvent) {
    event.preventDefault();
    if (selectedSources.length < 2 || !question.trim()) return;
    if (!window.puter) {
      setStatus("error");
      setAnswer("The AI runtime is still loading. Please try again in a moment.");
      return;
    }

    setStatus("loading");
    setAnswer("");
    const evidence = selectedSources
      .map((source) => `${source.name}: ${source.context}`)
      .join("\n");

    const prompt = `You are a research synthesis engine inside Jorge Guberte's portfolio.
Use only the supplied project evidence. Do not invent shipped features, metrics, partners, or claims.
Find a specific and technically plausible connection between the selected projects.
Answer in 90 to 130 words with:
1. A short name for the proposed system.
2. One concise paragraph explaining the architecture.
3. One sentence naming the hardest open problem.
Use direct English. No hype. No markdown table.

PROJECT EVIDENCE
${evidence}

VISITOR QUESTION
${question.trim()}`;

    try {
      const stream = await window.puter.ai.chat(prompt, {
        model: "gpt-5.4-nano",
        stream: true,
      });
      let nextAnswer = "";
      for await (const part of stream) {
        if (part.type === "error") throw new Error(part.message || "The model returned an error.");
        if (part.text) {
          nextAnswer += part.text;
          setAnswer(nextAnswer);
        }
      }
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setAnswer(error instanceof Error ? error.message : "The synthesis could not be generated. Please try again.");
    }
  }

  const canGenerate = ready && selected.length >= 2 && question.trim().length > 0;

  return (
    <>
      <Script
        src="https://js.puter.com/v2/"
        strategy="lazyOnload"
        onLoad={() => setReady(true)}
        onError={() => setStatus("error")}
      />
      <div className="context-lab">
        <form onSubmit={generate} className="context-controls">
          <div>
            <p className="context-label">Choose at least two knowledge sources</p>
            <div className="context-source-grid">
              {sources.map((source) => {
                const active = selected.includes(source.id);
                return (
                  <button
                    key={source.id}
                    type="button"
                    className="context-source"
                    data-active={active}
                    aria-pressed={active}
                    onClick={() => toggleSource(source.id)}
                  >
                    <span>{source.name}</span>
                    <span aria-hidden="true">{active ? "Selected" : "Add"}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <label className="context-question">
            <span className="context-label">Set the research question</span>
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              rows={4}
              maxLength={240}
            />
          </label>

          <div className="context-action">
            <button type="submit" className="rebuild-button" disabled={!canGenerate || status === "loading"}>
              {status === "loading" ? "Synthesizing" : ready ? "Generate synthesis" : "Loading model"}
            </button>
            <p>Runs with GPT-5.4 nano through Puter. The visitor authorizes and covers their own model usage.</p>
          </div>
        </form>

        <div className="context-output" data-state={status} aria-live="polite" aria-busy={status === "loading"}>
          <div className="context-output-head">
            <span>Synthesis</span>
            <span>{status === "success" ? "Generated live" : "Model grounded"}</span>
          </div>
          {answer ? (
            <p>{answer}</p>
          ) : (
            <p className="context-placeholder">
              Select the parts of the research program you want to connect. The model will propose one plausible system and name its hardest open problem.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
