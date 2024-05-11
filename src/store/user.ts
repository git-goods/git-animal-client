import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { getUserByToken } from '@/apis/user/useGetUser';
import type { UserSchema } from '@/schema/user';

interface UserStore extends UserSchema {
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
    profileImage: state.profileImage,
    points: state.points,
    id: state.id,
    isLogin: state.isLogin,
  }));

export const getToken = () => useUserStore.getState().token;
export const useLogin = () => useUserStore((state) => ({ login: state.login }));
