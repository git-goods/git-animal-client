import * as React from 'react';

import { cn } from '../../utils/cn';

// PandaCSS `@gitanimals/ui-panda` 의 NoRatingCard 와 1:1.
// 리프(div+img) 컴포넌트. 전역 클래스 훅(animal-card-*)은 그대로 유지.

type CardTierType = 'EX' | 'S_PLUS' | 'A_PLUS' | 'B_MINUS';

interface Props {
  tier: CardTierType;
  type: string;
  personaImage: string;
  bgUrl: string;
  thumbnailUrl: string;
  rightTextEl: React.ReactNode;
}

export function NoRatingCard(props: Props) {
  return (
    <div className={cn('animal-card-container', 'relative h-[328px] w-[265px]')}>
      <div className="absolute left-0 top-0 z-0 h-full w-full">
        <img src={props.bgUrl} alt={props.tier} width={265} height={328} draggable={false} />
      </div>
      <div className="absolute left-[16px] right-[16px] top-[16px] z-[1]">
        <img src={props.thumbnailUrl} alt={props.tier} width={233} height={233} draggable={false} />
      </div>
      <div className="absolute left-[16px] right-[16px] top-[16px] z-[1]">
        <img src={props.personaImage} alt={props.type} width={233} height={233} draggable={false} />
      </div>
      <div className={cn('animal-card-info', 'absolute bottom-[20px] left-[20px] right-[20px] flex justify-between gap-[8px]')}>
        <p className="animal-card-type glyph24-bold overflow-hidden text-ellipsis whitespace-nowrap leading-[40px]">
          {snakeToTitleCase(props.type)}
        </p>
        <p className="animal-card-rating glyph22-regular leading-[40px]">{props.rightTextEl}</p>
      </div>
    </div>
  );
}

/**
 * 스네이크 케이스 문자열을 타이틀 케이스로 변환합니다.
 * @example snakeToTitleCase('SUMI_MA') => 'Sumi Ma'
 */
export const snakeToTitleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
