'use client';

import { useEffect, useState } from 'react';
import { css } from '_panda/css';

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
      className={css({
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        transition: 'opacity 0.3s',
        opacity: isVisible ? 1 : 0,
      })}
    >
      <div
        className={css({
          backgroundColor: '#1F2937',
          border: '4px solid #3B82F6',
          borderRadius: '8px',
          padding: '24px',
          maxWidth: '28rem',
          width: '100%',
        })}
      >
        <h2
          className={css({
            color: '#FFFFFF',
            fontFamily: 'monospace',
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '16px',
            textAlign: 'center',
          })}
        >
          게임 전환
        </h2>

        <p
          className={css({
            color: '#FFFFFF',
            fontFamily: 'monospace',
            fontSize: '18px',
            marginBottom: '24px',
            textAlign: 'center',
          })}
        >
          {getGameName(currentGame)}에서 {getGameName(newGame)}(으)로 전환하시겠습니까?
          <br />
          <span
            className={css({
              color: '#FDE047',
              fontSize: '14px',
            })}
          >
            (현재 게임의 진행 상황은 저장되지 않습니다)
          </span>
        </p>

        <div
          className={css({
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
          })}
        >
          <button
            className={css({
              backgroundColor: '#059669',
              '&:hover': { backgroundColor: '#047857' },
              color: '#FFFFFF',
              fontWeight: 'bold',
              padding: '8px 24px',
              borderRadius: '4px',
            })}
            onClick={onConfirm}
          >
            확인
          </button>
          <button
            className={css({
              backgroundColor: '#DC2626',
              '&:hover': { backgroundColor: '#B91C1C' },
              color: '#FFFFFF',
              fontWeight: 'bold',
              padding: '8px 24px',
              borderRadius: '4px',
            })}
            onClick={onCancel}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
