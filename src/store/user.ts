import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { UserType } from '@/apis/user/useGetUser';
import { getUserByToken } from '@/apis/user/useGetUser';

interface UserStore extends UserType {
  isLogin: boolean;
  login: (token: string) => Promise<void>;
  token: string;
}

const useUserStore = create(
  persist<UserStore>(
    (set, get) => ({
      // user info
      id: '',
      username: '',
      points: '',
      profileImage: '',

      // login
      token: '',
      isLogin: false,
      login: async (token: string) => {
        set({ token, isLogin: true });
        const res = await getUserByToken(token);
        set({ ...res });
      },
    }),
    {
      // onRehydrateStorage: () => {
      //   // optional
      //   return (state, error) => {
      //     if (!state) return;
      //   };
      // },
      name: 'user-storage', // name of the item in the storage (must be unique)
    },
  ),
);

export const useUser = () =>
  useUserStore((state) => ({
    username: state.username,
    isLogin: state.isLogin,
  }));

export const getToken = () => useUserStore.getState().token;
export const useLogin = () => useUserStore((state) => ({ login: state.login }));
