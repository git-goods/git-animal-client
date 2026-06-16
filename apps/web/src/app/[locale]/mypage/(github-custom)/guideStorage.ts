import { LOCAL_STORAGE_KEY } from '@/constants/storage';

// ⬇️ localStorage ↔ sessionStorage 교체 지점: 이 한 줄만 변경하면 됨
const storage = (): Storage | null => (typeof window === 'undefined' ? null : window.localStorage);

const KEY = LOCAL_STORAGE_KEY.githubGuideSeen;

export const hasSeenGithubGuide = (): boolean => storage()?.getItem(KEY) === 'true';

export const markGithubGuideSeen = (): void => {
  try {
    storage()?.setItem(KEY, 'true');
  } catch {}
};
