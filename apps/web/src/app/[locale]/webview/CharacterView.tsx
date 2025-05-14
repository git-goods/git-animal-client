'use client';

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import { Character } from './Character';

export default function CharacterView() {
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
        const [snowmanResponse, foxResponse] = await Promise.all([
          axios.get('/api/render?type=snowman'),
          axios.get('/api/render?type=fox'),
        ]);
        setSnowmanSvg(snowmanResponse.data);
        setFoxSvg(foxResponse.data);
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
    <div className="relative w-full h-full">
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300" fill="none">
        {snowmanSvg && (
          <g ref={snowmanElementRef} id="snowman-container" dangerouslySetInnerHTML={{ __html: snowmanSvg }}>
            {/* <g dangerouslySetInnerHTML={{ __html: snowmanSvg }} /> */}
          </g>
        )}
        {foxSvg && (
          <g ref={foxElementRef} id="fox-container" dangerouslySetInnerHTML={{ __html: foxSvg }}>
            {/* <g dangerouslySetInnerHTML={{ __html: foxSvg }} /> */}
          </g>
        )}
        <rect x="0.5" y="0.5" width="599" height="299" rx="4.5" stroke="#00894D" />
      </svg>
    </div>
  );
}
