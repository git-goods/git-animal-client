import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import AuthWrapper from './components/auth/AuthWrapper';

function App() {
  return (
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
  );
}

export default App;
