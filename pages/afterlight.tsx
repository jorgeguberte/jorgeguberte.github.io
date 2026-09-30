import type { CSSProperties, ReactElement } from "react";
import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { SeoHead } from "../components/SeoHead";
import type { PageWithLayout } from "./_app";
import styles from "../styles/afterlight.module.css";

const AfterlightAtmosphere = dynamic(
  () =>
    import("../components/AfterlightAtmosphere").then(
      (module) => module.AfterlightAtmosphere,
    ),
  { ssr: false, loading: () => null },
);

type Palette = {
  skyTop: string;
  skyMiddle: string;
  horizon: string;
  halo: string;
  sun: string;
  far: string;
  middle: string;
  near: string;
};

const paletteStops: Palette[] = [
  {
    skyTop: "#ca647b",
    skyMiddle: "#df8490",
    horizon: "#f6ae83",
    halo: "#ffb47f",
    sun: "#ffe2a7",
    far: "#8b6b88",
    middle: "#645775",
    near: "#302e50",
  },
  {
    skyTop: "#85486f",
    skyMiddle: "#b96a85",
    horizon: "#ee9a88",
    halo: "#f79788",
    sun: "#ffdaa2",
    far: "#685b7f",
    middle: "#45496c",
    near: "#252b4b",
  },
  {
    skyTop: "#26395e",
    skyMiddle: "#48517d",
    horizon: "#df958c",
    halo: "#e87e80",
    sun: "#ffd39a",
    far: "#5b5778",
    middle: "#393d60",
    near: "#1d2746",
  },
];

const chapters = [
  {
    minute: 0,
    index: "01",
    label: "Last light",
    time: "18:14",
    name: "Last warm edge",
    note: "The horizon holds one last line of gold.",
  },
  {
    minute: 26,
    index: "02",
    label: "Rose fades",
    time: "18:40",
    name: "Color lets go",
    note: "Rose leaves the rooftops; the hills return.",
  },
  {
    minute: 52,
    index: "03",
    label: "Blue hour",
    time: "19:06",
    name: "The blue arrives",
    note: "A softer kind of seeing takes over.",
  },
];

