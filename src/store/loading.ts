import { atom, useAtom } from 'jotai';

export type LoadingProps = boolean;

export const loadingAtom = atom<LoadingProps>(false);

// loading true 또는 false를 받아 변경
export const setLoading = atom(null, (get, set, loading: LoadingProps) => {
  set(loadingAtom, loading);
});

export const useLoading = () => {
  const [loading, setLoading] = useAtom(loadingAtom);

  return { loading, setLoading };
};
