'use client';

import React, { useEffect, useRef } from 'react';

import { getDummyPersonaImage } from '@/utils/image';

import { GameCanvas } from './game/GameCanvas';

export default function IsometricGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameCanvasRef = useRef<GameCanvas | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // GameCanvas 인스턴스 생성
    gameCanvasRef.current = new GameCanvas(canvas);
    gameCanvasRef.current.startAnimation();

    // 이미지 로드
    const loadCharacterImages = async () => {
      if (!gameCanvasRef.current) return;

      const characters = gameCanvasRef.current.getCharacters();
      const dummyImage = getDummyPersonaImage();

      for (const character of characters) {
        const img = new Image();
        img.src = dummyImage;
        await new Promise((resolve) => {
          img.onload = resolve;
        });
        character.setImageElement(img);
      }
    };

    loadCharacterImages();

    return () => {
      if (gameCanvasRef.current) {
        gameCanvasRef.current.cleanup();
      }
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    gameCanvasRef.current?.handleMouseDown(e);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    gameCanvasRef.current?.handleMouseUp(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    gameCanvasRef.current?.handleMouseMove(e);
  };

  const handleMouseLeave = () => {
    gameCanvasRef.current?.handleMouseLeave();
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
