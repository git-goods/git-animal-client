import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { getUserByToken } from '@/apis/user/useGetUser';
import type { UserSchema } from '@/schema/user';

interface UserStore extends UserSchema {
  isLogin: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  token: string;
  setUserData: (data: UserSchema) => void;
}

const initialState: UserStore = {
  // user info
  id: '',
  username: '',
  points: '',
  profileImage: '',
  setUserData: () => {},
  // login
  token: '',
  isLogin: false,
  login: async () => {},
  logout: () => {},
};

const useUserStore = create(
  persist<UserStore>(
    (set, get) => ({
      ...initialState,

      // login
      login: async (token: string) => {
        set({ token, isLogin: true });
        const res = await getUserByToken(token);
        set({ ...res });
      },
      logout() {
        set({ ...initialState });
      },
      setUserData: (data: UserSchema) => {
        set({ ...data });
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

/**
 * @deprecated
 */
export const useUser = () =>
  useUserStore((state) => ({
    username: state.username,
    profileImage: state.profileImage,
    id: state.id,
    isLogin: state.isLogin,
  }));

export const useSetUserData = () => useUserStore((state) => ({ setUserData: state.setUserData }));

export const getToken = () => useUserStore.getState().token;
export const useLogin = () => useUserStore((state) => ({ login: state.login }));
export const logout = () => useUserStore.getState().logout();