function mixColor(from: string, to: string, amount: number) {
  const start = from.match(/[\da-f]{2}/gi)!.map((part) => parseInt(part, 16));
  const end = to.match(/[\da-f]{2}/gi)!.map((part) => parseInt(part, 16));
  return `#${start
    .map((channel, index) =>
      Math.round(channel + (end[index] - channel) * amount)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
}

function paletteAt(minute: number): Palette {
  const progress = minute / 52;
  const segment = progress <= 0.5 ? 0 : 1;
  const amount = progress <= 0.5 ? progress * 2 : (progress - 0.5) * 2;
  const first = paletteStops[segment];
  const second = paletteStops[segment + 1];

  return Object.fromEntries(
    Object.keys(first).map((key) => [
      key,
      mixColor(first[key as keyof Palette], second[key as keyof Palette], amount),
    ]),
  ) as Palette;
}

function formatTime(minute: number) {
  const absoluteMinutes = 18 * 60 + 14 + minute;
  return `${String(Math.floor(absoluteMinutes / 60)).padStart(2, "0")}:${String(
    absoluteMinutes % 60,
  ).padStart(2, "0")}`;
}

function skyName(minute: number) {
  if (minute < 16) return "Last warm edge";
  if (minute < 39) return "Color lets go";
  return "The blue arrives";
}

function SkyPlate({ minute, palette }: { minute: number; palette: Palette }) {
  const phase = minute / 52;
  const sunY = 422 + phase * 198;
  const starsOpacity = Math.max(0, Math.min(1, (phase - 0.46) * 2.2));
  const hazeOpacity = 0.8 - phase * 0.38;
  const stars = Array.from({ length: 42 }, (_, index) => ({
    x: 55 + ((index * 137) % 1490),
    y: 34 + ((index * 71) % 330),
    r: index % 7 === 0 ? 2 : 1.2,
    delay: `${(index % 9) * -0.43}s`,
  }));

  return (
    <svg
      className={styles.skySvg}
      viewBox="0 0 1600 820"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`An illustrated evening sky at ${formatTime(minute)}. The colors move from rose to blue as the sun falls beyond the hills.`}
    >
      <defs>
        <linearGradient id="afterlight-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={palette.skyTop} />
          <stop offset="0.58" stopColor={palette.skyMiddle} />
          <stop offset="1" stopColor={palette.horizon} />
        </linearGradient>
        <radialGradient id="afterlight-halo">
          <stop offset="0" stopColor={palette.halo} stopOpacity="0.95" />
          <stop offset="0.46" stopColor={palette.halo} stopOpacity="0.33" />
          <stop offset="1" stopColor={palette.halo} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1600" height="820" fill="url(#afterlight-sky)" />
      <ellipse
        cx="1164"
        cy={sunY + 76}
        rx="425"
        ry="290"
        fill="url(#afterlight-halo)"
        opacity={hazeOpacity}
        className={styles.halo}
      />
      <circle
        cx="1164"
        cy={sunY}
        r="75"
        fill={palette.sun}
        opacity={Math.max(0.03, 1 - phase * 1.65)}
        className={styles.sun}
      />

      <g opacity={starsOpacity}>
        {stars.map((star, index) => (
          <circle
            key={index}
            cx={star.x}
            cy={star.y}
            r={star.r}
            fill="#fff0d6"
            className={styles.star}
            style={{ animationDelay: star.delay }}
          />
        ))}
      </g>

      <g className={styles.clouds} opacity={0.11 + phase * 0.05}>
        <path d="M764 281c64-43 99-45 153-23 45 18 85 14 137-6" />
        <path d="M1100 345c51-25 98-24 149-8 30 10 66 8 102-8" />
        <path d="M455 371c52-23 101-20 142-4 30 12 65 11 93-1" />
      </g>

      <path
        d="M0 558c109-42 213-25 326-58 107-31 182-18 279 6 116 29 174-14 294-6 92 6 158 32 259 17 134-20 286-13 442 23v280H0z"
        fill={palette.far}
        className={styles.ridge}
      />
      <path
        d="M0 622c146-69 268-53 389-23 111 27 191 18 294-26 103-45 207-14 301 17 104 35 215 32 309-8 125-53 206-33 307-1v239H0z"
        fill={palette.middle}
        className={styles.ridge}
      />
      <path
        d="M0 709c114-42 218-71 337-47 83 17 164 32 276-2 111-35 209-20 291 15 122 52 255 41 369-4 108-43 219-41 327-4v153H0z"
        fill={palette.near}
        className={styles.ridge}
      />

      <g className={styles.topography}>
        <path d="M-20 681c157-75 273-65 414-28 106 28 168 15 270-23 102-39 190-21 280 5 116 33 218 28 321-14 130-52 235-29 359 4" />
        <path d="M-20 718c166-54 261-46 386-16 115 28 178 16 273-15 100-32 178-17 281 9 123 31 218 20 316-18 139-54 250-36 389-1" />
      </g>

    </svg>
  );
}

function Afterlight() {
  const [minute, setMinute] = useState(0);
  const palette = paletteAt(minute);
  const dialStyle = {
    "--progress": `${(minute / 52) * 100}%`,
  } as CSSProperties;

  return (
    <div className={styles.page}>
      <SeoHead
        title="Afterlight — A small study in blue hour"
        description="An interactive, hand-tuned sky study. Move through an imagined evening and stay a little longer with the last light."
        path="/afterlight"
      />

      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <Link href="/" className={styles.wordmark} aria-label="Jorge Guberte — home">
            <span className={styles.wordmarkGlyph} aria-hidden="true">
              a
            </span>
            <span>
              <strong>AFTERLIGHT</strong>
              <small>AN EVENING, HELD OPEN</small>
            </span>
          </Link>
          <div className={styles.topbarRight}>
            <span>FIELD NOTE&nbsp; / &nbsp;NO. 01</span>
            <Link className={styles.homeLink} href="/labs/">
              Experiments <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section
          className={styles.hero}
          style={
            {
              "--sky-top": palette.skyTop,
              "--sky-middle": palette.skyMiddle,
              "--sky-horizon": palette.horizon,
              "--sky-halo": palette.halo,
              "--sky-sun": palette.sun,
              "--sky-far": palette.far,
              "--sky-mid": palette.middle,
              "--sky-near": palette.near,
            } as CSSProperties
          }
        >
          <SkyPlate minute={minute} palette={palette} />
          <AfterlightAtmosphere minute={minute} />
          <div className={styles.heroVignette} aria-hidden="true" />

          <div className={styles.plateTopline}>
            <span>ATMOSPHERIC STUDY&nbsp; · &nbsp;01</span>
            <span>AN IMAGINED EVENING</span>
          </div>

          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>A SMALL STUDY IN BLUE HOUR</p>
            <h1>
              The day leaves
              <br />
              in <em>layers.</em>
            </h1>
            <p className={styles.heroLede}>
              An invented evening, made of the colors we almost miss.
            </p>
          </div>

          <div className={styles.heroControls}>
            <div className={styles.heroControlTop}>
              <div className={styles.heroReadout}>
                <span>THE SKY, AT</span>
                <strong aria-live="polite">{formatTime(minute)}</strong>
                <em>{skyName(minute)}</em>
              </div>
              <label className={styles.visuallyHidden} htmlFor="evening-range">
                Move through the evening light
              </label>
              <input
                id="evening-range"
                className={styles.heroRange}
                style={dialStyle}
                type="range"
                min="0"
                max="52"
                step="1"
                value={minute}
                onChange={(event) => setMinute(Number(event.target.value))}
                aria-valuetext={`${formatTime(minute)}, ${skyName(minute)}`}
              />
            </div>

            <div className={styles.heroChapters} role="group" aria-label="Choose a moment">
              {chapters.map((chapter) => (
                <button
                  key={chapter.index}
                  className={styles.heroChapter}
                  data-active={minute === chapter.minute}
                  type="button"
                  onClick={() => setMinute(chapter.minute)}
                  aria-pressed={minute === chapter.minute}
                  aria-label={`Chapter ${chapter.index}: ${chapter.name}, ${chapter.time}`}
                >
                  <span className={styles.heroChapterIndex}>{chapter.index}</span>
                  <strong>{chapter.label}</strong>
                  <small>{chapter.time}</small>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.plateCaption}>
            <span>HORIZON STUDY&nbsp; 23° 33′ S</span>
            <span>FIG. 01&nbsp; — &nbsp;{skyName(minute).toUpperCase()}</span>
          </div>

          <span className={styles.verticalNote} aria-hidden="true">
            LIGHT, HELD BETWEEN TWO THINGS
          </span>
        </section>

        <section className={styles.dialSection} aria-labelledby="dial-title">
          <div className={styles.dialIntro}>
            <p className={styles.sectionLabel}>THREE GLANCES&nbsp; / &nbsp;ONE EVENING</p>
            <h2 id="dial-title">
              The hour has
              <br />
              its own <em>weather.</em>
            </h2>
            <p>
              There is no forecast here. Just one made-up sunset and a little
              more room to notice how it changes.
            </p>
          </div>

          <div className={styles.glances}>
            {chapters.map((chapter) => (
              <article className={styles.glance} key={chapter.index}>
                <div className={styles.glanceMeta}>
                  <span>{chapter.index}</span>
                  <time>{chapter.time}</time>
                </div>
                <h3>{chapter.name}</h3>
                <p>{chapter.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.colophon}>
          <div className={styles.colophonMark} aria-hidden="true">
            <svg viewBox="0 0 100 100" focusable="false">
              <circle cx="50" cy="50" r="30" />
              <path d="M8 50h84M50 8v84M20 20l60 60M80 20 20 80" />
              <circle cx="50" cy="50" r="4" />
            </svg>
          </div>
          <p>
            <span className={styles.sectionLabel}>A NOTE BEFORE YOU GO</span>
            <strong>Nothing to solve. Nowhere else to be.</strong>
            <small>Take the long way into evening.</small>
          </p>
          <Link className={styles.endLink} href="/">
            Back to the day <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>AFTERLIGHT&nbsp; / &nbsp;AN EXERCISE IN ATTENTION</span>
        <span>MADE TO BE LOOKED AT SLOWLY&nbsp; · &nbsp;JG</span>
      </footer>
    </div>
  );
}

const AfterlightPage = Afterlight as PageWithLayout;
AfterlightPage.getLayout = (page: ReactElement) => page;

export default AfterlightPage;
