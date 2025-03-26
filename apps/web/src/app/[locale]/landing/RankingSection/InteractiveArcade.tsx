/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import { useEffect, useState } from 'react';
import { css } from '_panda/css';

import GameButton from './_assets/GameButton';
import { ScreenContent } from './_assets/ScreenContent';
import { ScreenWrapperSvg } from './_assets/SvgAssets';
import ControlPanel from './_components/ControlPanel';
import PowerButton from './_components/PowerButton';
import { useKeyboardControls } from './_hooks/useKeyboardControls';
import { useSound } from './_hooks/useSound';

type GameType = 'character' | 'basketball' | 'quiz' | null;

export default function InteractiveArcade() {
  // Power state
  const [isPowered, setIsPowered] = useState(false);
  const [bootingUp, setBootingUp] = useState(false);
  const [shuttingDown, setShuttingDown] = useState(false);

  // Game state
  const [activeGame, setActiveGame] = useState<GameType>(null);
  const [pendingGame, setPendingGame] = useState<GameType>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [scorePopupValue, setScorePopupValue] = useState(0);
  const [scorePopupPosition, setScorePopupPosition] = useState({ x: 0, y: 0 });

  // Controls
  const [joystickDirection, setJoystickDirection] = useState({ x: 0, y: 0 });
  const [joystickRotation, setJoystickRotation] = useState(0);
  const [activeButton, setActiveButton] = useState<number | null>(null);

  // Sound effects
  const { playSound } = useSound();

  // Keyboard controls
  const { direction } = useKeyboardControls();

  // Handle power button
  const togglePower = () => {
    if (isPowered) {
      // Power off sequence
      playSound('powerDown');
      setShuttingDown(true);
      setTimeout(() => {
        setIsPowered(false);
        setShuttingDown(false);
        setActiveGame(null);
        setTotalScore(0);
      }, 1000);
    } else {
      // Power on sequence
      playSound('powerUp');
      setBootingUp(true);
      setTimeout(() => {
        setIsPowered(true);
        setBootingUp(false);
      }, 1500);
    }
  };

  // Handle button press
  const handleButtonPress = (index: number) => {
    if (!isPowered) return;

    setActiveButton(index);
    // playSound('click');

    // Determine which game to start based on button index
    // const gameToStart: GameType = index === 0 ? 'character' : index === 1 ? 'basketball' : index === 2 ? 'quiz' : null;

    // if (gameToStart) {
    //   if (activeGame && activeGame !== gameToStart) {
    //     // If a different game is already active, show confirmation dialog
    //     setPendingGame(gameToStart);
    //     setShowDialog(true);
    //   } else {
    //     // Start the game directly if no game is active or the same game is clicked
    //     startGame(gameToStart);
    //   }
    // }

    setTimeout(() => setActiveButton(null), 300);
  };

  // Start a game
  const startGame = (game: GameType) => {
    if (activeGame !== game) {
      // Reset scores when switching games
      setTotalScore(0);
    }

    setActiveGame(game);
    setPendingGame(null);
    setShowDialog(false);
    playSound('gameStart');
  };

  // Handle dialog confirmation
  const handleDialogConfirm = () => {
    if (pendingGame) {
      startGame(pendingGame);
    }
  };

  // Handle dialog cancellation
  const handleDialogCancel = () => {
    setPendingGame(null);
    setShowDialog(false);
  };

  // Add score with animation
  const addScore = (points: number, x: number, y: number) => {
    setTotalScore((prev) => {
      const newScore = prev + points;
      // Update high score if needed
      if (newScore > highScore) {
        setHighScore(newScore);
      }
      return newScore;
    });

    setScorePopupValue(points);
    setScorePopupPosition({ x, y });
    setShowScorePopup(true);
    setTimeout(() => setShowScorePopup(false), 1000);
  };

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
        <GameButton
          onClick={() => handleButtonPress(0)}
          active={activeButton === 0}
          label="캐릭터 게임"
          startX={673}
          startY={1677}
          color="green"
        />
        <GameButton
          onClick={() => handleButtonPress(1)}
          active={activeButton === 1}
          label="농구 게임"
          startX={955}
          startY={1677}
          color="teal"
        />
        <GameButton
          onClick={() => handleButtonPress(2)}
          active={activeButton === 2}
          label="퀴즈 게임"
          startX={1237}
          startY={1677}
          color="blue"
        />
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
