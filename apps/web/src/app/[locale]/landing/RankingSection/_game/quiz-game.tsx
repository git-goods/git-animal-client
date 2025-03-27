'use client';

import { useEffect, useState } from 'react';
import { css } from '_panda/css';

import { useSound } from '../_hooks/useSound';

interface QuizGameProps {
  addScore: (points: number, x: number, y: number) => void;
  onExit: () => void;
}

export default function QuizGame({ addScore, onExit }: QuizGameProps) {
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [paused, setPaused] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);

  // Sound effects
  const { playSound } = useSound();

  // Quiz questions by level
  const quizQuestions = [
    // Level 1 - Easy
    [
      {
        question: '다음 중 가장 큰 숫자는?',
        options: ['5', '9', '3', '7'],
        answer: 1,
      },
      {
        question: '2 + 3 × 4 = ?',
        options: ['20', '14', '11', '24'],
        answer: 1,
      },
      {
        question: '다음 중 소수는?',
        options: ['4', '6', '7', '8'],
        answer: 2,
      },
      {
        question: '지구에서 가장 가까운 행성은?',
        options: ['화성', '금성', '목성', '토성'],
        answer: 1,
      },
      {
        question: '물의 화학식은?',
        options: ['CO2', 'H2O', 'O2', 'N2'],
        answer: 1,
      },
    ],
    // Level 2 - Medium
    [
      {
        question: '대한민국의 수도는?',
        options: ['부산', '서울', '인천', '대구'],
        answer: 1,
      },
      {
        question: '다음 중 프로그래밍 언어가 아닌 것은?',
        options: ['Java', 'Python', 'Excel', 'JavaScript'],
        answer: 2,
      },
      {
        question: '√144 = ?',
        options: ['12', '14', '10', '16'],
        answer: 0,
      },
      {
        question: '태양계에서 가장 큰 행성은?',
        options: ['지구', '토성', '목성', '해왕성'],
        answer: 2,
      },
      {
        question: '1 킬로그램은 몇 그램인가?',
        options: ['10', '100', '1000', '10000'],
        answer: 2,
      },
    ],
    // Level 3 - Hard
    [
      {
        question: '빛의 속도는 약 몇 km/s 인가?',
        options: ['30,000', '300,000', '3,000,000', '30,000,000'],
        answer: 1,
      },
      {
        question: '다음 중 가장 멀리 있는 행성은?',
        options: ['화성', '목성', '해왕성', '토성'],
        answer: 2,
      },
      {
        question: 'DNA의 이중 나선 구조를 발견한 과학자는?',
        options: ['아인슈타인', '뉴턴', '왓슨과 크릭', '멘델'],
        answer: 2,
      },
      {
        question: '2^10 = ?',
        options: ['512', '1024', '2048', '4096'],
        answer: 1,
      },
      {
        question: '다음 중 가장 작은 소수는?',
        options: ['0', '1', '2', '3'],
        answer: 2,
      },
    ],
  ];

  // Start the game
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setLevel(1);
    setScore(0);
    setTimeLeft(60);
    setStreak(0);
    setQuestionCount(0);
    nextQuestion();
    playSound('gameStart');
  };

  // Move to next question
  const nextQuestion = () => {
    // Get a random question from current level
    const levelQuestions = quizQuestions[level - 1];
    const newIndex = Math.floor(Math.random() * levelQuestions.length);
    setQuestionIndex(newIndex);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  // Handle answer selection
  const selectAnswer = (index: number) => {
    if (selectedAnswer !== null || showResult || paused || !gameStarted || gameOver) return;

    setSelectedAnswer(index);
    const currentQuestion = quizQuestions[level - 1][questionIndex];
    const correct = index === currentQuestion.answer;

    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      // Calculate points based on time and streak
      const timeBonus = Math.ceil(timeLeft / 10);
      const streakBonus = streak;
      const points = 100 + timeBonus * 10 + streakBonus * 20;

      setScore((prev) => prev + points);
      addScore(points, 550, 600);
      setStreak((prev) => prev + 1);
      playSound('success');

      // Level up after certain number of correct answers
      if (streak + 1 >= 5 && level < 3) {
        setLevel((prev) => {
          const newLevel = prev + 1;
          playSound('levelUp');
          setStreak(0);
          return newLevel;
        });
      }
    } else {
      setStreak(0);
      playSound('error');
    }

    setQuestionCount((prev) => prev + 1);

    // Move to next question after delay
    setTimeout(() => {
      if (questionCount >= 9 || timeLeft <= 0) {
        endGame();
      } else {
        nextQuestion();
      }
    }, 2000);
  };

  // Timer
  useEffect(() => {
    if (!gameStarted || gameOver || paused || showResult) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameOver, paused, showResult]);

  // End the game
  const endGame = () => {
    setGameOver(true);
    playSound('gameOver');
  };

  // Handle keyboard for pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        setPaused((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Current question
  const currentQuestion = gameStarted ? quizQuestions[level - 1][questionIndex] : null;

  return (
    <div className={containerStyle}>
      {/* Game UI */}
      <div className={gameUIStyle}>
        <div className={infoContainerStyle}>
          {/* Level */}
          <div className={levelIndicatorStyle}>
            <span className={statTextStyle}>LEVEL: {level}</span>
          </div>

          {/* Streak */}
          <div className={streakIndicatorStyle}>
            <span className={statTextStyle}>STREAK: {streak}</span>
          </div>
        </div>

        {/* Timer */}
        <div className={timerStyle}>
          <span className={statTextStyle}>TIME: {timeLeft}</span>
        </div>
      </div>

      {/* Question counter */}
      <div className={questionCounterContainerStyle}>
        <div className={questionCounterStyle}>
          <span className={statTextStyle}>문제: {questionCount + 1}/10</span>
        </div>
      </div>

      {/* Game content */}
      {gameStarted && !gameOver && currentQuestion && (
        <div className={gameContentStyle}>
          {/* Question */}
          <div className={questionContainerStyle}>
            <h2 className={questionTextStyle}>{currentQuestion.question}</h2>
          </div>

          {/* Options */}
          <div className={optionsGridStyle}>
            {currentQuestion.options.map((option, index) => {
              let optionStyle = defaultOptionStyle;

              if (selectedAnswer === null) {
                optionStyle = defaultOptionStyle;
              } else if (selectedAnswer === index) {
                optionStyle = isCorrect ? correctSelectedOptionStyle : incorrectSelectedOptionStyle;
              } else if (index === currentQuestion.answer && showResult) {
                optionStyle = correctOptionStyle;
              } else {
                optionStyle = defaultOptionStyle;
              }

              return (
                <div key={index} className={optionStyle} onClick={() => selectAnswer(index)}>
                  <p className={optionTextStyle}>{option}</p>
                </div>
              );
            })}
          </div>

          {/* Result message */}
          {showResult && (
            <div className={isCorrect ? correctResultStyle : incorrectResultStyle}>
              <p className={resultTextStyle}>{isCorrect ? '정답입니다!' : '틀렸습니다!'}</p>
            </div>
          )}

          {/* Controls */}
          <div className={controlsContainerStyle}>
            {/* Pause button */}
            <div className={pauseButtonStyle} onClick={() => setPaused(!paused)}>
              {paused ? '계속하기' : '일시정지'}
            </div>

            {/* Exit button */}
            <div className={exitButtonStyle} onClick={onExit}>
              나가기
            </div>
          </div>
        </div>
      )}

      {/* Start screen */}
      {!gameStarted && !gameOver && (
        <div className={overlayStyle}>
          <h1 className={titleStyle}>퀴즈 게임</h1>
          <p className={descriptionStyle}>다양한 퀴즈를 풀고 점수를 획득하세요!</p>
          <p className={rulesStyle}>연속으로 5문제를 맞추면 레벨업! 시간이 빠를수록 더 많은 점수를 얻습니다.</p>
          <button className={startButtonStyle} onClick={startGame}>
            게임 시작
          </button>
        </div>
      )}

      {/* Game over screen */}
      {gameOver && (
        <div className={overlayStyle}>
          <h1 className={gameOverTitleStyle}>게임 오버</h1>
          <p className={finalScoreStyle}>최종 점수: {score}</p>
          <p className={finalLevelStyle}>레벨: {level}</p>
          <div className={buttonGroupStyle}>
            <button className={restartButtonStyle} onClick={startGame}>
              다시 시작
            </button>
            <button className={mainMenuButtonStyle} onClick={onExit}>
              메인 메뉴
            </button>
          </div>
        </div>
      )}

      {/* Pause screen */}
      {paused && gameStarted && !gameOver && (
        <div className={overlayStyle}>
          <h1 className={pauseTitleStyle}>일시 정지</h1>
          <div className={buttonGroupStyle}>
            <button className={continueButtonStyle} onClick={() => setPaused(false)}>
              계속하기
            </button>
            <button className={quitButtonStyle} onClick={onExit}>
              그만하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Container Styles
const containerStyle = css({
  width: '100%',
  height: '100%',
  position: 'relative',
});

// Game UI Styles
const gameUIStyle = css({
  position: 'absolute',
  top: '3rem',
  left: '0',
  right: '0',
  display: 'flex',
  justifyContent: 'space-between',
  paddingX: '1.25rem',
  zIndex: '10',
});

const infoContainerStyle = css({
  display: 'flex',
  gap: '1rem',
});

const levelIndicatorStyle = css({
  backgroundColor: '#003366',
  borderWidth: '2px',
  borderColor: 'white',
  borderRadius: '0.25rem',
  paddingX: '0.75rem',
  paddingY: '0.25rem',
});

const streakIndicatorStyle = css({
  backgroundColor: '#660033',
  borderWidth: '2px',
  borderColor: 'white',
  borderRadius: '0.25rem',
  paddingX: '0.75rem',
  paddingY: '0.25rem',
});

const timerStyle = css({
  backgroundColor: '#000033',
  borderWidth: '2px',
  borderColor: 'white',
  borderRadius: '0.25rem',
  paddingX: '0.75rem',
  paddingY: '0.25rem',
});

const statTextStyle = css({
  color: 'white',
  fontFamily: 'mono',
  fontWeight: 'bold',
});

// Question Counter Styles
const questionCounterContainerStyle = css({
  position: 'absolute',
  top: '3rem',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: '10',
});

const questionCounterStyle = css({
  backgroundColor: '#333333',
  borderWidth: '2px',
  borderColor: 'white',
  borderRadius: '0.25rem',
  paddingX: '0.75rem',
  paddingY: '0.25rem',
});

// Game Content Styles
const gameContentStyle = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
});

const questionContainerStyle = css({
  backgroundColor: '#000066',
  borderWidth: '4px',
  borderColor: '#198BE5',
  borderRadius: '0.5rem',
  padding: '1.5rem',
  marginBottom: '2.5rem',
  width: '100%',
  maxWidth: '48rem',
});

const questionTextStyle = css({
  color: 'white',
  fontFamily: 'mono',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '0.5rem',
});

// Options Styles
const optionsGridStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1.5rem',
  width: '100%',
  maxWidth: '48rem',
});

