'use client';

import { useEffect, useState } from 'react';
import { css } from '_panda/css';

import GameButton from './_assets/GameButton';
import ControlPanel from './_components/ControlPanel';
import GameDialog from './_components/GameDialog';
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
    console.log('index: ', index);
    if (!isPowered) return;

    setActiveButton(index);
    playSound('click');

    // Determine which game to start based on button index
    const gameToStart: GameType = index === 0 ? 'character' : index === 1 ? 'basketball' : index === 2 ? 'quiz' : null;

    if (gameToStart) {
      if (activeGame && activeGame !== gameToStart) {
        // If a different game is already active, show confirmation dialog
        setPendingGame(gameToStart);
        setShowDialog(true);
      } else {
        // Start the game directly if no game is active or the same game is clicked
        startGame(gameToStart);
      }
    }

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
    <div
      className={css({
        width: '100%',
        maxWidth: '100%',
        mx: 'auto',
        position: 'relative',
      })}
    >
      {/* Power button */}
      <div
        className={css({
          position: 'absolute',
          top: '4px',
          right: '4px',
          zIndex: '10',
        })}
      >
        <PowerButton isPowered={isPowered} onClick={togglePower} />
      </div>

      <svg width="100%" height="100%" viewBox="0 0 1660 2000" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_6457_263998)">
          <rect
            x="151"
            y="399"
            width="1358"
            height="1212"
            fill="url(#paint0_linear_6457_263998)"
            stroke="url(#paint1_linear_6457_263998)"
            strokeWidth="20"
          />
          <path
            d="M17.3404 1863L146.12 1611H1511.94L1643.5 1863H17.3404Z"
            fill="url(#paint2_linear_6457_263998)"
            stroke="url(#paint3_linear_6457_263998)"
            strokeWidth="20"
          />

          {/* Green Button */}
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

          {/* Blue Button */}
          <GameButton
            onClick={() => handleButtonPress(2)}
            active={activeButton === 2}
            label="퀴즈 게임"
            startX={1237}
            startY={1677}
            color="blue"
          />

          <foreignObject x="187" y="422" width="1286" height="1148">
            <div
              style={{
                backdropFilter: 'blur(20px)',
                clipPath: 'url(#bgblur_1_6457_263998_clip_path)',
                height: '100%',
                width: '100%',
              }}
            ></div>
          </foreignObject>

          <path
            data-figma-bg-blur-radius="40"
            d="M237 467H232V472V1520V1525H237H1423H1428V1520V472V467H1423H237Z"
            fill="#6DE575"
            stroke="#A1FFA7"
            strokeWidth="10"
          />

          {/* Screen */}
          <path d="M280 510H1380V1475H280V510Z" fill="url(#paint4_linear_6457_263998)" />

          {/* Screen content - conditionally rendered based on power state */}
          <foreignObject x="280" y="510" width="1100" height="965">
            <div
              className={css({
                width: '100%',
                height: '100%',
                position: 'relative',
              })}
              style={{
                opacity: isPowered ? 1 : 0,
                transition: bootingUp
                  ? 'opacity 1.5s ease-in'
                  : shuttingDown
                    ? 'opacity 0.5s ease-out'
                    : 'opacity 0.2s',
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

              {/* Active Game */}
              {/* {activeGame === 'character' && (
                <CharacterGame
                  joystickDirection={joystickDirection}
                  addScore={addScore}
                  onExit={() => setActiveGame(null)}
                />
              )}

              {activeGame === 'basketball' && (
                <BasketballGame
                  joystickDirection={joystickDirection}
                  addScore={addScore}
                  onExit={() => setActiveGame(null)}
                />
              )}

              {activeGame === 'quiz' && <QuizGame addScore={addScore} onExit={() => setActiveGame(null)} />} */}

              {/* Game Switch Dialog */}
              {showDialog && (
                <GameDialog
                  currentGame={activeGame}
                  newGame={pendingGame}
                  onConfirm={handleDialogConfirm}
                  onCancel={handleDialogCancel}
                />
              )}
            </div>
          </foreignObject>

          {/* Screen corners */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1320 510H1300V530H1320V550H1340V570H1360V590H1380V570V550V530V515V510H1370H1360H1340H1320Z"
            fill="#6EE577"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1320 1475H1300V1455H1320V1435H1340V1415H1360V1395H1380V1415V1435V1455V1470V1475H1370H1360H1340H1320Z"
            fill="#6EE577"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M340 1475H360V1455H340V1435H320V1415H300V1395H280V1415V1435V1455V1470V1475H290H300H320H340Z"
            fill="#6EE577"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M340 510H360V530H340V550H320V570H300V590H280V570V550V530V510H300H320H340Z"
            fill="#6EE577"
          />
          <rect x="1340" y="510" width="20" height="20" fill="#00C448" />
          <rect x="1360" y="530" width="20" height="20" fill="#00C448" />
          <rect width="20" height="20" transform="matrix(1 0 0 -1 1340 1475)" fill="#00C448" />
          <rect width="20" height="20" transform="matrix(1 0 0 -1 1360 1455)" fill="#00C448" />
          <rect x="320" y="1475" width="20" height="20" transform="rotate(180 320 1475)" fill="#00C448" />
          <rect x="300" y="1455" width="20" height="20" transform="rotate(180 300 1455)" fill="#00C448" />
          <rect width="20" height="20" transform="matrix(-1 0 0 1 320 510)" fill="#00C448" />
          <rect width="20" height="20" transform="matrix(-1 0 0 1 300 530)" fill="#00C448" />
          <path
            d="M10 1881C10 1871.06 18.0589 1863 28 1863H1632C1641.94 1863 1650 1871.06 1650 1881V2093H10V1881Z"
            fill="url(#paint5_linear_6457_263998)"
            stroke="#0799D7"
            strokeWidth="20"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1479 389H1499H1507H1519V402V409V429H1499V409H1479V389Z"
            fill="#141517"
          />
          <rect x="1479" y="409" width="20" height="20" fill="#0799D7" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M181 389H161H153H141V402V409V429H161V409H181V389Z"
            fill="#141517"
          />
          <rect width="20" height="20" transform="matrix(-1 0 0 1 181 409)" fill="#141517" />
          <rect width="20" height="20" transform="matrix(-1 0 0 1 181 409)" fill="#0799D7" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1394 462H1414H1421H1434V475V482V502H1414V482H1394V462Z"
            fill="#0477D9"
          />
          <rect x="1384" y="469" width="10" height="16" fill="#A0FFA7" />
          <rect x="1404" y="489" width="10" height="16" fill="#A0FFA7" />
          <rect x="1384" y="482" width="15" height="10" fill="#A0FFA7" />
          <rect x="1394" y="482" width="20" height="10" fill="#A0FFA7" />
          <rect x="1404" y="502" width="23" height="10" fill="#A0FFA7" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1393 1530H1413H1420H1433V1517V1510V1490H1413V1510H1393V1530Z"
            fill="#51C779"
          />
          <rect width="10" height="16" transform="matrix(1 0 0 -1 1383 1523)" fill="#A0FFA7" />
          <rect width="10" height="16" transform="matrix(1 0 0 -1 1403 1503)" fill="#A0FFA7" />
          <rect width="15" height="10" transform="matrix(1 0 0 -1 1383 1510)" fill="#A0FFA7" />
          <rect width="20" height="10" transform="matrix(1 0 0 -1 1393 1510)" fill="#A0FFA7" />
          <rect width="23" height="10" transform="matrix(1 0 0 -1 1403 1490)" fill="#A0FFA7" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M267 1530H247H240H227V1517V1510V1490H247V1510H267V1530Z"
            fill="#51C779"
          />
          <rect x="277" y="1523" width="10" height="16" transform="rotate(180 277 1523)" fill="#A0FFA7" />
          <rect x="257" y="1503" width="10" height="16" transform="rotate(180 257 1503)" fill="#A0FFA7" />
          <rect x="277" y="1510" width="15" height="10" transform="rotate(180 277 1510)" fill="#A0FFA7" />
          <rect x="267" y="1510" width="20" height="10" transform="rotate(180 267 1510)" fill="#A0FFA7" />
          <rect x="257" y="1490" width="23" height="10" transform="rotate(180 257 1490)" fill="#A0FFA7" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M267 462H247H240H227V475V482V502H247V482H267V462Z"
            fill="#0477D9"
          />
          <rect width="10" height="16" transform="matrix(-1 0 0 1 277 469)" fill="#A0FFA7" />
          <rect width="10" height="16" transform="matrix(-1 0 0 1 257 489)" fill="#A0FFA7" />
          <rect width="15" height="10" transform="matrix(-1 0 0 1 277 482)" fill="#A0FFA7" />
          <rect width="20" height="10" transform="matrix(-1 0 0 1 267 482)" fill="#A0FFA7" />
          <rect width="23" height="10" transform="matrix(-1 0 0 1 257 502)" fill="#A0FFA7" />
          <rect x="276" y="1737" width="182" height="40" fill="#1C2923" />

          {/* Control Panel with Joystick */}
          <ControlPanel joystickRotation={joystickRotation} onJoystickMove={rotateJoystick} isPowered={isPowered} />
        </g>
        <defs>
          <clipPath id="bgblur_1_6457_263998_clip_path" transform="translate(-187 -422)">
            <path d="M237 467H232V472V1520V1525H237H1423H1428V1520V472V467H1423H237Z" />
          </clipPath>
          <linearGradient
            id="paint0_linear_6457_263998"
            x1="830"
            y1="389"
            x2="830"
            y2="1621"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#016EDB" />
            <stop offset="0.555" stopColor="#16B7CD" />
            <stop offset="1" stopColor="#5CCA69" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_6457_263998"
            x1="830"
            y1="389"
            x2="830"
            y2="1621"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0799D7" />
            <stop offset="1" stopColor="#00C448" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_6457_263998"
            x1="830.5"
            y1="1873"
            x2="830.5"
            y2="1601"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#AFFFB9" />
            <stop offset="0.405" stopColor="#9CF3A8" />
            <stop offset="1" stopColor="#58C96E" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_6457_263998"
            x1="830.5"
            y1="1601"
            x2="830.5"
            y2="1873"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#01C34B" />
            <stop offset="1" stopColor="#0799D7" />
          </linearGradient>
          <linearGradient
            id="paint4_linear_6457_263998"
            x1="830"
            y1="510"
            x2="830"
            y2="1475"
            gradientUnits="userSpaceOnUse"
          >
            <stop />
            <stop offset="0.165" stopColor="#001420" />
            <stop offset="0.365" stopColor="#002943" />
            <stop offset="1" stopColor="#008FE8" />
          </linearGradient>
          <linearGradient
            id="paint5_linear_6457_263998"
            x1="830"
            y1="1853"
            x2="830"
            y2="2103"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#016EDB" />
            <stop offset="0.555" stopColor="#16B7CD" />
            <stop offset="1" stopColor="#5CCA69" />
          </linearGradient>
          <clipPath id="clip0_6457_263998">
            <rect width="1660" height="2000" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
