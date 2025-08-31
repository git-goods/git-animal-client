// React Native WebView interface declarations
interface Window {
  ReactNativeWebView?: {
    postMessage: (message: string) => void;
  };
}