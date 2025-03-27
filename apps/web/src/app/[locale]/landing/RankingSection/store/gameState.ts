import type { Atom } from 'jotai';
import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

export type GameType = 'character' | 'basketball' | 'quiz' | null;

interface PowerState {
  isPowered: boolean;
}

export interface GameState {
  activeGame: GameType;
  pendingGame: GameType;
  showDialog: boolean;
  totalScore: number;
  highScore: number;
  showScorePopup: boolean;
  scorePopupValue: number;
  scorePopupPosition: { x: number; y: number };
  exitGame: () => void;
}

const initialGameState: GameState = {
  activeGame: null,
  pendingGame: null,
  showDialog: false,
  totalScore: 0,
  highScore: 0,
  showScorePopup: false,
  scorePopupValue: 0,
  scorePopupPosition: { x: 0, y: 0 },
  exitGame: () => {},
};

// 함수로 감싸서 매번 새로운 atom 인스턴스를 생성하도록 함
export const createGameStateAtoms = (powerStateAtom: Atom<PowerState>) => {
  // 기본 상태 atom
  const gameStateAtom = atomWithReset<GameState>(initialGameState);

  // 게임 시작 atom
  const startGameAtom = atom(
    null, // read 함수 없음
    (get, set, gameType: GameType) => {
      const state = get(gameStateAtom);
      const currentActiveGame = state.activeGame;

      if (currentActiveGame !== gameType) {
        // 다른 게임으로 전환 시 점수 초기화
        set(gameStateAtom, {
          ...state,
          activeGame: gameType,
          pendingGame: null,
          showDialog: false,
          totalScore: 0,
        });
      } else {
        // 같은 게임인 경우 점수 유지
        set(gameStateAtom, {
          ...state,
          activeGame: gameType,
          pendingGame: null,
          showDialog: false,
        });
      }
    },
  );

  // 점수 추가 atom
  const addScoreAtom = atom(
    null, // read 함수 없음
    (get, set, params: { points: number; position: { x: number; y: number } }) => {
      const { points, position } = params;
      const state = get(gameStateAtom);
      const newScore = state.totalScore + points;
      const newHighScore = Math.max(state.highScore, newScore);

      set(gameStateAtom, {
        ...state,
        totalScore: newScore,
        highScore: newHighScore,
        showScorePopup: true,
        scorePopupValue: points,
        scorePopupPosition: position,
      });
    },
  );

  // 다이얼로그 확인 atom
  const confirmDialogAtom = atom(
    null, // read 함수 없음
    (get, set) => {
      const state = get(gameStateAtom);
      if (state.pendingGame) {
        // 대기 중인 게임 시작
        set(startGameAtom, state.pendingGame);
      }
    },
  );

  // 다이얼로그 취소 atom
  const cancelDialogAtom = atom(
    null, // read 함수 없음
    (get, set) => {
      const state = get(gameStateAtom);
      set(gameStateAtom, {
        ...state,
        pendingGame: null,
        showDialog: false,
      });
    },
  );

  // 점수 팝업 숨김 atom
  const hideScorePopupAtom = atom(
    null, // read 함수 없음
    (get, set) => {
      const state = get(gameStateAtom);
      set(gameStateAtom, {
        ...state,
        showScorePopup: false,
      });
    },
  );

  // 버튼 클릭 처리 atom
  const handleButtonPressAtom = atom(
    null, // read 함수 없음
    (get, set, index: number) => {
      if (!get(powerStateAtom).isPowered) return;

      const gameState = get(gameStateAtom);
      console.log('gameState: ', gameState, index);
      // 게임 선택
      const gameToStart: GameType =
        index === 0 ? 'character' : index === 1 ? 'basketball' : index === 2 ? 'quiz' : null;

      console.log('gameToStart: ', gameToStart);
      if (gameToStart) {
        if (gameState.activeGame && gameState.activeGame !== gameToStart) {
          // 다른 게임이 이미 활성화된 경우, 확인 대화 상자 표시
          set(gameStateAtom, {
            ...gameState,
            pendingGame: gameToStart,
            showDialog: true,
          });
        } else {
          // 같은 게임이거나 게임이 없는 경우 직접 시작
          set(startGameAtom, gameToStart);
        }
      }
    },
  );

  // 게임 종료 atom
  const exitGameAtom = atom(
    null, // read 함수 없음
    (get, set) => {
      set(gameStateAtom, {
        ...get(gameStateAtom),
        activeGame: null,
        pendingGame: null,
        showDialog: false,
      });
    },
  );

  return {
    gameStateAtom,
    startGameAtom,
    addScoreAtom,
    confirmDialogAtom,
    cancelDialogAtom,
    hideScorePopupAtom,
    handleButtonPressAtom,
    exitGameAtom,
  };
};
