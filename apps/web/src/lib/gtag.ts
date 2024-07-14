const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? 'G-RNEDVMFT5X';

export const pageview = (url: URL) => {
  if (process.env.NODE_ENV !== 'production') return;

  if (typeof window !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

interface GTagEvent {
  action: string;
  category?: string;
  label?: string;
  value?: string;
}

export const event = ({ action, category, label, value }: GTagEvent) => {
  if (process.env.NODE_ENV !== 'production') return;

  if (typeof window !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const recordEvent = event;
