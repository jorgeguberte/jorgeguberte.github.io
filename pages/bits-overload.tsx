import { useEffect, useState, type ReactElement } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { SeoHead } from "../components/SeoHead";
import type { PageWithLayout } from "./_app";
import BlurText from "../components/reactbits/BlurText";
import ClickSpark from "../components/reactbits/ClickSpark";
import CountUp from "../components/reactbits/CountUp";
import DecryptedText from "../components/reactbits/DecryptedText";
import ElectricBorder from "../components/reactbits/ElectricBorder";
import GradientText from "../components/reactbits/GradientText";
import RotatingText from "../components/reactbits/RotatingText";
import ShinyText from "../components/reactbits/ShinyText";
import SpotlightCard from "../components/reactbits/SpotlightCard";
import styles from "../styles/bits-overload.module.css";

const Aurora = dynamic(() => import("../components/reactbits/Aurora"), {
  ssr: false,
  loading: () => null,
});

const palettes = [
  { name: "ACID", colors: ["#c4ff42", "#a45bff", "#ff68c4"], spark: "#c4ff42" },
  { name: "HEAT", colors: ["#ffdc58", "#ff694e", "#ff8dce"], spark: "#ffdc58" },
  { name: "ICE", colors: ["#b1f7ff", "#607bff", "#c6a7ff"], spark: "#b1f7ff" },
] as const;

