import { parseAsStringLiteral, useQueryState } from 'nuqs';

import { DEV_MODE_KEY } from './constants';

export const useDevMode = () => {
  const [isDevMode, setIsDevMode] = useQueryState(
    DEV_MODE_KEY,
    parseAsStringLiteral(['true', 'false']).withDefault('false'),
  );

  return {
    isDevMode,
    setIsDevMode,
  };
};
