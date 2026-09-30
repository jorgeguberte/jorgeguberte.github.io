import { useEffect, useState } from "react";

const STORAGE_KEY = "still-focus-room-v1";

export type FocusTask = {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
};

export type FocusRecord = {
  id: string;
  task: string;
  durationSeconds: number;
  completedAt: number;
};

type Phase = "focus" | "break";

type Timer = {
  phase: Phase;
  focusMinutes: number;
  breakMinutes: number;
  remaining: number;
  endsAt: number | null;
  sessionId: string | null;
  sessionTask: string;
  pendingCompletion: boolean;
  completedAt: number | null;
};

const initialTimer: Timer = {
  phase: "focus",
  focusMinutes: 25,
  breakMinutes: 5,
  remaining: 25 * 60,
  endsAt: null,
  sessionId: null,
  sessionTask: "Open focus",
  pendingCompletion: false,
  completedAt: null,
};

function id() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function validTimer(value: unknown): Timer {
  if (!value || typeof value !== "object") return initialTimer;
  const timer = value as Partial<Timer>;
  const focusMinutes = [25, 50, 90].includes(timer.focusMinutes ?? 0) ? timer.focusMinutes! : 25;
  const breakMinutes = [5, 10, 15].includes(timer.breakMinutes ?? 0) ? timer.breakMinutes! : 5;
  const phase: Phase = timer.phase === "break" ? "break" : "focus";
  const maxSeconds = (phase === "focus" ? focusMinutes : breakMinutes) * 60;
  return {
    phase,
    focusMinutes,
    breakMinutes,
    remaining: typeof timer.remaining === "number" && Number.isFinite(timer.remaining)
      ? Math.max(0, Math.min(maxSeconds, timer.remaining)) : maxSeconds,
    endsAt: typeof timer.endsAt === "number" && Number.isFinite(timer.endsAt) ? timer.endsAt : null,
    sessionId: typeof timer.sessionId === "string" ? timer.sessionId : null,
    sessionTask: typeof timer.sessionTask === "string" ? timer.sessionTask : "Open focus",
    pendingCompletion: timer.pendingCompletion === true,
    completedAt: typeof timer.completedAt === "number" && Number.isFinite(timer.completedAt) ? timer.completedAt : null,
  };
}

