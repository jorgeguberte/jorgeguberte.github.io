import { useEffect, useState, type FormEvent, type ReactElement } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { SeoHead } from "../components/SeoHead";
import { useFocusRoom } from "../components/focus-room/useFocusRoom";
import BlurText from "../components/reactbits/BlurText";
import ClickSpark from "../components/reactbits/ClickSpark";
import CountUp from "../components/reactbits/CountUp";
import DecryptedText from "../components/reactbits/DecryptedText";
import ElectricBorder from "../components/reactbits/ElectricBorder";
import GradientText from "../components/reactbits/GradientText";
import RotatingText from "../components/reactbits/RotatingText";
import ShinyText from "../components/reactbits/ShinyText";
import SpotlightCard from "../components/reactbits/SpotlightCard";
import type { PageWithLayout } from "./_app";
import styles from "../styles/still.module.css";

const Aurora = dynamic(() => import("../components/reactbits/Aurora"), { ssr: false, loading: () => null });

function formatTime(seconds: number) {
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function formatDuration(seconds: number) {
  return `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, "0")}s`;
}

function exportCsv(records: ReturnType<typeof useFocusRoom>["records"]) {
  const cell = (value: string) => `"${value.replace(/"/g, '""')}"`;
  const rows = ["completed_at,task,duration_seconds", ...records.map((record) =>
    `${cell(new Date(record.completedAt).toISOString())},${cell(record.task)},${record.durationSeconds}`)];
  const blob = new Blob(["\uFEFF", rows.join("\r\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "still-focus-sessions.csv";
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const StillPage: PageWithLayout = () => {
  const room = useFocusRoom();
  const [draft, setDraft] = useState("");
  const [dateLabel, setDateLabel] = useState("");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [motionOn, setMotionOn] = useState(true);
  const [confirmClear, setConfirmClear] = useState(false);
  const animate = motionOn && !reducedMotion;
  const { timer } = room;
  const running = timer.endsAt !== null;
  const total = (timer.phase === "focus" ? timer.focusMinutes : timer.breakMinutes) * 60;
  const progress = Math.min(100, Math.max(0, 100 * (1 - timer.remaining / total)));
  const currentTask = timer.sessionId ? timer.sessionTask : (room.activeTask?.title ?? "Open focus");

  useEffect(() => {
    setDateLabel(new Intl.DateTimeFormat("en", { weekday: "long", month: "long", day: "numeric" }).format(new Date()));
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!running) return;
    const original = document.title;
    document.title = `${formatTime(timer.remaining)} · STILL`;
    return () => { document.title = original; };
  }, [running, timer.remaining]);

  function submitTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (room.addTask(draft)) setDraft("");
  }

  const startButton = (
    <button type="button" className={styles.primaryButton} onClick={room.startOrPause}>
      <span>{running ? "PAUSE SESSION" : timer.remaining < total ? "RESUME SESSION" : `START ${timer.phase.toUpperCase()}`}</span>
      <span aria-hidden="true">{running ? "Ⅱ" : "↗"}</span>
    </button>
  );

  return (
    <main className={styles.page}>
      <SeoHead title="STILL — A Focus Room by Jorge Guberte" description="A private focus room for real tasks, timed work, breaks, notes, and session history." path="/still" />
      <div className={styles.topbar}>
        <Link href="/" className={styles.logo} aria-label="Jorge Guberte home"><span className={styles.logoMark}>S<span>✳</span></span><span>STILL<small>FOCUS ROOM</small></span></Link>
        <div className={styles.topMeta}><span>{dateLabel || "YOUR FOCUS ROOM"}</span><span className={styles.localPill}><i /> SAVED IN THIS BROWSER</span></div>
        <div className={styles.topActions}>
          <button type="button" onClick={() => setMotionOn((value) => !value)} aria-pressed={animate} disabled={reducedMotion} className={styles.motionButton}>{animate ? "MOTION ON" : "MOTION OFF"}</button>
          <Link href="/labs/">EXPERIMENTS ↗</Link>
        </div>
      </div>

      <div className={styles.wrap}>
        <section className={styles.intro} aria-labelledby="intro-title">
          <div className={styles.introLeft}>
            <p className={styles.kicker}><span>01 / INTENTION</span> DO ONE THING WELL</p>
            <h1 id="intro-title">MAKE ROOM<br />FOR <em>ONE THING.</em></h1>
            {animate ? <BlurText text="A calmer place to turn intention into finished work." delay={85} className={styles.introCopy} /> : <p className={styles.introCopy}>A calmer place to turn intention into finished work.</p>}
          </div>
          <div className={styles.introVisual} aria-hidden="true">
            {animate && <Aurora colorStops={["#78d6c6", "#d6f05a", "#749cce"]} amplitude={0.55} blend={0.8} />}
            <span className={styles.visualOrb}>✳</span>
            <span className={styles.visualCaption}>ATTENTION IS A PRACTICE,<br />NOT A PERSONALITY TRAIT.</span>
          </div>
        </section>

        {room.notice && <div className={styles.notice} role="status"><span>✳</span>{animate ? <DecryptedText text={room.notice} animateOn="view" speed={24} /> : room.notice}<button type="button" onClick={() => room.setNotice("")} aria-label="Dismiss message">×</button></div>}

        <div className={styles.workspace}>
          <section className={styles.taskPanel} aria-labelledby="tasks-title">
            <div className={styles.panelHeader}><div><span className={styles.panelIndex}>01 / PLAN</span><h2 id="tasks-title">Your queue<span className={styles.countBadge}>{room.tasks.filter((task) => !task.done).length}</span></h2></div><span className={styles.panelSub}>ONE ACTIVE TASK</span></div>
            <form className={styles.addTask} onSubmit={submitTask}>
              <label htmlFor="new-task" className={styles.visuallyHidden}>New task</label>
              <input id="new-task" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="What matters next?" maxLength={120} />
              <button type="submit" aria-label="Add task" disabled={!draft.trim()}>＋</button>
            </form>
            <p className={styles.taskHint}>Add a task, then choose the one for this session.</p>
            <div className={styles.taskList}>
              {room.tasks.length === 0 && <div className={styles.emptyTasks}><span>◎</span><strong>A little space is a good start.</strong><p>Add one concrete thing you want to move forward.</p></div>}
              {room.tasks.map((task) => (
                <SpotlightCard key={task.id} className={`${styles.taskCard} ${room.activeId === task.id && !task.done ? styles.taskActive : ""} ${task.done ? styles.taskDone : ""}`} spotlightColor="rgba(214, 240, 90, 0.18)">
                  <button type="button" className={styles.taskCheck} aria-label={task.done ? `Mark ${task.title} incomplete` : `Complete ${task.title}`} onClick={() => room.toggleTask(task.id)}>{task.done ? "✓" : ""}</button>
                  <button type="button" className={styles.taskSelect} aria-pressed={room.activeId === task.id && !task.done} disabled={task.done} onClick={() => room.setActiveId(task.id)}><span>{task.title}</span><small>{task.done ? "DONE" : room.activeId === task.id ? "IN FOCUS" : "SELECT TASK ↗"}</small></button>
                  <button type="button" className={styles.taskRemove} aria-label={`Remove ${task.title}`} onClick={() => room.removeTask(task.id)}>×</button>
                </SpotlightCard>
              ))}
            </div>
          </section>

          <section className={styles.timerPanel} aria-labelledby="timer-title">
            <div className={styles.timerTop}><span className={styles.panelIndex}>02 / DO THE WORK</span><span className={styles.timerStatus}><i className={running ? styles.statusLive : ""} />{running ? "IN SESSION" : timer.phase === "break" ? "BREAK READY" : "READY WHEN YOU ARE"}</span></div>
            <div className={styles.timerBody}>
              <div className={styles.phaseTabs} role="group" aria-label="Session type"><button type="button" aria-pressed={timer.phase === "focus"} disabled={running || Boolean(timer.sessionId)} title={timer.sessionId ? "Finish or reset the current session first" : undefined} onClick={() => room.switchPhase("focus")}>FOCUS</button><button type="button" aria-pressed={timer.phase === "break"} disabled={running || Boolean(timer.sessionId)} title={timer.sessionId ? "Finish or reset the current session first" : undefined} onClick={() => room.switchPhase("break")}>BREAK</button></div>
              <h2 id="timer-title">{timer.phase === "focus" ? animate ? <GradientText colors={["#d6f05a", "#8dd9c5", "#d6f05a"]} animationSpeed={6}>A SPACE TO FOCUS</GradientText> : "A SPACE TO FOCUS" : "BREATHE, THEN BEGIN AGAIN"}</h2>
              <div className={styles.timerFrame}>
                {running && animate ? <ElectricBorder color="#d6f05a" speed={0.55} chaos={0.07} borderRadius={32}><div className={styles.timerFace}><div className={styles.timerDigits} aria-label={`${Math.floor(timer.remaining / 60)} minutes and ${timer.remaining % 60} seconds remaining`}>{formatTime(timer.remaining)}</div><p>{timer.phase === "focus" ? currentTask : "Step away for a moment"}</p></div></ElectricBorder> : <div className={styles.timerFace}><div className={styles.timerDigits} aria-label={`${Math.floor(timer.remaining / 60)} minutes and ${timer.remaining % 60} seconds remaining`}>{formatTime(timer.remaining)}</div><p>{timer.phase === "focus" ? currentTask : "Step away for a moment"}</p></div>}
              </div>
              <div className={styles.progressTrack} role="progressbar" aria-label="Session progress" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${progress}%` }} /></div>
              {timer.phase === "break" && <div className={styles.breakSuggestion}><span>TRY THIS</span>{animate ? <RotatingText texts={["LOOK AWAY FROM THE SCREEN", "UNCLENCH YOUR SHOULDERS", "TAKE A SIP OF WATER", "WALK FOR A MINUTE"]} rotationInterval={3500} mainClassName={styles.breakRotating} /> : "LOOK AWAY FROM THE SCREEN"}</div>}
              <div className={styles.timerActions}>
                {animate ? <ClickSpark sparkColor="#d6f05a" sparkCount={10}>{startButton}</ClickSpark> : startButton}
                <button type="button" className={styles.secondaryButton} onClick={room.resetTimer}>RESET</button>
              </div>
              {timer.phase === "focus" && timer.sessionId && <button type="button" className={styles.finishLink} onClick={room.finishNow}>Finished early? Save this session ↗</button>}
            </div>
            <div className={styles.timerSettings}>
              <div><span>FOCUS LENGTH</span><div role="group" aria-label="Focus length">{[25, 50, 90].map((minutes) => <button key={minutes} type="button" aria-pressed={timer.focusMinutes === minutes} disabled={running || Boolean(timer.sessionId)} onClick={() => room.setFocusMinutes(minutes)}>{minutes}m</button>)}</div></div>
              <div><span>BREAK LENGTH</span><div role="group" aria-label="Break length">{[5, 10, 15].map((minutes) => <button key={minutes} type="button" aria-pressed={timer.breakMinutes === minutes} disabled={running} onClick={() => room.setBreakMinutes(minutes)}>{minutes}m</button>)}</div></div>
            </div>
          </section>

          <aside className={styles.sidePanel} aria-label="Notes and progress">
            <section className={styles.todayCard}><div className={styles.panelHeader}><div><span className={styles.panelIndex}>03 / MOMENTUM</span><h2>Today, so far.</h2></div></div><div className={styles.todayNumber}>{room.hydrated && animate ? <CountUp to={Math.floor(room.todaySeconds / 60)} duration={1.3} /> : Math.floor(room.todaySeconds / 60)}<span>MIN</span></div><p>across <strong>{room.todayRecords.length}</strong> completed {room.todayRecords.length === 1 ? "session" : "sessions"} today.</p><div className={styles.todayFooter}><span>ALL-TIME FOCUS</span><strong>{Math.floor(room.focusSeconds / 60)} MIN</strong></div></section>
            <section className={styles.notesCard}><div className={styles.panelHeader}><div><span className={styles.panelIndex}>04 / CLEAR YOUR HEAD</span><h2>Scratchpad</h2></div><span className={styles.savedDot}>AUTO-SAVED</span></div><label htmlFor="scratchpad" className={styles.visuallyHidden}>Scratchpad notes</label><textarea id="scratchpad" value={room.note} onChange={(event) => room.setNote(event.target.value)} placeholder="Parking lot for distracting thoughts, useful links, or the next small step…" maxLength={5000} /><div className={styles.notesFooter}>ONLY STORED IN THIS BROWSER <span>{room.note.length} / 5000</span></div></section>
          </aside>
        </div>

        <section className={styles.history} aria-labelledby="history-title"><div className={styles.historyHeading}><div><span className={styles.panelIndex}>05 / THE WORK ADDS UP</span><h2 id="history-title">Session history<span>↘</span></h2><p>Small blocks become a body of work. Your history stays on this device.</p></div><div className={styles.historyActions}><button type="button" onClick={() => exportCsv(room.records)} disabled={!room.records.length}>EXPORT CSV ↗</button><button type="button" onClick={() => setConfirmClear(true)} disabled={!room.tasks.length && !room.records.length && !room.note}>CLEAR LOCAL DATA</button></div></div>
          {confirmClear && <div className={styles.clearConfirm} role="group" aria-label="Confirm clearing local data"><span>Remove all tasks, notes, and session history from this browser?</span><button type="button" onClick={() => setConfirmClear(false)}>CANCEL</button><button type="button" onClick={() => { room.clearAll(); setConfirmClear(false); }}>CLEAR EVERYTHING</button></div>}
          {room.records.length === 0 ? <div className={styles.emptyHistory}><span>NO SESSIONS YET</span><p>Finish your first focus block and it will appear here.</p></div> : <div className={styles.historyList}>{room.records.slice(0, 8).map((record, index) => <div className={styles.historyRow} key={record.id}><span>{String(index + 1).padStart(2, "0")}</span><strong>{record.task}</strong><span>{new Date(record.completedAt).toLocaleDateString()}</span><b>{formatDuration(record.durationSeconds)}</b></div>)}</div>}
        </section>
        <footer className={styles.footer}><span>STILL / A FOCUS ROOM</span><span>BUILT WITH <a href="https://reactbits.dev/" target="_blank" rel="noreferrer">REACT BITS ↗</a></span><Link href="/labs/">MORE EXPERIMENTS ↗</Link></footer>
      </div>
    </main>
  );
};

StillPage.getLayout = (page: ReactElement) => page;

export default StillPage;