const defaultOptionStyle = css({
  padding: '1rem',
  borderRadius: '0.5rem',
  borderWidth: '4px',
  borderColor: '#198BE5',
  backgroundColor: '#000033',
  cursor: 'pointer',
  transition: 'all',
  _hover: {
    backgroundColor: '#001166',
  },
});

const correctOptionStyle = css({
  padding: '1rem',
  borderRadius: '0.5rem',
  borderWidth: '4px',
  borderColor: 'green.500',
  backgroundColor: 'green.900',
  cursor: 'pointer',
});

const correctSelectedOptionStyle = css({
  padding: '1rem',
  borderRadius: '0.5rem',
  borderWidth: '4px',
  borderColor: 'green.500',
  backgroundColor: 'green.900',
  cursor: 'pointer',
});

const incorrectSelectedOptionStyle = css({
  padding: '1rem',
  borderRadius: '0.5rem',
  borderWidth: '4px',
  borderColor: 'red.500',
  backgroundColor: 'red.900',
  cursor: 'pointer',
});

const optionTextStyle = css({
  color: 'white',
  fontFamily: 'mono',
  fontSize: '1.25rem',
  textAlign: 'center',
});

// Result Message Styles
const correctResultStyle = css({
  marginTop: '2rem',
  padding: '1rem',
  borderRadius: '0.5rem',
  backgroundColor: 'green.600',
});

