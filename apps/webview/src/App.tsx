import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import AuthWrapper from './components/auth/AuthWrapper';
import { useEffect } from 'react';
import { initializeBridge, cleanupBridge } from './bridge';

function App() {
  useEffect(() => {
    // 브릿지 초기화
    initializeBridge();

    // 컴포넌트 언마운트 시 브릿지 정리
    return () => {
      cleanupBridge();
    };
  }, []);

  return (
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
  );
}

export default App;
