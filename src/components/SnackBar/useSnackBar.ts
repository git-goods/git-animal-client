import { useCallback } from 'react';
import { useAtom } from 'jotai';

import type { SnackBarProps } from '@/store/snackBar';
import { snackBarsAtom } from '@/store/snackBar';
import { generateId } from '@/utils/generateId';

const DEFAULT_DURATION = 3000;

export const useSnackBar = () => {
  const [snackBars, setSnackBars] = useAtom(snackBarsAtom);

  const removeSnackBar = useCallback(
    (id: string) => {
      setSnackBars((prev) => prev?.filter((snackBar) => snackBar?.id !== id));
    },
    [setSnackBars],
  );

  const showSnackBar = useCallback(
    async ({ duration = DEFAULT_DURATION, ...props }: Omit<SnackBarProps, 'id'>) => {
      const id = generateId();

      setSnackBars((prev) => [...prev, { id, ...props }]);

      const timer: ReturnType<typeof setTimeout> = await new Promise(() =>
        setTimeout(() => {
          removeSnackBar(id);
        }, duration),
      );

      clearTimeout(timer);
    },
    [setSnackBars, removeSnackBar],
  );

  return {
    snackBars,
    showSnackBar,
    removeSnackBar,
  };
};
