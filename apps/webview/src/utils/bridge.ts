class WebViewBridge {
  private messageHandlers: Map<string, (data: any) => void>;
  private cleanup: (() => void) | null = null;

  constructor() {
    this.messageHandlers = new Map();
    this.setupMessageListener();
  }

  private setupMessageListener() {
    // React Native 앱으로부터 메시지 수신
    const handleMessage = (event: MessageEvent) => {
      try {
        let data;

        // event.data가 이미 객체인 경우와 문자열인 경우 모두 처리
        if (typeof event.data === 'string') {
          data = JSON.parse(event.data);
        } else if (typeof event.data === 'object' && event.data !== null) {
          data = event.data;
        } else {
          console.warn('Invalid message data format:', event.data);
          return;
        }

        this.handleMessage(data);
      } catch (error) {
        console.error('Failed to parse message:', error);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('message', handleMessage);
      this.cleanup = () => window.removeEventListener('message', handleMessage);
    }
  }

  private handleMessage(data: any) {
    const handler = this.messageHandlers.get(data.type);
    if (handler) {
      handler(data);
    } else {
      console.warn('No handler for message type:', data.type);
    }
  }

  // 메시지 핸들러 등록
  on(type: string, handler: (data: any) => void) {
    this.messageHandlers.set(type, handler);
  }

  // 앱으로 메시지 전송
  sendToApp(type: string, data: any = {}) {
    const message = { type, ...data };
    
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(message));
    } else {
      console.log('ReactNativeWebView not available, message would be:', message);
    }
  }

  // 브릿지 정리
  destroy() {
    if (this.cleanup) {
      this.cleanup();
      this.cleanup = null;
    }
    this.messageHandlers.clear();
  }
}

export const bridge = new WebViewBridge();

// TypeScript를 위한 전역 타입 선언
declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}
