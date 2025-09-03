import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/layout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { ROUTES, NESTED_PATHS } from './constants';
import WebviewPage from '@/pages/home/page';
import DevPage from '@/pages/dev/page';
import LoginPage from '@/pages/LoginPage';
import MyPagePage from '@/pages/MypagePage';
import NotFoundPage from '@/pages/NotFoundPage';
import GamePage from '@/pages/game/page';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      // 보호된 라우트들 (인증 필요)
      {
        index: true,
        element: (
          <ProtectedRoute>
            <WebviewPage />
            {/* <HomePage /> */}
          </ProtectedRoute>
        ),
      },
      {
        path: NESTED_PATHS.GAME(),
        element: (
          <ProtectedRoute>
            <GamePage />
          </ProtectedRoute>
        ),
      },
      {
        path: NESTED_PATHS.MYPAGE(),
        element: (
          <ProtectedRoute>
            <MyPagePage />
          </ProtectedRoute>
        ),
      },
      // 공개 라우트들 (인증 불필요)
      {
        path: NESTED_PATHS.AUTH(),
        element: <LoginPage />,
      },
      {
        path: 'dev',
        element: <DevPage />,
      },
      // 404 페이지 (모든 경로에 매치되지 않은 경우)
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
