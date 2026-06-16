import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Inline script: apply theme BEFORE paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var root = document.documentElement;
                  // Clear all theme classes first
                  root.classList.remove('y2k-active', 'theme-chrome', 'bt-active');
                  if (theme === 'editorial') {
                    // HIGH EDITORIAL base only
                  } else if (theme === 'chrome') {
                    root.classList.add('theme-chrome');
                  } else if (theme === 'brutalist') {
                    root.classList.add('bt-active');
                  } else {
                    // default: Y2K brutalist overlay
                    root.classList.add('y2k-active');
                  }
                } catch(e) {
                  // localStorage unavailable — default to Y2K
                  document.documentElement.classList.add('y2k-active');
                }
              })();
            `,
          }}
        />
        {/* SVG filters for halftone/dithering */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", width: 0, height: 0 }}
          aria-hidden="true"
        >
          <filter id="bt-dither-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="4" result="noise" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
            />
            <feComponentTransfer>
              <feFuncR type="discrete" tableValues="0 1" />
              <feFuncG type="discrete" tableValues="0 1" />
              <feFuncB type="discrete" tableValues="0 1" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" mode="multiply" />
          </filter>
          <filter id="bt-halftone-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.15" numOctaves="1" result="noise" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncR type="discrete" tableValues="0 0.5 1" />
              <feFuncG type="discrete" tableValues="0 0.5 1" />
              <feFuncB type="discrete" tableValues="0 0.5 1" />
            </feComponentTransfer>
          </filter>
        </svg>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}