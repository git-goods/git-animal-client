import { LOCAL_STORAGE_KEY } from '@/constants/storage';

const storage = (): Storage | null => (typeof window === 'undefined' ? null : window.localStorage);

const KEY = LOCAL_STORAGE_KEY.githubGuideSeen;

export const hasSeenGithubGuide = (): boolean => storage()?.getItem(KEY) === 'true';

export const markGithubGuideSeen = (): void => {
  try {
    storage()?.setItem(KEY, 'true');
  } catch {}
};
