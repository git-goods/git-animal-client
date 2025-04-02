'use client';

import React from 'react';
import { useEffect, useRef, useState } from 'react';

import { getDummyPersonaImage } from '@/utils/image';

import { GAME_CONSTANTS } from './game-constants';
import type { Character } from './game-types';
import { darkenColor, getRandomPosition, lightenColor } from './game-utils';

export default function IsometricGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const [longPressTarget, setLongPressTarget] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState<number | null>(null);

  // 롱프레스 타이머 참조
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 게임 상태를 ref로 관리하여 렌더링 루프 방지
  const gameStateRef = useRef({
    characters: [
      {
        id: 1,
        position: { x: 200, y: 150 },
        targetPosition: null,
        jumpHeight: 0,
        isJumping: false,
        color: GAME_CONSTANTS.COLORS.RED,
        secondaryColor: GAME_CONSTANTS.COLORS.DARK_RED,
        size: 20,
        speed: GAME_CONSTANTS.MOVEMENT.SLOW_SPEED,
        isIdle: false,
        idleTimer: 0,
        showSpeechBubble: false,
        speechBubbleText: '',
        speechBubbleTimer: 0,
        image: getDummyPersonaImage(),
      },
      {
        id: 2,
        position: { x: 300, y: 250 },
        targetPosition: null,
        jumpHeight: 0,
        isJumping: false,
        color: GAME_CONSTANTS.COLORS.TEAL,
        secondaryColor: GAME_CONSTANTS.COLORS.DARK_TEAL,
        size: 18,
        speed: GAME_CONSTANTS.MOVEMENT.VERY_SLOW_SPEED,
        isIdle: false,
        idleTimer: 0,
        showSpeechBubble: false,
        speechBubbleText: '',
        speechBubbleTimer: 0,
        image: getDummyPersonaImage(),
      },
      {
        id: 3,
        position: { x: 400, y: 350 },
        targetPosition: null,
        jumpHeight: 0,
        isJumping: false,
        color: GAME_CONSTANTS.COLORS.YELLOW,
        secondaryColor: GAME_CONSTANTS.COLORS.DARK_YELLOW,
        size: 22,
        speed: GAME_CONSTANTS.MOVEMENT.MEDIUM_SLOW_SPEED,
        isIdle: false,
        idleTimer: 0,
        showSpeechBubble: false,
        speechBubbleText: '',
        speechBubbleTimer: 0,
        image: getDummyPersonaImage(),
      },
      {
        id: 4,
        position: { x: 500, y: 200 },
        targetPosition: null,
        jumpHeight: 0,
        isJumping: false,
        color: GAME_CONSTANTS.COLORS.PURPLE,
        secondaryColor: GAME_CONSTANTS.COLORS.DARK_PURPLE,
        size: 19,
        speed: GAME_CONSTANTS.MOVEMENT.SLOW_SPEED,
        isIdle: false,
        idleTimer: 0,
        showSpeechBubble: false,
        speechBubbleText: '',
        speechBubbleTimer: 0,
        image: getDummyPersonaImage(),
      },
    ] as Character[],
    lastTimestamp: 0,
    canvasWidth: 0,
    canvasHeight: 0,
  });

  // 캔버스 초기화
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 캔버스 크기 설정
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        // 컨테이너에 맞춤 (반응형)
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        gameStateRef.current.canvasWidth = canvas.width;
        gameStateRef.current.canvasHeight = canvas.height;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 초기 타겟 위치 설정
    gameStateRef.current.characters.forEach((character) => {
      character.targetPosition = getRandomPosition(canvas.width, canvas.height);
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }

      // 롱프레스 타이머 정리
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
      }
    };
  }, []);

  // 게임 애니메이션 루프
  useEffect(() => {
    const animate = (timestamp: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 델타 타임 계산 (부드러운 애니메이션을 위해)
      const deltaTime = gameStateRef.current.lastTimestamp ? (timestamp - gameStateRef.current.lastTimestamp) / 16 : 1;
      gameStateRef.current.lastTimestamp = timestamp;

      // 캔버스 지우기
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 배경 그리기
      drawBackground(ctx, canvas.width, canvas.height);

      // 모든 캐릭터 업데이트 및 그리기
      gameStateRef.current.characters.forEach((character) => {
        // 드래그 중인 캐릭터가 아닌 경우에만 업데이트
        if (isDragging !== character.id) {
          updateCharacter(character, deltaTime, canvas.width, canvas.height);
        }

        // 캐릭터 그리기
        drawCharacter(ctx, character);
      });

      // 다음 프레임 요청
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isDragging]);

  // 배경 그리기
  const drawBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // 그라데이션 배경
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, GAME_CONSTANTS.COLORS.SKY_BLUE);
    gradient.addColorStop(1, GAME_CONSTANTS.COLORS.LIGHT_BLUE);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // 바닥 그리드 (미묘한 그리드 패턴)
    ctx.strokeStyle = GAME_CONSTANTS.COLORS.GRID_LINE;
    ctx.lineWidth = 1;

    const gridSize = GAME_CONSTANTS.GRID.SIZE;
    const offsetX = width / 2;
    const offsetY = height / 2;

    // 아이소메트릭 그리드 그리기
    for (let i = -20; i < 20; i++) {
      // 첫 번째 대각선 세트
      ctx.beginPath();
      ctx.moveTo(offsetX + i * gridSize - 1000, offsetY - 500);
      ctx.lineTo(offsetX + i * gridSize + 1000, offsetY + 500);
      ctx.stroke();

      // 두 번째 대각선 세트
      ctx.beginPath();
      ctx.moveTo(offsetX + i * gridSize - 1000, offsetY + 500);
      ctx.lineTo(offsetX + i * gridSize + 1000, offsetY - 500);
      ctx.stroke();
    }

    // 바닥 타일 그리기
    for (let x = 0; x < width; x += gridSize) {
      for (let y = 0; y < height; y += gridSize) {
        // 체스판 패턴으로 타일 그리기
        if ((Math.floor(x / gridSize) + Math.floor(y / gridSize)) % 2 === 0) {
          ctx.fillStyle = GAME_CONSTANTS.COLORS.TILE_HIGHLIGHT;
          ctx.fillRect(x, y, gridSize, gridSize);
        }
      }
    }
  };

  // 캐릭터 업데이트
  const updateCharacter = (character: Character, deltaTime: number, canvasWidth: number, canvasHeight: number) => {
    // 말풍선 타이머 업데이트
    if (character.showSpeechBubble) {
      character.speechBubbleTimer -= deltaTime;
      if (character.speechBubbleTimer <= 0) {
        character.showSpeechBubble = false;
      }
    }

    // 점프 업데이트
    if (character.isJumping) {
      character.jumpHeight += GAME_CONSTANTS.JUMP.SPEED * deltaTime;
      if (character.jumpHeight >= GAME_CONSTANTS.JUMP.HEIGHT) {
        character.isJumping = false;
      }
    } else if (character.jumpHeight > 0) {
      character.jumpHeight -= GAME_CONSTANTS.JUMP.SPEED * deltaTime;
      if (character.jumpHeight < 0) {
        character.jumpHeight = 0;
      }
    }

    // 대기 상태 업데이트
    if (character.isIdle) {
      character.idleTimer -= deltaTime;
      if (character.idleTimer <= 0) {
        character.isIdle = false;
        character.targetPosition = getRandomPosition(canvasWidth, canvasHeight);

        // 가끔 움직일 때 말풍선 표시
        if (Math.random() < GAME_CONSTANTS.SPEECH.MOVE_CHANCE) {
          const phrases = GAME_CONSTANTS.SPEECH.MOVE_PHRASES;
          character.speechBubbleText = phrases[Math.floor(Math.random() * phrases.length)];
          character.showSpeechBubble = true;
          character.speechBubbleTimer = GAME_CONSTANTS.SPEECH.DURATION;
        }
      }
      return;
    }

    // 목표 위치가 없으면 새로 설정
    if (!character.targetPosition) {
      character.targetPosition = getRandomPosition(canvasWidth, canvasHeight);
    }

    // 목표 위치로 이동
    const dx = character.targetPosition.x - character.position.x;
    const dy = character.targetPosition.y - character.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < character.speed) {
      // 목표 도달, 새 목표 설정 또는 대기 상태로 전환
      if (Math.random() < GAME_CONSTANTS.MOVEMENT.IDLE_CHANCE) {
        // 40% 확률로 대기 상태
        character.isIdle = true;
        character.idleTimer =
          Math.random() * GAME_CONSTANTS.MOVEMENT.MAX_IDLE_TIME + GAME_CONSTANTS.MOVEMENT.MIN_IDLE_TIME;

        // 가끔 멈출 때 말풍선 표시
        if (Math.random() < GAME_CONSTANTS.SPEECH.IDLE_CHANCE) {
          const phrases = GAME_CONSTANTS.SPEECH.IDLE_PHRASES;
          character.speechBubbleText = phrases[Math.floor(Math.random() * phrases.length)];
          character.showSpeechBubble = true;
          character.speechBubbleTimer = GAME_CONSTANTS.SPEECH.DURATION;
        }
      } else {
        character.targetPosition = getRandomPosition(canvasWidth, canvasHeight);
      }
    } else {
      // 현재 타겟을 향해 이동
      const moveX = (dx / distance) * character.speed * deltaTime;
      const moveY = (dy / distance) * character.speed * deltaTime;
      character.position.x += moveX;
      character.position.y += moveY;
    }
  };

  // 캐릭터 그리기
  const drawCharacter = (ctx: CanvasRenderingContext2D, character: Character) => {
    const { position, jumpHeight, size, color, secondaryColor } = character;

    ctx.save();

    // 그림자
    ctx.beginPath();
    ctx.ellipse(position.x, position.y, size * 0.8, size * 0.4, 0, 0, Math.PI * 2);
    ctx.fillStyle = GAME_CONSTANTS.COLORS.SHADOW;
    ctx.fill();

    // 캐릭터 본체 (30도 각도로 바라보는 공)
    const characterY = position.y - size - jumpHeight;

    // 캐릭터 몸체 (약간 타원형)
    ctx.beginPath();
    ctx.ellipse(position.x, characterY, size, size * 0.8, 0, 0, Math.PI * 2);

    // 그라데이션으로 입체감 표현
    const gradient = ctx.createRadialGradient(
      position.x - size * 0.3,
      characterY - size * 0.3,
      0,
      position.x,
      characterY,
      size,
    );
    gradient.addColorStop(0, lightenColor(color, 20));
    gradient.addColorStop(1, secondaryColor);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.lineWidth = 2;
    ctx.strokeStyle = darkenColor(secondaryColor, 20);
    ctx.stroke();

    // 캐릭터 얼굴 특징 (30도 각도로 바라보는 방향)
    // 눈
    ctx.fillStyle = GAME_CONSTANTS.COLORS.WHITE;
    ctx.beginPath();
    ctx.ellipse(position.x - size * 0.2, characterY - size * 0.1, size * 0.15, size * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(position.x + size * 0.3, characterY - size * 0.1, size * 0.15, size * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();

    // 눈동자 (30도 방향을 바라봄)
    ctx.fillStyle = GAME_CONSTANTS.COLORS.BLACK;
    ctx.beginPath();
    ctx.ellipse(position.x - size * 0.15, characterY - size * 0.1, size * 0.05, size * 0.05, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(position.x + size * 0.35, characterY - size * 0.1, size * 0.05, size * 0.05, 0, 0, Math.PI * 2);
    ctx.fill();

    // 입 (약간 미소)
    ctx.beginPath();
    ctx.arc(position.x + size * 0.1, characterY + size * 0.2, size * 0.2, 0, Math.PI);
    ctx.strokeStyle = GAME_CONSTANTS.COLORS.BLACK;
    ctx.lineWidth = 2;
    ctx.stroke();

    // 말풍선 (표시 중일 때만)
    if (character.showSpeechBubble) {
      drawSpeechBubble(ctx, position.x, characterY - size * 2, character.speechBubbleText);
    }

    // 드래그 중이거나 롱프레스 중인 캐릭터 표시
    if (isDragging === character.id || longPressTarget === character.id) {
      ctx.beginPath();
      ctx.arc(position.x, characterY, size * 1.5, 0, Math.PI * 2);
      ctx.strokeStyle = GAME_CONSTANTS.COLORS.SELECTION;
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.restore();
  };

  // 말풍선 그리기
  const drawSpeechBubble = (ctx: CanvasRenderingContext2D, x: number, y: number, text: string) => {
    ctx.save();

    // 텍스트 측정
    ctx.font = '14px Arial';
    const textWidth = ctx.measureText(text).width;
    const bubbleWidth = textWidth + 20;
    const bubbleHeight = 30;

    // 말풍선 배경
    ctx.fillStyle = GAME_CONSTANTS.COLORS.WHITE;
    ctx.beginPath();
    ctx.roundRect(x - bubbleWidth / 2, y - bubbleHeight / 2, bubbleWidth, bubbleHeight, 10);
    ctx.fill();
    ctx.strokeStyle = GAME_CONSTANTS.COLORS.BLACK;
    ctx.lineWidth = 1;
    ctx.stroke();

    // 말풍선 꼬리
    ctx.beginPath();
    ctx.moveTo(x, y + bubbleHeight / 2);
    ctx.lineTo(x - 10, y + bubbleHeight / 2 + 10);
    ctx.lineTo(x + 10, y + bubbleHeight / 2 + 10);
    ctx.closePath();
    ctx.fillStyle = GAME_CONSTANTS.COLORS.WHITE;
    ctx.fill();
    ctx.stroke();

    // 텍스트
    ctx.fillStyle = GAME_CONSTANTS.COLORS.BLACK;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);

    ctx.restore();
  };

  // 마우스 다운 이벤트 (롱프레스 시작)
  const handleMouseDown = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // 클릭한 위치에 캐릭터가 있는지 확인
    for (const character of gameStateRef.current.characters) {
      const characterY = character.position.y - character.size - character.jumpHeight;
      const dx = mouseX - character.position.x;
      const dy = mouseY - characterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 캐릭터를 클릭했을 때
      if (distance < character.size * 1.5) {
        // 롱프레스 타이머 설정
        if (longPressTimerRef.current) {
          clearTimeout(longPressTimerRef.current);
        }

        setLongPressTarget(character.id);

        longPressTimerRef.current = setTimeout(() => {
          // 롱프레스 감지 - 드래그 시작
          setIsDragging(character.id);
          setLongPressTarget(null);

          // 말풍선 표시
          character.speechBubbleText = GAME_CONSTANTS.SPEECH.DRAG_PHRASE;
          character.showSpeechBubble = true;
          character.speechBubbleTimer = GAME_CONSTANTS.SPEECH.DURATION;
        }, GAME_CONSTANTS.INTERACTION.LONG_PRESS_DURATION);

        break;
      }
    }
  };

  // 마우스 업 이벤트 (클릭 또는 드래그 종료)
  const handleMouseUp = (e: React.MouseEvent) => {
    // 롱프레스 타이머 취소
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    // 롱프레스 중이었다면 클릭으로 처리
    if (longPressTarget !== null && isDragging === null) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // 클릭한 위치에 캐릭터가 있는지 확인
      for (const character of gameStateRef.current.characters) {
        if (character.id === longPressTarget) {
          // 점프 시작
          character.isJumping = true;
          character.jumpHeight = 0;
          character.speechBubbleText = GAME_CONSTANTS.SPEECH.JUMP_PHRASE;
          character.showSpeechBubble = true;
          character.speechBubbleTimer = GAME_CONSTANTS.SPEECH.SHORT_DURATION;
          break;
        }
      }
    }

    // 드래그 중이었다면 드래그 종료
    if (isDragging !== null) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // 드래그 중인 캐릭터 찾기
      const character = gameStateRef.current.characters.find((c) => c.id === isDragging);
      if (character) {
        // 캐릭터 위치 업데이트
        character.position.x = mouseX;
        character.position.y = mouseY + character.size; // 마우스 위치 조정
        character.targetPosition = null; // 새 목표 위치 설정 필요

        // 말풍선 표시
        character.speechBubbleText = GAME_CONSTANTS.SPEECH.DROP_PHRASE;
        character.showSpeechBubble = true;
        character.speechBubbleTimer = GAME_CONSTANTS.SPEECH.DURATION;
      }
    }

    setLongPressTarget(null);
    setIsDragging(null);
  };

  // 마우스 이동 이벤트 (드래그)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging === null) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // 드래그 중인 캐릭터 찾기
    const character = gameStateRef.current.characters.find((c) => c.id === isDragging);
    if (character) {
      // 캐릭터 위치 업데이트
      character.position.x = mouseX;
      character.position.y = mouseY + character.size; // 마우스 위치 조정
    }
  };

  // 마우스 나가기 이벤트
  const handleMouseLeave = () => {
    // 롱프레스 타이머 취소
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    setLongPressTarget(null);
    setIsDragging(null);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          margin: '0',
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
}
