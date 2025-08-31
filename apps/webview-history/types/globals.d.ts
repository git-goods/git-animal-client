declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SLACK_ERROR_CHANNEL_WEBHOOK_URL: string;
  }
}

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

export {};
