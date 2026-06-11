import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

/** Legacy URL — /blog moved to /writing. Static-export-safe redirect. */
export default function BlogRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/writing");
  }, [router]);

  return (
    <Head>
      <meta httpEquiv="refresh" content="0; url=/writing" />
      <link rel="canonical" href="https://jorgeguberte.com/writing" />
      <title>Redirecting…</title>
    </Head>
  );
}