const Page: PageWithLayout = () => {
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [intensity, setIntensity] = useState(2);
  const [motionOn, setMotionOn] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [signal, setSignal] = useState(0);
  const palette = palettes[paletteIndex];
  const animate = motionOn && !reducedMotion;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const content = (
    <main
      className={styles.page}
      style={{
        ["--accent" as string]: palette.colors[0],
        ["--accent-two" as string]: palette.colors[1],
        ["--accent-three" as string]: palette.colors[2],
      }}
    >
      <SeoHead
        title="Bits Overload — Jorge Guberte"
        description="A maximalist interactive playground built with React Bits components."
        path="/bits-overload"
      />

      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.shell}>
        <header className={styles.header}>
          <Link href="/" className={styles.wordmark} aria-label="Back to Jorge Guberte home">
            JG<span>®</span>
          </Link>
          <div className={styles.headerCenter}>LAB NOTE 001 <span>◆</span> REACT BITS</div>
          <Link href="/labs/" className={styles.exit}>ALL EXPERIMENTS ↗</Link>
        </header>

        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.aurora} aria-hidden="true">
            {animate && <Aurora colorStops={[...palette.colors]} amplitude={0.7 + intensity * 0.3} blend={0.65} />}
          </div>
          <div className={styles.heroNoise} aria-hidden="true" />
          <div className={styles.heroTopline}>
            <span>INTERACTIVE STUDY / 2026</span>
            <span className={styles.live}><i /> {animate ? "LIVE MOTION" : "MOTION OFF"}</span>
          </div>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>
              {animate ? <DecryptedText text="AN EXPERIMENT IN EXCESS" animateOn="view" speed={30} /> : "AN EXPERIMENT IN EXCESS"}
            </p>
            <h1 id="hero-title" className={styles.heroTitle}>
              <span>BITS</span>
              <span className={styles.outlined}>OVERLOAD<span className={styles.period}>.</span></span>
            </h1>
            <div className={styles.heroBottom}>
              <p>When every pixel wants to play,<br />the interface becomes the instrument.</p>
              <a href="#control-room" className={styles.roundLink} aria-label="Explore the control room">↓</a>
            </div>
          </div>
          <div className={styles.heroFooter}><span>SCROLL TO PLAY</span><span>DESIGNED TO BE TOUCHED</span><span>01 / 03</span></div>
        </section>

        <section id="control-room" className={styles.controlSection} aria-labelledby="control-title">
          <div className={styles.sectionLabel}><span>01 / THE CONTROL ROOM</span><span>YOUR INPUT CHANGES THE ROOM</span></div>
          <div className={styles.controlGrid}>
            <div className={styles.controlIntro}>
              <h2 id="control-title">MAKE<br /><em>NOISE.</em></h2>
              <p>This page is a playground, not a template. Change its frequency and watch the pieces respond.</p>
              <div className={styles.stats}>
                <div><strong>{animate ? <CountUp to={10} duration={1.8} /> : "10"}</strong><span>REACT BITS</span></div>
                <div><strong>{String(intensity).padStart(2, "0")}</strong><span>INTENSITY</span></div>
                <div><strong>{String(signal).padStart(2, "0")}</strong><span>SIGNALS SENT</span></div>
              </div>
            </div>
            <div className={styles.console}>
              <div className={styles.consoleTop}><span>LIVE CONSOLE</span><span>● ONLINE</span></div>
              <div className={styles.controlRow}>
                <div><span className={styles.controlNumber}>01</span><h3>COLOR FREQUENCY</h3><p>Pick a different spectrum.</p></div>
                <div className={styles.paletteButtons} role="group" aria-label="Color palette">
                  {palettes.map((item, index) => (
                    <button key={item.name} type="button" aria-pressed={paletteIndex === index} onClick={() => setPaletteIndex(index)} style={{ background: item.colors[0] }} title={item.name}><span>{item.name}</span></button>
                  ))}
                </div>
              </div>
              <div className={styles.controlRow}>
                <div><span className={styles.controlNumber}>02</span><h3>INTENSITY</h3><p>Turn up the response.</p></div>
                <div className={styles.rangeWrap}><input aria-label="Effect intensity" type="range" min="1" max="3" step="1" value={intensity} onChange={(event) => setIntensity(Number(event.target.value))} /><span>0{intensity} / 03</span></div>
              </div>
              <div className={styles.controlRow}>
                <div><span className={styles.controlNumber}>03</span><h3>MOTION</h3><p>{reducedMotion ? "Reduced motion is active on your device." : "Pause the animated effects."}</p></div>
                <button className={styles.motionToggle} type="button" role="switch" aria-checked={animate} onClick={() => setMotionOn((current) => !current)} disabled={reducedMotion}><span>{animate ? "ON" : "OFF"}</span><i /></button>
              </div>
              <div className={styles.consoleBottom}>SYSTEM STATUS <span>READY FOR INPUT_</span></div>
            </div>
          </div>
        </section>

        <section className={styles.showcase} aria-labelledby="showcase-title">
          <div className={styles.sectionLabel}><span>02 / COMPONENT ORCHESTRA</span><span>MOVE / HOVER / CLICK</span></div>
          <h2 id="showcase-title" className={styles.showcaseTitle}>
            {animate ? <BlurText text="Everything reacts." delay={120} animateBy="words" /> : "Everything reacts."}
          </h2>
          <div className={styles.showcaseGrid}>
            <SpotlightCard className={`${styles.demoCard} ${styles.featureCard}`} spotlightColor="rgba(196, 255, 66, 0.22)">
              <span className={styles.cardIndex}>A / SPOTLIGHT CARD</span>
              <div className={styles.featureWord}>
                {animate ? <GradientText colors={[...palette.colors]} animationSpeed={4}>FOLLOW THE LIGHT</GradientText> : "FOLLOW THE LIGHT"}
              </div>
              <p>Move your pointer across the surface. The card remembers where you are.</p>
              <span className={styles.cardCorner}>↗</span>
            </SpotlightCard>

            <div className={`${styles.demoCard} ${styles.typeCard}`}>
              <span className={styles.cardIndex}>B / ROTATING TEXT</span>
              <p>THE FUTURE IS</p>
              <div className={styles.rotateLine}>{animate ? <RotatingText texts={["PLAYFUL", "ALIVE", "UNFINISHED", "YOURS"]} rotationInterval={2200} mainClassName={styles.rotatingText} /> : <span>PLAYFUL</span>}</div>
              <span className={styles.cardFoot}>WORDS REFUSE TO STAY STILL.</span>
            </div>

            <div className={`${styles.demoCard} ${styles.signalCard}`}>
              <span className={styles.cardIndex}>C / DECRYPTED TEXT</span>
              <div className={styles.signalGlyph}>✳</div>
              <div className={styles.decrypt}>{animate ? <DecryptedText text="SIGNAL FOUND: STAY CURIOUS" animateOn="hover" speed={35} sequential /> : "SIGNAL FOUND: STAY CURIOUS"}</div>
              <span className={styles.cardFoot}>HOVER TO DECODE THE TRANSMISSION.</span>
            </div>

            <div className={`${styles.demoCard} ${styles.electricCard}`}>
              <span className={styles.cardIndex}>D / ELECTRIC BORDER</span>
              <div className={styles.electricInner}>
                {animate ? <ElectricBorder color={palette.spark} speed={0.65 + intensity * 0.25} chaos={0.08 + intensity * 0.04} borderRadius={22}><div className={styles.electricContent}><span>HIGH<br />VOLTAGE</span><b>↗</b></div></ElectricBorder> : <div className={styles.electricStatic}><span>HIGH<br />VOLTAGE</span><b>↗</b></div>}
              </div>
              <span className={styles.cardFoot}>A CONTAINER WITH A PULSE.</span>
            </div>

            <div className={`${styles.demoCard} ${styles.clickCard}`}>
              <span className={styles.cardIndex}>E / CLICK SPARK</span>
              <div className={styles.clickCenter}><span>ONE CLICK.<br />A THOUSAND SPARKS.</span><button type="button" onClick={() => setSignal((count) => count + 1)}>SEND A SIGNAL ↗</button></div>
              <span className={styles.cardFoot}>GO AHEAD. PRESS IT AGAIN.</span>
            </div>

            <div className={`${styles.demoCard} ${styles.shinyCard}`}>
              <span className={styles.cardIndex}>F / SHINY TEXT + COUNT UP</span>
              <div className={styles.bigCount}>{animate ? <CountUp to={100} duration={3} /> : "100"}<span>%</span></div>
              <div className={styles.shinyLine}>{animate ? <ShinyText text="UNNECESSARILY DELIGHTFUL" speed={2.3} color="#d5d2c9" shineColor={palette.spark} /> : "UNNECESSARILY DELIGHTFUL"}</div>
              <span className={styles.cardFoot}>MAXIMUM FEELING. ZERO APOLOGIES.</span>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.footerBig}>KEEP<br /><span>PLAYING.</span></div>
          <div className={styles.footerBottom}><span>AN EXPERIMENT BY JORGE GUBERTE · 2026</span><a href="https://reactbits.dev/" target="_blank" rel="noreferrer">POWERED BY REACT BITS ↗</a><Link href="/">BACK TO SITE ↗</Link></div>
        </footer>
      </div>
    </main>
  );

  return animate ? <ClickSpark sparkColor={palette.spark} sparkCount={intensity * 4} sparkRadius={18 + intensity * 5}>{content}</ClickSpark> : content;
};

Page.getLayout = (page: ReactElement) => page;

export default Page;
