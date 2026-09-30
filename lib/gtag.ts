export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "G-07X8RKWCZK";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Log page views
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function" && GA_TRACKING_ID) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

// Log specific events
export const event = ({ action, category, label, value }: GTagEvent) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
