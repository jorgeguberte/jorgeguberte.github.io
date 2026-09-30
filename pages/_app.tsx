import type { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import "@fontsource-variable/manrope";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import { Layout } from "../components/Layout";
import { GoogleAnalytics } from "../components/GoogleAnalytics";
import "../styles/globals.css";
import "../styles/reactbits.css";

export type PageWithLayout = AppProps["Component"] & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & { Component: PageWithLayout };

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page: ReactElement) => <Layout>{page}</Layout>);

  return (
    <>
      <GoogleAnalytics />
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}
