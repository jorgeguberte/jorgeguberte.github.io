import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import { GA_TRACKING_ID, pageview } from "../lib/gtag";

export function GoogleAnalytics({ measurementId }: { measurementId?: string }) {
  const router = useRouter();
  const id = measurementId || GA_TRACKING_ID;

  useEffect(() => {
    if (!id) return;

    const handleRouteChange = (url: string) => {
      pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, id]);

  if (!id) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'granted'
            });
            gtag('js', new Date());
            gtag('config', '${id}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
