import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import "../styles/globals.css";
import "../styles/y2k-override.css";
import "../styles/chrome-tokens.css";
import "../styles/chrome-theme.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}