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
                  if (theme === 'editorial') {
                    document.documentElement.classList.remove('y2k-active', 'theme-chrome');
                  } else if (theme === 'chrome') {
                    document.documentElement.classList.remove('y2k-active');
                    document.documentElement.classList.add('theme-chrome');
                  } else {
                    // default: y2k
                    document.documentElement.classList.add('y2k-active');
                    document.documentElement.classList.remove('theme-chrome');
                  }
                } catch(e) {
                  // localStorage unavailable — default to Y2K
                  document.documentElement.classList.add('y2k-active');
                  document.documentElement.classList.remove('theme-chrome');
                }
              })();
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}