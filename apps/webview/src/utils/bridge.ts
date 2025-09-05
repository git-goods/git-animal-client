class WebViewBridge {
  private messageHandlers: Map<string, (data: any) => void>;
  private cleanup: (() => void) | null = null;
  private messageQueue: Array<{ data: any; timestamp: number }> = [];
  private isInitialized: boolean = false;

  constructor() {
    this.messageHandlers = new Map();
    console.log('WebViewBridge constructor called');
    this.setupMessageListener();

    // 1초 후에 초기화 완료로 설정하고 큐된 메시지들 처리
    setTimeout(() => {
      this.isInitialized = true;
      console.log('Bridge initialization completed, processing queued messages...');
      this.processQueuedMessages();

      // 앱에 초기화 완료 신호 전송
      this.sendToApp('BRIDGE_READY', { timestamp: Date.now() });
    }, 1000);
  }

  private setupMessageListener() {
    // React Native WebView의 postMessage를 받기 위한 이벤트 리스너
    if (typeof window !== 'undefined') {
      const handleMessage = (event: MessageEvent) => {
        console.log('Message event received: ' + JSON.stringify(event.data));
        alert('Message event received: ' + JSON.stringify(event.data));
        try {
          let data;

          // event.data가 이미 객체인 경우와 문자열인 경우 모두 처리
          if (typeof event.data === 'string') {
            data = JSON.parse(event.data);
          } else if (typeof event.data === 'object' && event.data !== null) {
            data = event.data;
          } else {
            console.log('Invalid message data format: ' + event.data);
            return;
          }

          console.log('Parsed message data: ' + JSON.stringify(data));
          this.handleMessage(data);
        } catch (error) {
          console.log('Failed to parse message: ' + error);
        }
      };

      window.addEventListener('message', handleMessage);

      this.cleanup = () => {
        window.removeEventListener('message', handleMessage);
      };
    }
  }

  private handleMessage(data: any) {
    console.log('Bridge received message: ' + JSON.stringify(data));
    console.log('Message type: ' + (data.type || 'undefined'));
    alert('Bridge initialized: ' + this.isInitialized + ', ' + data.type || '');

    // 초기화가 완료되지 않았다면 메시지를 큐에 저장
    if (!this.isInitialized) {
      console.log('Bridge not initialized yet, queuing message...');
      this.messageQueue.push({ data, timestamp: Date.now() });
      return;
    }

    console.log('Available handlers: ' + Array.from(this.messageHandlers.keys()).join(', '));
    console.log('Handler map size: ' + this.messageHandlers.size);

    const handler = this.messageHandlers.get(data.type);
    console.log('Found handler: ' + (handler ? typeof handler : 'null'));

    if (handler) {
      console.log('Handler found for type: ' + data.type);
      try {
        handler(data);
        console.log('Handler executed successfully');
      } catch (error) {
        console.log('Handler execution failed: ' + error);
      }
    } else {
      console.log('No handler for message type: ' + data.type);
    }
  }

  private processQueuedMessages() {
    console.log('Processing ' + this.messageQueue.length + ' queued messages...');
    while (this.messageQueue.length > 0) {
      const queuedMessage = this.messageQueue.shift();
      if (queuedMessage) {
        console.log('Processing queued message: ' + JSON.stringify(queuedMessage.data));
        this.handleMessage(queuedMessage.data);
      }
    }
  }

  // 메시지 핸들러 등록
  on(type: string, handler: (data: any) => void) {
    // alert('Registering handler for type: ' + type);
    console.log('Registering handler for type: ' + type + ', handler: ' + typeof handler);
    this.messageHandlers.set(type, handler);
    console.log('Current handlers: ' + Array.from(this.messageHandlers.keys()).join(', '));
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
