import type { QueryClientConfig, QueryKey, QueryState } from '@tanstack/react-query';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { isTokenExpiredError } from '@/utils/sessionExpired';

const queryClientOption: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000,
      // 토큰 만료는 세션 만료 다이얼로그가 이미 처리한다. 여기서 다시 던지면
      // 다이얼로그를 띄우고도 화면이 에러 페이지로 교체된다 (gitanimals#509).
      throwOnError: (error) => !isTokenExpiredError(error),
    },
    mutations: {
      // true 면 onError 가 처리한 에러가 렌더 중 다시 throw 되어 페이지가 에러 화면으로 바뀐다.
      throwOnError: false,
      onError: (error) => {
        // 토큰 만료면 세션 만료 다이얼로그가 뜬다. 토스트까지 겹치지 않게 한다.
        if (isTokenExpiredError(error)) return;
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
