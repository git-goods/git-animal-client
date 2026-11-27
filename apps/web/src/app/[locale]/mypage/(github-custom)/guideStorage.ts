import { LOCAL_STORAGE_KEY } from '@/constants/storage';

// ⬇️ localStorage ↔ sessionStorage 교체 지점: 이 한 줄만 변경하면 됨
const storage = (): Storage | null => (typeof window === 'undefined' ? null : window.localStorage);

// 저장소를 못 읽으면(차단된 쿠키 등) 본 것으로 쳐서 안내를 띄우지 않는다
export const hasSeen = (key: string): boolean => {
  try {
    return storage()?.getItem(key) === 'true';
  } catch {
    return true;
  }
};

export const markSeen = (key: string): void => {
  try {
    storage()?.setItem(key, 'true');
  } catch {}
};

export const hasSeenGithubGuide = () => hasSeen(LOCAL_STORAGE_KEY.githubGuideSeen);
export const markGithubGuideSeen = () => markSeen(LOCAL_STORAGE_KEY.githubGuideSeen);
