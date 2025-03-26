'use client';

import { useEffect, useState } from 'react';

interface GameDialogProps {
  currentGame: string | null;
  newGame: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function GameDialog({ currentGame, newGame, onConfirm, onCancel }: GameDialogProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Animation effect
  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  // Get game name for display
  const getGameName = (game: string | null) => {
    switch (game) {
      case 'character':
        return '캐릭터 게임';
      case 'basketball':
        return '농구 게임';
      case 'quiz':
        return '퀴즈 게임';
      default:
        return '게임';
    }
  };

  return (
    <div
      className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div className="bg-gray-800 border-4 border-blue-500 rounded-lg p-6 max-w-md w-full">
        <h2 className="text-white font-mono text-2xl font-bold mb-4 text-center">게임 전환</h2>

        <p className="text-white font-mono text-lg mb-6 text-center">
          {getGameName(currentGame)}에서 {getGameName(newGame)}(으)로 전환하시겠습니까?
          <br />
          <span className="text-yellow-300 text-sm">(현재 게임의 진행 상황은 저장되지 않습니다)</span>
        </p>

        <div className="flex justify-center gap-4">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
            onClick={onConfirm}
          >
            확인
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded" onClick={onCancel}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
