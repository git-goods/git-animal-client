import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/layout';
import { HomePage, ProfilePage, SettingsPage, LoginPage, AboutPage, NotFoundPage } from '../pages';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { ROUTES, NESTED_PATHS } from './constants';

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
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: NESTED_PATHS.PROFILE(),
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: NESTED_PATHS.SETTINGS(),
        element: (
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        ),
      },
      // 공개 라우트들 (인증 불필요)
      {
        path: NESTED_PATHS.AUTH(),
        element: <LoginPage />,
      },
      {
        path: NESTED_PATHS.ABOUT(),
        element: <AboutPage />,
      },
      // 404 페이지 (모든 경로에 매치되지 않은 경우)
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
