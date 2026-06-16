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
                  // Default to Y2K if never set
                  if (theme === 'editorial') {
                    document.documentElement.classList.remove('y2k-active');
                  } else {
                    document.documentElement.classList.add('y2k-active');
                  }
                } catch(e) {
                  // localStorage unavailable — default to Y2K
                  document.documentElement.classList.add('y2k-active');
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