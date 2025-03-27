import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

import { powerStateAtom } from './powerState';

export type GameType = 'character' | 'basketball' | 'quiz' | null;

export interface GameState {
  activeGame: GameType;
  pendingGame: GameType;
  showDialog: boolean;
  totalScore: number;
  highScore: number;
  showScorePopup: boolean;
  scorePopupValue: number;
  scorePopupPosition: { x: number; y: number };
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
};

export const gameStateAtom = atomWithReset<GameState>(initialGameState);

export const startGameAtom = atom(
  (get) => get(gameStateAtom).activeGame,
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

export const addScoreAtom = atom(
  (get) => get(gameStateAtom).totalScore,
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

export const confirmDialogAtom = atom(null, (get, set) => {
  const state = get(gameStateAtom);
  if (state.pendingGame) {
    // 대기 중인 게임 시작
    set(startGameAtom, state.pendingGame);
  }
});

export const cancelDialogAtom = atom(null, (get, set) => {
  const state = get(gameStateAtom);
  set(gameStateAtom, {
    ...state,
    pendingGame: null,
    showDialog: false,
  });
});

export const hideScorePopupAtom = atom(null, (get, set) => {
  const state = get(gameStateAtom);
  set(gameStateAtom, {
    ...state,
    showScorePopup: false,
  });
});

export const handleButtonPressAtom = atom(null, (get, set, index: number) => {
  if (!get(powerStateAtom).isPowered) return;

  const gameState = get(gameStateAtom);
  // 게임 선택
  const gameToStart: GameType = index === 0 ? 'character' : index === 1 ? 'basketball' : index === 2 ? 'quiz' : null;

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
});
