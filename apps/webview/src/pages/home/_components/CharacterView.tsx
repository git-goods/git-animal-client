'use client';

import { useEffect, useRef, useState } from 'react';
import { css } from '_panda/css';
import { getOnlyPet } from '@gitanimals/api';

// import { useClientUser } from '@/utils/clientAuth';

import { Character } from './Character';

const IMAGE_SECRET_KEY = process.env.NEXT_PUBLIC_IMAGE_TOKEN || '';

export default function CharacterView() {
  // const session = useClientUser();

  const snowmanRef = useRef<Character | null>(null);
  const foxRef = useRef<Character | null>(null);
  const snowmanElementRef = useRef<SVGGElement>(null);
  const foxElementRef = useRef<SVGGElement>(null);
  const [snowmanSvg, setSnowmanSvg] = useState<string>('');
  const [foxSvg, setFoxSvg] = useState<string>('');

  useEffect(() => {
    // SVG 문자열 가져오기
    const fetchSvgs = async () => {
      try {
        // const [snowmanResponse, foxResponse] = await Promise.all([
        //   getOnlyPet({
        //     username: session.name,
        //     petId: '641456247052154861',
        //     secretKey: IMAGE_SECRET_KEY,
        //   }),
        //   getOnlyPet({
        //     username: session.name,
        //     petId: '586220803811802842',
        //     secretKey: IMAGE_SECRET_KEY,
        //   }),
        // ]);
        // setSnowmanSvg(snowmanResponse);
        // setFoxSvg(foxResponse);
      } catch (error) {
        console.error('SVG 로드 중 오류 발생:', error);
      }
    };

    fetchSvgs();
  }, []);

  useEffect(() => {
    // SVG가 로드된 후 캐릭터 초기화
    const initCharacters = () => {
      if (snowmanRef.current) {
        snowmanRef.current.destroy();
      }
      if (foxRef.current) {
        foxRef.current.destroy();
      }

      if (snowmanElementRef.current) {
        snowmanRef.current = new Character(snowmanElementRef.current);
      }
      if (foxElementRef.current) {
        foxRef.current = new Character(foxElementRef.current);
      }
    };

    if (snowmanSvg && foxSvg) {
      // SVG가 로드된 후 약간의 지연을 두고 초기화
      setTimeout(initCharacters, 100);
    }

    return () => {
      if (snowmanRef.current) {
        snowmanRef.current.destroy();
      }
      if (foxRef.current) {
        foxRef.current.destroy();
      }
    };
  }, [snowmanSvg, foxSvg]);

  return (
    <div className={containerStyle}>
      <svg xmlns="http://www.w3.org/2000/svg" className={svgStyle} viewBox="0 0 375 199" fill="none">
        {snowmanSvg && (
          <g ref={snowmanElementRef} id="snowman-container" dangerouslySetInnerHTML={{ __html: snowmanSvg }}></g>
        )}
        {foxSvg && <g ref={foxElementRef} id="fox-container" dangerouslySetInnerHTML={{ __html: foxSvg }}></g>}
      </svg>
    </div>
  );
}

const containerStyle = css({
  border: '1px solid white',
});

const svgStyle = css({
  w: '100%',
  h: '290px',
  maxH: '290px',
});
