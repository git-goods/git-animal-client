import { atom, useAtom } from 'jotai';

export type LoadingProps = boolean;

export const loadingAtom = atom<LoadingProps>(false);

export const setLoading = atom(null, (get, set, loading: LoadingProps) => {
  set(loadingAtom, loading);
});

export const useLoading = () => {
  const [loading, setLoading] = useAtom(loadingAtom);

  return { loading, setLoading };
};
