import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import AuthWrapper from './components/auth/AuthWrapper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthWrapper>
        <RouterProvider router={router} />
      </AuthWrapper>
    </QueryClientProvider>
  );
}

export default App;
