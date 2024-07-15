import { useUser } from '@/store/user';

export const DEV_USERNAMES = ['sumi-0011', 'hyesungoh', 'git-good-w'];

export const useDevAccess = () => {
  const { username } = useUser();

  const isDevAccessPossible = DEV_USERNAMES.includes(username);

  return { isDevAccessPossible };
};