const incorrectResultStyle = css({
  marginTop: '2rem',
  padding: '1rem',
  borderRadius: '0.5rem',
  backgroundColor: 'red.600',
});

const resultTextStyle = css({
  color: 'white',
  fontFamily: 'mono',
  fontSize: '1.25rem',
  fontWeight: 'bold',
});

// Controls Styles
const controlsContainerStyle = css({
  position: 'absolute',
  bottom: '2rem',
  right: '2rem',
  display: 'flex',
  gap: '1rem',
});

const pauseButtonStyle = css({
  backgroundColor: 'blue.600',
  _hover: {
    backgroundColor: 'blue.700',
  },
  color: 'white',
  fontWeight: 'bold',
  paddingY: '0.5rem',
  paddingX: '1rem',
  borderRadius: '0.25rem',
  cursor: 'pointer',
});

const exitButtonStyle = css({
  backgroundColor: 'red.600',
  _hover: {
    backgroundColor: 'red.700',
  },
  color: 'white',
  fontWeight: 'bold',
  paddingY: '0.5rem',
  paddingX: '1rem',
  borderRadius: '0.25rem',
  cursor: 'pointer',
});

// Overlay Screen Styles
const overlayStyle = css({
  position: 'absolute',
  inset: '0',
  // backgroundColor: 'black',
  // backgroundOpacity: '70%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

// Start Screen Styles
const titleStyle = css({
  color: 'white',
  fontFamily: 'mono',
  fontSize: '2.5rem',
  marginBottom: '2rem',
});

const descriptionStyle = css({
  color: 'white',
  fontFamily: 'mono',
  fontSize: '1.25rem',
  marginBottom: '1rem',
});

const rulesStyle = css({
  color: 'white',
  fontFamily: 'mono',
  fontSize: '1.125rem',
  marginBottom: '2rem',
});

const startButtonStyle = css({
  backgroundColor: 'blue.600',
  _hover: {
    backgroundColor: 'blue.700',
  },
  color: 'white',
  fontWeight: 'bold',
  paddingY: '0.75rem',
  paddingX: '1.5rem',
  borderRadius: '0.5rem',
  fontSize: '1.25rem',
});

// Game Over Screen Styles
const gameOverTitleStyle = css({
  color: 'white',
  fontFamily: 'mono',
  fontSize: '2.5rem',
  marginBottom: '1rem',
});

const finalScoreStyle = css({
  color: 'white',
  fontFamily: 'mono',
  fontSize: '1.5rem',
  marginBottom: '0.5rem',
});

const finalLevelStyle = css({
  color: 'white',
  fontFamily: 'mono',
  fontSize: '1.25rem',
  marginBottom: '2rem',
});

const buttonGroupStyle = css({
  display: 'flex',
  gap: '1rem',
});

const restartButtonStyle = css({
  backgroundColor: 'blue.600',
  _hover: {
    backgroundColor: 'blue.700',
  },
  color: 'white',
  fontWeight: 'bold',
  paddingY: '0.75rem',
  paddingX: '1.5rem',
  borderRadius: '0.5rem',
});

const mainMenuButtonStyle = css({
  backgroundColor: 'blue.600',
  _hover: {
    backgroundColor: 'blue.700',
  },
  color: 'white',
  fontWeight: 'bold',
  paddingY: '0.75rem',
  paddingX: '1.5rem',
  borderRadius: '0.5rem',
});

// Pause Screen Styles
const pauseTitleStyle = css({
  color: 'white',
  fontFamily: 'mono',
  fontSize: '2.5rem',
  marginBottom: '2rem',
});

const continueButtonStyle = css({
  backgroundColor: 'green.600',
  _hover: {
    backgroundColor: 'green.700',
  },
  color: 'white',
  fontWeight: 'bold',
  paddingY: '0.75rem',
  paddingX: '1.5rem',
  borderRadius: '0.5rem',
});

const quitButtonStyle = css({
  backgroundColor: 'red.600',
  _hover: {
    backgroundColor: 'red.700',
  },
  color: 'white',
  fontWeight: 'bold',
  paddingY: '0.75rem',
  paddingX: '1.5rem',
  borderRadius: '0.5rem',
});
