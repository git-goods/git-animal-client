// import { data, RouterProvider } from 'react-router-dom';
// import { router } from './router';
// import AuthWrapper from './components/auth/AuthWrapper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { NuqsAdapter } from 'nuqs/adapters/react';
import { css } from '_panda/css';
import AuthWrapper from './components/auth/AuthWrapper';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          {/* <AuthWrapper> */}
          <RouterProvider router={router} />
          {/* </AuthWrapper> */}
        </NuqsAdapter>
      </QueryClientProvider>
    </>
  );
}

export default App;
