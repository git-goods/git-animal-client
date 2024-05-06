import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  username: string;
  setUsername: (username: string) => void;
  isLogin: boolean;
}

const useUserStore = create(
  persist<UserStore>(
    (set, get) => ({
      username: '',
      setUsername: (username: string) => set({ username, isLogin: true }),
      isLogin: false,
    }),
    {
      onRehydrateStorage: (state) => {
        console.log('hydration starts');

        // optional
        return (state, error) => {
          if (!state) return;

          if (state.username !== '') {
            state.isLogin = true;
          }

          if (error) {
            console.log('an error happened during hydration', error);
          }
        };
      },
      name: 'user-storage', // name of the item in the storage (must be unique)
    },
  ),
);

export const useUser = () =>
  useUserStore((state) => ({
    username: state.username,
    setUsername: state.setUsername,
    isLogin: state.isLogin,
  }));
