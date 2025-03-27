'use client';

import React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { css } from '_panda/css';

import { useSound } from '../_hooks/useSound';

interface CharacterGameProps {
  joystickDirection: { x: number; y: number };
  addScore: (points: number, x: number, y: number) => void;
  onExit: () => void;
}

// 랭킹 데이터 타입
interface RankingData {
  name: string;
  score: number;
  date: string;
}

// 아이템 타입
interface GameItem {
  id: number;
  x: number;
  y: number;
  type: 'coin' | 'star' | 'obstacle' | 'heart';
  value: number;
  speed: number;
  width: number;
  height: number;
}

export default function CharacterGame({ joystickDirection, addScore, onExit }: CharacterGameProps) {
  // Canvas 참조
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);

  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [paused, setPaused] = useState(false);
  const [showRanking, setShowRanking] = useState(true);
  const [playerName, setPlayerName] = useState('');
  const [nameInput, setNameInput] = useState(false);

  // 게임 요소
  const [fallingItems, setFallingItems] = useState<GameItem[]>([]);
  const [characterPosition, setCharacterPosition] = useState({ x: 550, y: 800 });
  const characterSize = { width: 50, height: 70 };

  // 이미지 캐싱
  const imagesRef = useRef<Record<string, HTMLImageElement>>({});
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // 게임 루프 관련 변수
  const lastUpdateTimeRef = useRef<number>(0);
  const itemIdRef = useRef<number>(0);

  // Ranking
  const [rankings, setRankings] = useState<RankingData[]>([
    { name: '김철수', score: 1250, date: '2023-05-15' },
    { name: '이영희', score: 980, date: '2023-05-10' },
    { name: '박지민', score: 820, date: '2023-05-08' },
    { name: '정민준', score: 750, date: '2023-05-05' },
    { name: '최수진', score: 620, date: '2023-05-01' },
  ]);

  // 점수 애니메이션
  const [scoreAnimations, setScoreAnimations] = useState<
    {
      value: number;
      x: number;
      y: number;
      opacity: number;
      time: number;
    }[]
  >([]);

  // Sound effects
  const { playSound } = useSound();

  // 게임 종료 함수
  const endGame = useCallback(() => {
    setGameOver(true);
    setNameInput(true);
    playSound('gameOver');
  }, [playSound]);

  // 이미지 로드
  useEffect(() => {
    const imageSources = {
      character: 'https://placehold.co/50x70',
      coin: 'https://placehold.co/40x40',
      star: 'https://placehold.co/50x50',
      obstacle: 'https://placehold.co/40x40',
      heart: 'https://placehold.co/40x40',
      background: 'https://placehold.co/1100x965',
    };

    let loadedCount = 0;
    const totalImages = Object.keys(imageSources).length;

    Object.entries(imageSources).forEach(([key, src]) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.src = src;
      imagesRef.current[key] = img;
    });
  }, []);

  // 게임 시작
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setShowRanking(false);
    setLevel(1);
    setLives(3);
    setScore(0);
    setTimeLeft(60);
    setFallingItems([]);
    setCharacterPosition({ x: 550, y: 800 });
    playSound('gameStart');
  };

  // 새 아이템 생성
  const generateItem = useCallback(() => {
    const itemTypes: ('coin' | 'star' | 'obstacle' | 'heart')[] = ['coin', 'star', 'obstacle', 'heart'];
    const weights = [0.5, 0.3, 0.15, 0.05]; // 확률 가중치

    // 가중치에 따라 아이템 타입 선택
    const random = Math.random();
    let selectedType: 'coin' | 'star' | 'obstacle' | 'heart' = 'coin';
    let cumulativeWeight = 0;

    for (let i = 0; i < weights.length; i++) {
      cumulativeWeight += weights[i];
      if (random <= cumulativeWeight) {
        selectedType = itemTypes[i];
        break;
      }
    }

    // 아이템 값과 속도 설정
    let value = 0;
    const speed = 2 + Math.random() * 2 + level * 0.5;

    // 아이템 크기 설정
    let width = 40;
    let height = 40;

    switch (selectedType) {
      case 'coin':
        value = 100;
        break;
      case 'star':
        value = 300;
        width = 50;
        height = 50;
        break;
      case 'obstacle':
        value = -1; // 생명력 감소
        break;
      case 'heart':
        value = 1; // 생명력 증가
        break;
    }

    // 새 아이템 생성
    const newItem: GameItem = {
      id: itemIdRef.current++,
      x: 300 + Math.random() * 700, // 랜덤 x 위치
      y: 0, // 화면 상단에서 시작
      type: selectedType,
      value,
      speed,
      width,
      height,
    };

    setFallingItems((prev) => [...prev, newItem]);
  }, [level]);

  // 아이템 생성 타이머
  useEffect(() => {
    if (!gameStarted || gameOver || paused || !imagesLoaded) return;

    const itemInterval = setInterval(
      () => {
        generateItem();
      },
      1000 - level * 100,
    ); // 레벨이 올라갈수록 아이템 생성 빈도 증가

    return () => clearInterval(itemInterval);
  }, [gameStarted, gameOver, paused, level, imagesLoaded, generateItem]);

  // 랭킹에 점수 추가
  const addToRanking = () => {
    if (!playerName.trim()) return;

    const today = new Date();
    const dateString = today.toISOString().split('T')[0];

    const newRanking: RankingData = {
      name: playerName,
      score,
      date: dateString,
    };

    const updatedRankings = [...rankings, newRanking]
      .sort((a, b) => b.score - a.score) // 점수 내림차순 정렬
      .slice(0, 10); // 상위 10개만 유지

    setRankings(updatedRankings);
    setNameInput(false);
  };

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        setPaused((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 충돌 감지 함수
  const checkCollision = (item: GameItem, character: { x: number; y: number; width: number; height: number }) => {
    return (
      item.x < character.x + character.width &&
      item.x + item.width > character.x &&
      item.y < character.y + character.height &&
      item.y + item.height > character.y
    );
  };

  // 캔버스 그리기 함수
  const drawGame = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      // 배경 지우기
      ctx.clearRect(0, 0, width, height);

      // 배경 그리기
      ctx.fillStyle = '#000033';
      ctx.fillRect(0, 0, width, height);

      // 바닥 그리기
      ctx.fillStyle = '#006600';
      ctx.fillRect(280, 850, 820, 20);

      // 캐릭터 그리기
      const characterImg = imagesRef.current.character;
      if (characterImg) {
        ctx.drawImage(
          characterImg,
          characterPosition.x - characterSize.width / 2,
          characterPosition.y - characterSize.height,
          characterSize.width,
          characterSize.height,
        );
      } else {
        // 이미지가 없을 경우 기본 도형으로 대체
        ctx.fillStyle = '#01BB66';
        ctx.fillRect(
          characterPosition.x - characterSize.width / 2,
          characterPosition.y - characterSize.height,
          characterSize.width,
          characterSize.height,
        );
      }

      // 아이템 그리기
      fallingItems.forEach((item) => {
        const itemImg = imagesRef.current[item.type];

        if (itemImg) {
          ctx.drawImage(itemImg, item.x - item.width / 2, item.y - item.height / 2, item.width, item.height);
        } else {
          // 이미지가 없을 경우 기본 도형으로 대체
          switch (item.type) {
            case 'coin':
              ctx.fillStyle = '#FFD700';
              ctx.beginPath();
              ctx.arc(item.x, item.y, item.width / 2, 0, Math.PI * 2);
              ctx.fill();
              break;
            case 'star':
              ctx.fillStyle = '#FFFF00';
              ctx.beginPath();
              ctx.moveTo(item.x, item.y - item.height / 2);
              for (let i = 0; i < 5; i++) {
                const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
                const nextAngle = ((i * 2 + 1) * Math.PI) / 5 - Math.PI / 2;
                const innerRadius = item.width / 4;

                ctx.lineTo(item.x + Math.cos(angle) * (item.width / 2), item.y + Math.sin(angle) * (item.height / 2));
                ctx.lineTo(item.x + Math.cos(nextAngle) * innerRadius, item.y + Math.sin(nextAngle) * innerRadius);
              }
              ctx.closePath();
              ctx.fill();
              break;
            case 'obstacle':
              ctx.fillStyle = '#FF0000';
              ctx.fillRect(item.x - item.width / 2, item.y - item.height / 2, item.width, item.height);
              break;
            case 'heart':
              ctx.fillStyle = '#FF3366';
              ctx.beginPath();
              const topX = item.x;
              const topY = item.y;

              ctx.moveTo(topX, topY);
              ctx.bezierCurveTo(
                topX - item.width / 2,
                topY - item.height / 2,
                topX - item.width,
                topY,
                topX,
                topY + item.height / 2,
              );
              ctx.bezierCurveTo(topX + item.width, topY, topX + item.width / 2, topY - item.height / 2, topX, topY);
              ctx.fill();
              break;
          }

          // 아이템 값 표시
          if (item.type === 'coin' || item.type === 'star') {
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 14px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(item.value.toString(), item.x, item.y);
          }
        }
      });

      // 점수 애니메이션 그리기
      scoreAnimations.forEach((anim) => {
        ctx.fillStyle = `rgba(255, 255, 0, ${anim.opacity})`;
        ctx.font = 'bold 20px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`+${anim.value}`, anim.x, anim.y);
      });

      // UI 그리기
      // 생명력
      ctx.fillStyle = '#330000';
      ctx.fillRect(10, 10, 100, 30);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.strokeRect(10, 10, 100, 30);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 16px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('❤️'.repeat(lives), 60, 25);

      // 레벨
      ctx.fillStyle = '#003300';
      ctx.fillRect(120, 10, 100, 30);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.strokeRect(120, 10, 100, 30);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 16px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`LEVEL: ${level}`, 170, 25);

      // 타이머
      ctx.fillStyle = '#000033';
      ctx.fillRect(width - 110, 10, 100, 30);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.strokeRect(width - 110, 10, 100, 30);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 16px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`TIME: ${Math.ceil(timeLeft)}`, width - 60, 25);

      // 버튼 그리기
      // 일시정지 버튼
      ctx.fillStyle = '#3366CC';
      ctx.beginPath();
      ctx.arc(950, 650, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(paused ? 'PLAY' : 'PAUSE', 950, 650);

      // 종료 버튼
      ctx.fillStyle = '#CC3366';
      ctx.beginPath();
      ctx.arc(950, 550, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('EXIT', 950, 550);
    },
    [characterPosition, fallingItems, level, lives, paused, scoreAnimations, timeLeft],
  );

  // Sound effects
  const playCoinSound = useCallback(() => {
    playSound('coin');
  }, [playSound]);

  const playHitSound = useCallback(() => {
    playSound('hit');
  }, [playSound]);

  const playPowerUpSound = useCallback(() => {
    playSound('powerUp');
  }, [playSound]);

  // 게임 루프
  useEffect(() => {
    if (!gameStarted || gameOver || paused || !imagesLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 게임 루프
    const gameLoop = (timestamp: number) => {
      // 델타 타임 계산
      const deltaTime = lastUpdateTimeRef.current ? (timestamp - lastUpdateTimeRef.current) / 16 : 1;
      lastUpdateTimeRef.current = timestamp;

      // 캐릭터 위치 업데이트
      setCharacterPosition((prev) => {
        if (!joystickDirection) return prev;

        let newX = prev.x + joystickDirection.x * 8 * deltaTime;

        // 화면 경계 체크
        if (newX < 300 + characterSize.width / 2) newX = 300 + characterSize.width / 2;
        if (newX > 1100 - characterSize.width / 2) newX = 1100 - characterSize.width / 2;

        return { ...prev, x: newX };
      });

      // 아이템 업데이트 및 충돌 체크
      setFallingItems((prev) => {
        const updatedItems: GameItem[] = [];

        prev.forEach((item) => {
          // 아이템 위치 업데이트
          const newY = item.y + item.speed * deltaTime;
          const updatedItem = { ...item, y: newY };

          // 충돌 체크
          const collision = checkCollision(updatedItem, {
            x: characterPosition.x - characterSize.width / 2,
            y: characterPosition.y - characterSize.height,
            width: characterSize.width,
            height: characterSize.height,
          });

          if (collision) {
            // 충돌 처리를 여기서 직접 수행
            if (updatedItem.type === 'coin' || updatedItem.type === 'star') {
              // 점수 아이템
              setScore((prev) => prev + updatedItem.value);
              // 렌더링 중이 아닌 이벤트 핸들러에서 부모 컴포넌트 상태 업데이트
              setTimeout(() => {
                addScore(updatedItem.value, updatedItem.x, updatedItem.y);
              }, 0);
              playCoinSound();

              // 점수 애니메이션 추가
              setScoreAnimations((prev) => [
                ...prev,
                {
                  value: updatedItem.value,
                  x: updatedItem.x,
                  y: updatedItem.y,
                  opacity: 1,
                  time: Date.now(),
                },
              ]);
            } else if (updatedItem.type === 'obstacle') {
              // 장애물
              setLives((prev) => {
                const newLives = prev - 1;
                if (newLives <= 0) {
                  endGame();
                } else {
                  playHitSound();
                }
                return newLives;
              });
            } else if (updatedItem.type === 'heart') {
              // 하트 (생명력 회복)
              setLives((prev) => Math.min(prev + 1, 5)); // 최대 5개까지
              playPowerUpSound();
            }
          } else if (newY < 900) {
            // 화면 내에 있는 아이템만 유지
            updatedItems.push(updatedItem);
          }
        });

        return updatedItems;
      });

      // 점수 애니메이션 업데이트
      setScoreAnimations((prev) => {
        const now = Date.now();
        return prev
          .map((anim) => ({
            ...anim,
            y: anim.y - 1,
            opacity: 1 - (now - anim.time) / 1000,
          }))
          .filter((anim) => anim.opacity > 0);
      });

      // 레벨 업데이트
      if (score >= level * 1000 && level < 5) {
        setLevel((prev) => {
          const newLevel = prev + 1;
          playSound('levelUp');
          return newLevel;
        });
      }

      // 타이머 업데이트
      setTimeLeft((prev) => {
        if (prev <= 0) {
          endGame();
          return 0;
        }
        return prev - 0.016 * deltaTime;
      });

      // 게임 그리기
      drawGame(ctx, canvas.width, canvas.height);

      // 다음 프레임 요청
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    gameStarted,
    gameOver,
    paused,
    imagesLoaded,
    joystickDirection,
    characterPosition,
    score,
    level,
    drawGame,
    endGame,
    playSound,
    addScore,
    playCoinSound,
    playHitSound,
    playPowerUpSound,
  ]);

  // 캔버스 클릭 이벤트 처리
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 일시정지 버튼 클릭 체크
    const pauseButtonDistance = Math.sqrt(Math.pow(x - 950, 2) + Math.pow(y - 650, 2));
    if (pauseButtonDistance <= 30) {
      setPaused(!paused);
      return;
    }

    // 종료 버튼 클릭 체크
    const exitButtonDistance = Math.sqrt(Math.pow(x - 950, 2) + Math.pow(y - 550, 2));
    if (exitButtonDistance <= 30) {
      onExit();
      return;
    }
  };

  return (
    <div className={css({ width: '100%', height: '100%', position: 'relative' })}>
      {/* 게임 캔버스 */}
      <canvas
        ref={canvasRef}
        width={1100}
        height={965}
        className={css({ width: '100%', height: '100%' })}
        onClick={handleCanvasClick}
      />

      {/* 랭킹 화면 */}
      {showRanking && !gameStarted && (
        <div
          className={css({
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
          })}
        >
          <h2
            className={css({
              color: '#FFFFFF',
              fontFamily: 'monospace',
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '24px',
            })}
          >
            랭킹
          </h2>

          <div
            className={css({
              backgroundColor: '#1A202C',
              border: '2px solid #3B82F6',
              borderRadius: '8px',
              padding: '16px',
              width: '100%',
              maxWidth: '28rem',
              marginBottom: '32px',
            })}
          >
            <div
              className={css({
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: '8px',
                marginBottom: '8px',
                color: '#FFFFFF',
                fontFamily: 'monospace',
                fontWeight: 'bold',
              })}
            >
              <div className={css({ gridColumn: 'span 2', textAlign: 'center' })}>순위</div>
              <div className={css({ gridColumn: 'span 4' })}>이름</div>
              <div className={css({ gridColumn: 'span 3', textAlign: 'right' })}>점수</div>
              <div className={css({ gridColumn: 'span 3', textAlign: 'right' })}>날짜</div>
            </div>

            {rankings.map((rank, index) => (
              <div
                key={index}
                className={css({
                  display: 'grid',
                  gridTemplateColumns: 'repeat(12, 1fr)',
                  gap: '8px',
                  padding: '4px 0',
                  backgroundColor: index % 2 === 0 ? '#2D3748' : '#1A202C',
                  borderRadius: '4px',
                })}
              >
                <div
                  className={css({
                    gridColumn: 'span 2',
                    textAlign: 'center',
                    color: '#FFDB5A',
                    fontFamily: 'monospace',
                  })}
                >
                  {index + 1}
                </div>
                <div className={css({ gridColumn: 'span 4', color: '#FFFFFF', fontFamily: 'monospace' })}>
                  {rank.name}
                </div>
                <div
                  className={css({
                    gridColumn: 'span 3',
                    textAlign: 'right',
                    color: '#68D391',
                    fontFamily: 'monospace',
                  })}
                >
                  {rank.score}
                </div>
                <div
                  className={css({
                    gridColumn: 'span 3',
                    textAlign: 'right',
                    color: '#A0AEC0',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                  })}
                >
                  {rank.date}
                </div>
              </div>
            ))}
          </div>

          <div className={css({ display: 'flex', gap: '16px' })}>
            <button
              className={css({
                backgroundColor: '#2563EB',
                '&:hover': { backgroundColor: '#1D4ED8' },
                color: '#FFFFFF',
                fontWeight: 'bold',
                padding: '8px 24px',
                borderRadius: '4px',
              })}
              onClick={startGame}
            >
              게임 시작
            </button>
            <button
              className={css({
                backgroundColor: '#4B5563',
                '&:hover': { backgroundColor: '#374151' },
                color: '#FFFFFF',
                fontWeight: 'bold',
                padding: '8px 24px',
                borderRadius: '4px',
              })}
              onClick={onExit}
            >
              메인으로
            </button>
          </div>
        </div>
      )}

      {/* 시작 화면 */}
      {!gameStarted && !gameOver && !showRanking && (
        <div
          className={css({
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          <h1 className={css({ color: '#FFFFFF', fontFamily: 'monospace', fontSize: '36px', marginBottom: '32px' })}>
            아이템 캐치 게임
          </h1>
          <p className={css({ color: '#FFFFFF', fontFamily: 'monospace', fontSize: '20px', marginBottom: '16px' })}>
            하늘에서 떨어지는 아이템을 모으세요!
          </p>
          <p className={css({ color: '#FFFFFF', fontFamily: 'monospace', fontSize: '18px', marginBottom: '8px' })}>
            - 코인(100점)과 별(300점)을 모아 점수를 획득하세요
          </p>
          <p className={css({ color: '#FFFFFF', fontFamily: 'monospace', fontSize: '18px', marginBottom: '8px' })}>
            - 빨간 장애물을 피하세요! 생명력이 감소합니다
          </p>
          <p className={css({ color: '#FFFFFF', fontFamily: 'monospace', fontSize: '18px', marginBottom: '32px' })}>
            - 하트를 모아 생명력을 회복하세요
          </p>

          <div className={css({ display: 'flex', gap: '16px' })}>
            <button
              className={css({
                backgroundColor: '#059669',
                '&:hover': { backgroundColor: '#047857' },
                color: '#FFFFFF',
                fontWeight: 'bold',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '20px',
              })}
              onClick={startGame}
            >
              게임 시작
            </button>
            <button
              className={css({
                backgroundColor: '#2563EB',
                '&:hover': { backgroundColor: '#1D4ED8' },
                color: '#FFFFFF',
                fontWeight: 'bold',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '20px',
              })}
              onClick={() => setShowRanking(true)}
            >
              랭킹 보기
            </button>
          </div>
        </div>
      )}

      {/* 게임 오버 화면 */}
      {gameOver && (
        <div
          className={css({
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          <h1 className={css({ color: '#FFFFFF', fontFamily: 'monospace', fontSize: '36px', marginBottom: '16px' })}>
            게임 오버
          </h1>
          <p className={css({ color: '#FFFFFF', fontFamily: 'monospace', fontSize: '24px', marginBottom: '8px' })}>
            최종 점수: {score}
          </p>
          <p className={css({ color: '#FFFFFF', fontFamily: 'monospace', fontSize: '20px', marginBottom: '32px' })}>
            레벨: {level}
          </p>

          {nameInput ? (
            <div className={css({ marginBottom: '32px' })}>
              <p className={css({ color: '#FFFFFF', fontFamily: 'monospace', fontSize: '18px', marginBottom: '8px' })}>
                랭킹에 등록할 이름을 입력하세요:
              </p>
              <div className={css({ display: 'flex', gap: '8px' })}>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  maxLength={8}
                  className={css({
                    backgroundColor: '#1A202C',
                    color: '#FFFFFF',
                    border: '2px solid #3B82F6',
                    borderRadius: '4px',
                    padding: '8px 12px',
                    fontFamily: 'monospace',
                  })}
                  placeholder="이름 입력"
                />
                <button
                  className={css({
                    backgroundColor: '#059669',
                    '&:hover': { backgroundColor: '#047857' },
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    padding: '8px 16px',
                    borderRadius: '4px',
                  })}
                  onClick={addToRanking}
                >
                  등록
                </button>
              </div>
            </div>
          ) : (
            <div className={css({ display: 'flex', gap: '16px', marginBottom: '32px' })}>
              <button
                className={css({
                  backgroundColor: '#059669',
                  '&:hover': { backgroundColor: '#047857' },
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  padding: '12px 24px',
                  borderRadius: '8px',
                })}
                onClick={startGame}
              >
                다시 시작
              </button>
              <button
                className={css({
                  backgroundColor: '#2563EB',
                  '&:hover': { backgroundColor: '#1D4ED8' },
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  padding: '12px 24px',
                  borderRadius: '8px',
                })}
                onClick={() => setShowRanking(true)}
              >
                랭킹 보기
              </button>
            </div>
          )}

          <button
            className={css({
              backgroundColor: '#4B5563',
              '&:hover': { backgroundColor: '#374151' },
              color: '#FFFFFF',
              fontWeight: 'bold',
              padding: '8px 24px',
              borderRadius: '4px',
            })}
            onClick={onExit}
          >
            메인 메뉴
          </button>
        </div>
      )}

      {/* 일시정지 화면 */}
      {paused && gameStarted && !gameOver && (
        <div
          className={css({
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          <h1 className={css({ color: '#FFFFFF', fontFamily: 'monospace', fontSize: '36px', marginBottom: '32px' })}>
            일시 정지
          </h1>
          <div className={css({ display: 'flex', gap: '16px' })}>
            <button
              className={css({
                backgroundColor: '#059669',
                '&:hover': { backgroundColor: '#047857' },
                color: '#FFFFFF',
                fontWeight: 'bold',
                padding: '12px 24px',
                borderRadius: '8px',
              })}
              onClick={() => setPaused(false)}
            >
              계속하기
            </button>
            <button
              className={css({
                backgroundColor: '#DC2626',
                '&:hover': { backgroundColor: '#B91C1C' },
                color: '#FFFFFF',
                fontWeight: 'bold',
                padding: '12px 24px',
                borderRadius: '8px',
              })}
              onClick={onExit}
            >
              그만하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
