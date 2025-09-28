export const DEV_MODE_KEY = 'devMode';

/**
 * @description devMode 파싱
 * @example
  const isDevMode = parseDevModeFromSearchParams(searchParams.devMode ?? '');
 * @returns boolean 
 */
export const parseDevModeFromSearchParams = (devMode: string) => {
  return devMode === 'true';
};
