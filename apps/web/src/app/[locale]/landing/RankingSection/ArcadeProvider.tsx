'use client';

import { createContext, type PropsWithChildren, useContext, useEffect, useMemo } from 'react';
import { createStore, Provider } from 'jotai';
import { useAtom, useSetAtom } from 'jotai';

import { createGameStateAtoms } from './store/gameState';
import { createPowerStateAtoms } from './store/powerState';

// 모든 atom들을 담을 타입 정의
export interface ArcadeAtoms {
  // 파워 상태 관련 atom들
  powerStateAtom: ReturnType<typeof createPowerStateAtoms>['powerStateAtom'];
  togglePowerAtom: ReturnType<typeof createPowerStateAtoms>['togglePowerAtom'];
  isPoweredAtom: ReturnType<typeof createPowerStateAtoms>['isPoweredAtom'];

  // 게임 상태 관련 atom들
  gameStateAtom: ReturnType<typeof createGameStateAtoms>['gameStateAtom'];
  startGameAtom: ReturnType<typeof createGameStateAtoms>['startGameAtom'];
  addScoreAtom: ReturnType<typeof createGameStateAtoms>['addScoreAtom'];
  confirmDialogAtom: ReturnType<typeof createGameStateAtoms>['confirmDialogAtom'];
  cancelDialogAtom: ReturnType<typeof createGameStateAtoms>['cancelDialogAtom'];
  hideScorePopupAtom: ReturnType<typeof createGameStateAtoms>['hideScorePopupAtom'];
  handleButtonPressAtom: ReturnType<typeof createGameStateAtoms>['handleButtonPressAtom'];
}

// Context 생성
const ArcadeAtomsContext = createContext<ArcadeAtoms | null>(null);

// Atoms 동기화를 처리하는 내부 컴포넌트
function AtomsSynchronizer({ atoms }: { atoms: ArcadeAtoms }) {
  // 필요한 상태들 가져오기
  const [powerState] = useAtom(atoms.powerStateAtom);
  const resetGameState = useSetAtom(atoms.gameStateAtom);

  // 전원이 꺼질 때 게임 상태 초기화
  useEffect(() => {
    if (powerState.shuttingDown) {
      // 애니메이션 후 초기화
      const timer = setTimeout(() => {
        resetGameState((prevState) => ({
          ...prevState,
          activeGame: null,
          totalScore: 0,
        }));
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [powerState.shuttingDown, resetGameState]);

  return null;
}

/**
 * Arcade 게임을 위한 지역 상태 Provider
 * powerStateAtom과 gameStateAtom을 지역적으로 관리합니다.
 */
export default function ArcadeProvider({ children }: PropsWithChildren) {
  // 각 ArcadeProvider 인스턴스마다 독립적인 jotai store 생성
  const arcadeStore = createStore();

  // 독립적인 atom 인스턴스들 생성
  const atoms = useMemo(() => {
    // 파워 상태 atom들 생성
    const powerAtoms = createPowerStateAtoms();

    // 게임 상태 atom들 생성 (파워 상태 atom 참조 전달)
    const gameAtoms = createGameStateAtoms(powerAtoms.powerStateAtom);

    // 모든 atom들을 하나의 객체로 합침
    return {
      ...powerAtoms,
      ...gameAtoms,
    } as ArcadeAtoms;
  }, []);

  return (
    <ArcadeAtomsContext.Provider value={atoms}>
      <Provider store={arcadeStore}>
        <AtomsSynchronizer atoms={atoms} />
        {children}
      </Provider>
    </ArcadeAtomsContext.Provider>
  );
}

// atom들에 쉽게 접근하기 위한 hook
export function useArcadeAtoms() {
  const atoms = useContext(ArcadeAtomsContext);
  if (!atoms) {
    throw new Error('useArcadeAtoms must be used within an ArcadeProvider');
  }
  return atoms;
}
