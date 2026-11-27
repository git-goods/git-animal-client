export const DEV_MODE_KEY = 'devMode';

export const parseDevModeFromSearchParams = (devMode: string) => {
  return devMode === 'true' || process.env.NODE_ENV === 'development';
};
