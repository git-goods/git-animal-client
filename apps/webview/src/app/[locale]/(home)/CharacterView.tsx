'use client';

import { memo, useEffect, useState } from 'react';
import { css } from '_panda/css';
import { getOnlyPet } from '@gitanimals/api';

import { useClientUser } from '@/utils/clientAuth';

import { Character } from './Character';

const IMAGE_SECRET_KEY = process.env.NEXT_PUBLIC_IMAGE_TOKEN || '';

interface CharacterData {
  id: string;
  svg: string;
  ref: React.MutableRefObject<Character | null>;
  elementRef: React.MutableRefObject<SVGGElement | null>;
}

export const CharacterView = ({ petIds }: { petIds: string[] }) => {
  const session = useClientUser();
  const [characters, setCharacters] = useState<CharacterData[]>([]);

  useEffect(() => {
    // petIds가 변경될 때마다 캐릭터 데이터 초기화
    const characterRefs = petIds.map((petId) => ({
      id: petId,
      svg: '',
      ref: { current: null } as React.MutableRefObject<Character | null>,
      elementRef: { current: null } as React.MutableRefObject<SVGGElement | null>,
    }));
    setCharacters(characterRefs);
  }, [petIds]);

  useEffect(() => {
    // SVG 문자열 가져오기
    const fetchSvgs = async () => {
      if (petIds.length === 0) return;

      try {
        const svgPromises = petIds.map((petId) =>
          getOnlyPet({
            username: session.name,
            petId: petId,
            secretKey: IMAGE_SECRET_KEY,
          }),
        );

        const svgResponses = await Promise.all(svgPromises);

        setCharacters((prevCharacters) =>
          prevCharacters.map((char, index) => ({
            ...char,
            svg: svgResponses[index],
          })),
        );
      } catch (error) {
        console.error('SVG 로드 중 오류 발생:', error);
      }
    };

    fetchSvgs();
  }, [petIds, session.name]);

  useEffect(() => {
    // SVG가 로드된 후 캐릭터 초기화
    const initCharacters = () => {
      // 기존 캐릭터들 정리
      characters.forEach((char) => {
        if (char.ref.current) {
          char.ref.current.destroy();
        }
      });

      // 새 캐릭터들 초기화
      characters.forEach((char) => {
        if (char.elementRef.current && char.svg) {
          char.ref.current = new Character(char.elementRef.current);
        }
      });
    };

    const allSvgsLoaded = characters.every((char) => char.svg);
    if (allSvgsLoaded && characters.length > 0) {
      // SVG가 로드된 후 약간의 지연을 두고 초기화
      setTimeout(initCharacters, 100);
    }

    return () => {
      // 컴포넌트 언마운트 시 정리
      characters.forEach((char) => {
        if (char.ref.current) {
          char.ref.current.destroy();
        }
      });
    };
  }, [characters]);

  return (
    <div className={containerStyle}>
      <svg xmlns="http://www.w3.org/2000/svg" className={svgStyle} viewBox="0 0 375 199" fill="none">
        {characters.map((char, index) => (
          <g
            key={char.id}
            ref={char.elementRef}
            id={`character-container-${index}`}
            dangerouslySetInnerHTML={{ __html: char.svg }}
          />
        ))}
      </svg>
    </div>
  );
};

export const CharacterViewMemo = memo(CharacterView, (prevProps, nextProps) => {
  return prevProps.petIds.length === nextProps.petIds.length;
});

const containerStyle = css({
  border: '1px solid white',
});

const svgStyle = css({
  w: '100%',
  h: '290px',
  maxH: '290px',
});
