'use client';

import { useEffect, useRef } from 'react';

import { Character } from './Character';
import { CharacterSVG } from './character-svg';

export default function CharacterView() {
  const characterRef = useRef<Character | null>(null);

  useEffect(() => {
    // SVG가 로드된 후 캐릭터 초기화
    const initCharacter = () => {
      if (characterRef.current) {
        characterRef.current.destroy();
      }
      characterRef.current = new Character('little-chick-1');
    };

    // SVG 로드 확인
    const checkSvgLoaded = () => {
      const svg = document.getElementById('little-chick-1');
      if (svg) {
        initCharacter();
      } else {
        setTimeout(checkSvgLoaded, 100);
      }
    };

    checkSvgLoaded();

    return () => {
      if (characterRef.current) {
        characterRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <CharacterSVG />
    </div>
  );
}
