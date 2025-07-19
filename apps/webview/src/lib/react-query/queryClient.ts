import type { QueryClientConfig, QueryKey, QueryState } from '@tanstack/react-query';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const queryClientOption: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000,
      throwOnError: true,
    },
    mutations: {
      throwOnError: true,
      onError: (_error) => {
        toast.error('something went wrong 😭');
      },
    },
  },
};

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

interface QueryProps<ResponseType = unknown> {
  queryKey: QueryKey;
  queryFn: () => Promise<ResponseType>;
}

interface DehydratedQueryExtended<TData = unknown, TError = unknown> {
  state: QueryState<TData, TError>;
}

let queryClient: QueryClient | undefined;

export const getQueryClient = () => {
  if (typeof window === 'undefined') {
    return new QueryClient(queryClientOption);
  }

  if (!queryClient) {
    queryClient = new QueryClient(queryClientOption);
  }

  return queryClient;
};

export async function getDehydratedQuery<Q extends QueryProps>({ queryKey, queryFn }: Q) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({ queryKey, queryFn });

  const { queries } = dehydrate(queryClient);

  const [dehydratedQuery] = queries.filter((query) => isEqual(query.queryKey, queryKey));

  return dehydratedQuery as DehydratedQueryExtended<UnwrapPromise<ReturnType<Q['queryFn']>>>;
}

export const Hydrate = HydrationBoundary;

const isEqual = (a: QueryKey, b: QueryKey) => {
  return a.length === b.length && a.every((value, index) => value === b[index]);
};

export async function getDehydratedQueries<Q extends QueryProps[]>(queries: Q) {
  const queryClient = getQueryClient();

  await Promise.all(queries.map(({ queryKey, queryFn }) => queryClient.prefetchQuery({ queryKey, queryFn })));

  return dehydrate(queryClient).queries as DehydratedQueryExtended<UnwrapPromise<ReturnType<Q[number]['queryFn']>>>[];
}
