import { data, RouterProvider } from 'react-router-dom';
import { router } from './router';
import AuthWrapper from './components/auth/AuthWrapper';
import { useEffect } from 'react';
import { initializeBridge, cleanupBridge } from './bridge';
import { authUtils } from './utils';

function App() {
  useEffect(() => {
    // 브릿지 초기화
    initializeBridge();

    const _handleMessage = (event: MessageEvent) => {
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

      switch (data.type) {
        case 'SET_TOKEN':
          authUtils.setTokensFromParent(data.token);
          // authUtils.setTokensFromParent(data.accessToken, data.refreshToken);
          break;
      }

      alert('Message event received: ' + JSON.stringify(event.data));
    };

    window.addEventListener('message', _handleMessage);

    // 컴포넌트 언마운트 시 브릿지 정리
    return () => {
      cleanupBridge();
      window.removeEventListener('message', _handleMessage);
    };
  }, []);

  return (
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
  );
}

export default App;
