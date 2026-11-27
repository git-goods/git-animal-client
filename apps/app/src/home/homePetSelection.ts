import AsyncStorage from '@react-native-async-storage/async-storage';

// GitHub 농장의 visible 과 별개로, 앱 홈에 보일 펫을 기기에 계정별로 저장한다
const keyOf = (username: string) => `gitanimals.homePets.${username}`;

export const homePetsKey = (username: string) => ['homePets', username] as const;

export async function loadHomePets(username: string): Promise<string[] | null> {
  const raw = await AsyncStorage.getItem(keyOf(username));
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : null;
  } catch {
    return null;
  }
}

export async function saveHomePets(username: string, ids: string[]): Promise<void> {
  await AsyncStorage.setItem(keyOf(username), JSON.stringify(ids));
}

export const homePetsOptions = (username: string) => ({
  queryKey: homePetsKey(username),
  queryFn: () => loadHomePets(username),
  staleTime: Infinity,
  enabled: !!username,
});
