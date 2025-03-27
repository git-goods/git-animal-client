import { css } from '_panda/css';
import { useAtom, useSetAtom } from 'jotai';

import CharacterGame from '../_game/character-game';
import QuizGame from '../_game/quiz-game';
import { useArcadeAtoms } from '../ArcadeProvider';

import GameDialog from './GameDialog';

export function ScreenContent({ joystickDirection }: { joystickDirection: { x: number; y: number } }) {
  const {
    powerStateAtom,
    togglePowerAtom,
    gameStateAtom,
    handleButtonPressAtom,
    startGameAtom,
    addScoreAtom,
    confirmDialogAtom,
    cancelDialogAtom,
    exitGameAtom,
  } = useArcadeAtoms();
  const [{ isPowered, bootingUp, shuttingDown }] = useAtom(powerStateAtom);

  // Game state
  const [
    { activeGame, pendingGame, showDialog, totalScore, highScore, showScorePopup, scorePopupValue, scorePopupPosition },
  ] = useAtom(gameStateAtom);

  const addScore = useSetAtom(addScoreAtom);
  const exitGame = useSetAtom(exitGameAtom);

  const togglePower = useSetAtom(togglePowerAtom);
  const handleButtonPress = useSetAtom(handleButtonPressAtom);
  const handleDialogConfirm = useSetAtom(confirmDialogAtom);
  const handleDialogCancel = useSetAtom(cancelDialogAtom);
  return (
    <div
      className={css({
        width: '100%',
        height: '100%',
        position: 'relative',
      })}
      style={{
        opacity: isPowered ? 1 : 0,
        transition: bootingUp ? 'opacity 1.5s ease-in' : shuttingDown ? 'opacity 0.5s ease-out' : 'opacity 0.2s',
      }}
    >
      {/* Score Display */}
      <div
        className={css({
          position: 'absolute',
          top: '2px',
          left: '5px',
          zIndex: '10',
        })}
      >
        <div
          className={css({
            bg: '#000033',
            border: '2px solid white',
            borderRadius: 'rounded',
            px: '3',
            py: '1',
          })}
        >
          <span
            className={css({
              color: 'white',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              fontSize: '16px',
            })}
          >
            SCORE: {totalScore}
          </span>
        </div>
      </div>

      {/* High Score Display */}
      <div className="absolute top-2 right-5 z-10">
        <div
          className={css({
            bg: '#330033',
            border: '2px solid white',
            borderRadius: 'rounded',
            px: '3',
            py: '1',
          })}
        >
          <span
            className={css({
              color: 'white',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              fontSize: '16px',
            })}
          >
            HIGH: {highScore}
          </span>
        </div>
      </div>

      {/* Score Popup Animation */}
      {showScorePopup && (
        <div
          className={css({
            position: 'absolute',
            zIndex: '20',
            transition: 'opacity 0.5s',
          })}
          style={{
            left: scorePopupPosition.x,
            top: scorePopupPosition.y,
            opacity: showScorePopup ? 1 : 0,
          }}
        >
          <span
            className={css({
              color: 'yellow',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              fontSize: '24px',
            })}
            style={{
              textShadow: '0 0 5px #FF0000',
              transform: 'translate(-50%, -50%)',
              display: 'block',
            }}
          >
            +{scorePopupValue}
          </span>
        </div>
      )}

      {/* Welcome Screen (when no game is active) */}
      {!activeGame && (
        <div
          className={css({
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          <div className="text-white font-mono text-xl mb-8">게임을 선택하세요</div>

          <div className="flex gap-8">
            <div
              className="bg-[#01BB66] hover:bg-[#00A057] text-white font-bold py-3 px-6 rounded cursor-pointer"
              onClick={() => handleButtonPress(0)}
            >
              캐릭터 게임
            </div>
            <div
              className="bg-[#00D1A7] hover:bg-[#00B294] text-white font-bold py-3 px-6 rounded cursor-pointer"
              onClick={() => handleButtonPress(1)}
            >
              농구 게임
            </div>
            <div
              className="bg-[#198BE5] hover:bg-[#1A77C0] text-white font-bold py-3 px-6 rounded cursor-pointer"
              onClick={() => handleButtonPress(2)}
            >
              퀴즈 게임
            </div>
          </div>

          <div className="mt-16 text-white font-mono text-sm">
            <p>조작 방법: 방향키 또는 조이스틱으로 이동</p>
            <p>스페이스바 또는 버튼 클릭으로 선택</p>
          </div>
        </div>
      )}
      {activeGame === 'character' && (
        <CharacterGame
          joystickDirection={joystickDirection}
          addScore={(points, x, y) => {
            addScore({ points, position: { x, y } });
          }}
          onExit={exitGame}
        />
      )}
      {/* Active Game */}
      {/* 


*/}
      {activeGame === 'basketball' && (
        <div className="text-white font-mono text-xl mb-8">준비중입니다</div>
        // <BasketballGame joystickDirection={joystickDirection} addScore={addScore} onExit={() => {}} />
      )}
      {/* Game Switch Dialog */}
      {activeGame === 'quiz' && (
        <QuizGame
          addScore={(points, x, y) => {
            addScore({ points, position: { x, y } });
          }}
          onExit={exitGame}
        />
      )}
      {showDialog && (
        <GameDialog
          currentGame={activeGame}
          newGame={pendingGame}
          onConfirm={handleDialogConfirm}
          onCancel={handleDialogCancel}
        />
      )}
    </div>
  );
}
