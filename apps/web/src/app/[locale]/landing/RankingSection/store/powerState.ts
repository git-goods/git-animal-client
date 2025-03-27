import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

// 게임 상태 타입 정의 (최소한으로 필요한 부분만)
export interface GameStateAtom {
  activeGame: any;
  totalScore: number;
  [key: string]: any;
}

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

// 함수로 감싸서 매번 새로운 atom 인스턴스를 생성하도록 함
export const createPowerStateAtoms = () => {
  // 기본 상태 atom
  const powerStateAtom = atomWithReset<PowerState>(initialPowerState);

  // 전원 토글 액션 atom
  const togglePowerAtom = atom(
    null, // read 함수 없음
    (get, set) => {
      const powerState = get(powerStateAtom);

      if (powerState.isPowered) {
        // 전원 끄기
        set(powerStateAtom, {
          ...powerState,
          shuttingDown: true,
        });

        // 애니메이션 후 전원 끄기
        setTimeout(() => {
          set(powerStateAtom, {
            ...get(powerStateAtom),
            isPowered: false,
            shuttingDown: false,
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

  // 전원 상태 게터 atom (읽기 전용)
  const isPoweredAtom = atom((get) => get(powerStateAtom).isPowered);

  return {
    powerStateAtom,
    togglePowerAtom,
    isPoweredAtom,
  };
};
