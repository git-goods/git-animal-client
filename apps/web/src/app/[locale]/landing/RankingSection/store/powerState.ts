import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

import { gameStateAtom } from './gameState';

export interface PowerState {
  isPowered: boolean;
  bootingUp: boolean;
  shuttingDown: boolean;
}

const initialPowerState: PowerState = {
  isPowered: false,
  bootingUp: false,
  shuttingDown: false,
};

export const powerStateAtom = atomWithReset<PowerState>(initialPowerState);

export const togglePowerAtom = atom(
  (get) => get(powerStateAtom).isPowered,
  (get, set) => {
    const powerState = get(powerStateAtom);

    if (powerState.isPowered) {
      // 전원 끄기
      set(powerStateAtom, {
        ...powerState,
        shuttingDown: true,
      });

      // 애니메이션 후 전원 끄기 및 게임 상태 초기화
      setTimeout(() => {
        set(powerStateAtom, {
          ...get(powerStateAtom),
          isPowered: false,
          shuttingDown: false,
        });

        // 게임 상태도 초기화
        set(gameStateAtom, {
          ...get(gameStateAtom),
          activeGame: null,
          totalScore: 0,
        });
      }, 1000);
    } else {
      // 전원 켜기
      set(powerStateAtom, {
        ...powerState,
        bootingUp: true,
      });

      // 애니메이션 후 전원 켜기
      setTimeout(() => {
        set(powerStateAtom, {
          ...get(powerStateAtom),
          isPowered: true,
          bootingUp: false,
        });
      }, 1500);
    }
  },
);