export function useFocusRoom() {
  const [tasks, setTasks] = useState<FocusTask[]>([]);
  const [records, setRecords] = useState<FocusRecord[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [timer, setTimer] = useState<Timer>(initialTimer);
  const [hydrated, setHydrated] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (Array.isArray(data.tasks)) {
          setTasks(data.tasks.filter((task: FocusTask) =>
            task && typeof task.id === "string" && typeof task.title === "string" && typeof task.done === "boolean"
          ));
        }
        if (Array.isArray(data.records)) {
          setRecords(data.records.filter((record: FocusRecord) =>
            record && typeof record.id === "string" && typeof record.task === "string" &&
            typeof record.durationSeconds === "number" && typeof record.completedAt === "number"
          ));
        }
        if (typeof data.activeId === "string") setActiveId(data.activeId);
        if (typeof data.note === "string") setNote(data.note);
        setTimer(validTimer(data.timer));
      }
    } catch {
      // Private browsing or malformed saved data should not prevent a session.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ tasks, records, activeId, note, timer }));
    } catch {
      // The app remains usable if browser storage is unavailable.
    }
  }, [tasks, records, activeId, note, timer, hydrated]);

  useEffect(() => {
    if (!hydrated || timer.endsAt === null) return;
    const tick = () => setTimer((current) => {
      if (current.endsAt === null) return current;
      const remaining = Math.max(0, Math.ceil((current.endsAt - Date.now()) / 1000));
      if (remaining === 0) return { ...current, remaining: 0, endsAt: null, pendingCompletion: true,
        completedAt: current.endsAt };
      return remaining === current.remaining ? current : { ...current, remaining };
    });
    tick();
    const interval = window.setInterval(tick, 250);
    return () => window.clearInterval(interval);
  }, [timer.endsAt, hydrated]);

  useEffect(() => {
    if (!hydrated || !timer.pendingCompletion) return;
    if (timer.phase === "focus") {
      const completedSeconds = Math.max(1, timer.focusMinutes * 60 - timer.remaining);
      const recordId = timer.sessionId ?? id();
      setRecords((current) => current.some((record) => record.id === recordId)
        ? current
        : [{ id: recordId, task: timer.sessionTask, durationSeconds: completedSeconds,
          completedAt: timer.completedAt ?? Date.now() }, ...current]);
      setNotice("Focus session complete. A break is ready when you are.");
      setTimer((current) => ({ ...current, phase: "break", remaining: current.breakMinutes * 60, endsAt: null,
        sessionId: null, pendingCompletion: false, completedAt: null }));
    } else {
      setNotice("Break complete. Choose your next focus block.");
      setTimer((current) => ({ ...current, phase: "focus", remaining: current.focusMinutes * 60,
        endsAt: null, sessionId: null, pendingCompletion: false, completedAt: null }));
    }
  }, [timer.pendingCompletion, timer.phase, timer.focusMinutes, timer.remaining, timer.sessionId,
    timer.sessionTask, timer.completedAt, hydrated]);

  const activeTask = tasks.find((task) => task.id === activeId && !task.done) ?? null;
  const focusSeconds = records.reduce((sum, record) => sum + record.durationSeconds, 0);
  const today = new Date().toDateString();
  const todayRecords = records.filter((record) => new Date(record.completedAt).toDateString() === today);
  const todaySeconds = todayRecords.reduce((sum, record) => sum + record.durationSeconds, 0);

  function addTask(title: string) {
    const clean = title.trim().replace(/\s+/g, " ").slice(0, 120);
    if (!clean) return false;
    const task: FocusTask = { id: id(), title: clean, done: false, createdAt: Date.now() };
    setTasks((current) => [task, ...current]);
    if (!activeId) setActiveId(task.id);
    return true;
  }

  function toggleTask(taskId: string) {
    setTasks((current) => current.map((task) => task.id === taskId ? { ...task, done: !task.done } : task));
    if (activeId === taskId) setActiveId(null);
  }

  function removeTask(taskId: string) {
    setTasks((current) => current.filter((task) => task.id !== taskId));
    if (activeId === taskId) setActiveId(null);
  }

  function startOrPause() {
    setNotice("");
    setTimer((current) => {
      if (current.endsAt !== null) {
        return { ...current, remaining: Math.max(0, Math.ceil((current.endsAt - Date.now()) / 1000)), endsAt: null };
      }
      const remaining = current.remaining || (current.phase === "focus" ? current.focusMinutes : current.breakMinutes) * 60;
      return { ...current, remaining, endsAt: Date.now() + remaining * 1000, completedAt: null,
        sessionId: current.phase === "focus" ? (current.sessionId ?? id()) : null,
        sessionTask: current.phase === "focus" && !current.sessionId ? (activeTask?.title ?? "Open focus") : current.sessionTask };
    });
  }

  function resetTimer() {
    setNotice("");
    setTimer((current) => ({ ...current, remaining: (current.phase === "focus" ? current.focusMinutes : current.breakMinutes) * 60,
      endsAt: null, sessionId: null, pendingCompletion: false, completedAt: null }));
  }

  function finishNow() {
    if (timer.phase !== "focus" || !timer.sessionId) return;
    setTimer((current) => ({ ...current, remaining: current.endsAt === null ? current.remaining
      : Math.max(0, Math.ceil((current.endsAt - Date.now()) / 1000)), endsAt: null,
      pendingCompletion: true, completedAt: Date.now() }));
  }

  function setFocusMinutes(minutes: number) {
    if (timer.endsAt !== null || timer.sessionId || ![25, 50, 90].includes(minutes)) return;
    setTimer((current) => ({ ...current, phase: "focus", focusMinutes: minutes, remaining: minutes * 60,
      endsAt: null, sessionId: null, pendingCompletion: false, completedAt: null }));
  }

  function setBreakMinutes(minutes: number) {
    if (timer.endsAt !== null || ![5, 10, 15].includes(minutes)) return;
    setTimer((current) => ({ ...current, breakMinutes: minutes,
      remaining: current.phase === "break" ? minutes * 60 : current.remaining }));
  }

  function switchPhase(phase: Phase) {
    if (timer.endsAt !== null || (timer.phase === "focus" && timer.sessionId)) return;
    setNotice("");
    setTimer((current) => ({ ...current, phase, remaining: (phase === "focus" ? current.focusMinutes : current.breakMinutes) * 60,
      endsAt: null, sessionId: null, pendingCompletion: false, completedAt: null }));
  }

  function clearAll() {
    setTasks([]);
    setRecords([]);
    setActiveId(null);
    setNote("");
    setTimer(initialTimer);
    setNotice("");
  }

  return { tasks, records, activeId, activeTask, setActiveId, note, setNote, timer, hydrated, notice, setNotice,
    focusSeconds, todaySeconds, todayRecords, addTask, toggleTask, removeTask, startOrPause,
    resetTimer, finishNow, setFocusMinutes, setBreakMinutes, switchPhase, clearAll };
}
