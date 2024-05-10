import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import type { QueryClientConfig } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider as BaseQueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClientOption: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
};

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient(queryClientOption));

  return (
    <BaseQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </BaseQueryClientProvider>
  );
};

export default QueryClientProvider;
