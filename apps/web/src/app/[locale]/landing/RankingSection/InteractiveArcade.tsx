/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import { useEffect, useState } from 'react';
import { css } from '_panda/css';
import { useAtom, useSetAtom } from 'jotai';
import { setTimeout } from 'timers';

import GameButton from './_assets/GameButton';
import { ScreenWrapperSvg } from './_assets/SvgAssets';
import ControlPanel from './_components/ControlPanel';
import PowerButton from './_components/PowerButton';
import { ScreenContent } from './_components/ScreenContent';
import { useKeyboardControls } from './_hooks/useKeyboardControls';
import { useSound } from './_hooks/useSound';
import ArcadeProvider, { useArcadeAtoms } from './ArcadeProvider';
import { GAME_BUTTON_POSITION, MINI_GAME, MINI_GAME_KEYS } from './constants';

// 실제 Arcade 컴포넌트
function ArcadeComponent() {
  // 커스텀 훅을 통해 atom들 가져오기
  const {
    powerStateAtom,
    togglePowerAtom,
    gameStateAtom,
    handleButtonPressAtom,
    startGameAtom,
    addScoreAtom,
    confirmDialogAtom,
    cancelDialogAtom,
  } = useArcadeAtoms();

  // Power state
  const [{ isPowered, bootingUp, shuttingDown }] = useAtom(powerStateAtom);

  // Game state
  const [
    { activeGame, pendingGame, showDialog, totalScore, highScore, showScorePopup, scorePopupValue, scorePopupPosition },
  ] = useAtom(gameStateAtom);

  // Controls
  const [joystickDirection, setJoystickDirection] = useState({ x: 0, y: 0 });
  const [joystickRotation, setJoystickRotation] = useState(0);
  const [activeButton, setActiveButton] = useState<number | null>(null);

  // Action setters
  const togglePower = useSetAtom(togglePowerAtom);
  const handleButtonPress = useSetAtom(handleButtonPressAtom);
  const startGame = useSetAtom(startGameAtom);
  const addScore = useSetAtom(addScoreAtom);
  const handleDialogConfirm = useSetAtom(confirmDialogAtom);
  const handleDialogCancel = useSetAtom(cancelDialogAtom);

  // Sound effects
  const { playSound } = useSound();

  // Keyboard controls
  const { direction } = useKeyboardControls();

  // Update joystick based on keyboard input
  useEffect(() => {
    if (!isPowered) return;

    setJoystickDirection(direction);

    // Calculate rotation based on direction
    if (direction.x !== 0 || direction.y !== 0) {
      const angle = Math.atan2(direction.y, direction.x) * (180 / Math.PI);
      setJoystickRotation(angle);
    } else {
      setJoystickRotation(0);
    }
  }, [direction, isPowered]);

  // Handle joystick movement via click/touch
  const rotateJoystick = (x: number, y: number) => {
    if (!isPowered) return;

    setJoystickDirection({ x, y });

    // Calculate rotation based on direction
    const angle = Math.atan2(y, x) * (180 / Math.PI);
    setJoystickRotation(angle);

    // Reset joystick after a delay
    setTimeout(() => {
      setJoystickDirection({ x: 0, y: 0 });
      setJoystickRotation(0);
    }, 300);
  };

  return (
    <div className={containerStyle}>
      {/* Power button */}
      <div className={powerButtonStyle}>
        <PowerButton isPowered={isPowered} onClick={togglePower} />
      </div>

      <ScreenWrapperSvg>
        {/* Game Buttons */}
        {MINI_GAME_KEYS.map((key) => (
          <GameButton
            key={key}
            onClick={() => handleButtonPress(MINI_GAME[key].GAME_INDEX)}
            active={activeButton === MINI_GAME[key].GAME_INDEX}
            label={MINI_GAME[key].TITLE}
            startX={GAME_BUTTON_POSITION[key].startX}
            startY={GAME_BUTTON_POSITION[key].startY}
            color={MINI_GAME[key].color}
          />
        ))}

        <foreignObject x="280" y="510" width="1100" height="965">
          <ScreenContent
            isPowered={isPowered}
            bootingUp={bootingUp}
            shuttingDown={shuttingDown}
            totalScore={totalScore}
            highScore={highScore}
            scorePopupPosition={scorePopupPosition}
            showScorePopup={showScorePopup}
            scorePopupValue={scorePopupValue}
            activeGame={activeGame}
            pendingGame={pendingGame}
            handleButtonPress={handleButtonPress}
            handleDialogConfirm={handleDialogConfirm}
            handleDialogCancel={handleDialogCancel}
            showDialog={showDialog}
          />
        </foreignObject>
        <ControlPanel joystickRotation={joystickRotation} onJoystickMove={rotateJoystick} isPowered={isPowered} />
      </ScreenWrapperSvg>
    </div>
  );
}

// Provider로 감싸서 내보내는 메인 컴포넌트
export default function InteractiveArcade() {
  return (
    <ArcadeProvider>
      <ArcadeComponent />
    </ArcadeProvider>
  );
}

const powerButtonStyle = css({
  position: 'absolute',
  top: '4px',
  right: '4px',
  zIndex: '10',
});

const controlPanelStyle = css({
  position: 'absolute',
  bottom: '4px',
  left: '4px',
  zIndex: '10',
});

const containerStyle = css({
  width: '100%',
  maxWidth: '100%',
  mx: 'auto',
  position: 'relative',
});
