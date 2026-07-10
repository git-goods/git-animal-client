import { cn } from '@gitanimals/ui-tailwind';

import { getPersonaImage } from '@/utils/image';

type PersonaBannerSize = 'default' | 'small';

export function PersonaBanner({
  level,
  personaType,
  size = 'default',
}: {
  level: number | string;
  personaType: string;
  size?: PersonaBannerSize;
}) {
  const isSmall = size === 'small';
  return (
    <div className={cn(itemStyle, isSmall && itemSmallStyle)}>
      <div className={mergeItemStyle}>
        <img
          src={getPersonaImage(personaType)}
          alt={personaType}
          className={cn(imageStyle, isSmall && imageSmallStyle)}
        />
      </div>
      <div className={cn(levelTextStyle, isSmall && levelTextSmallStyle)}>Level {level}</div>
    </div>
  );
}

export function PersonaBannerUnknown({ size = 'default' }: { size?: PersonaBannerSize }) {
  const isSmall = size === 'small';
  return (
    <div className={cn(itemStyle, isSmall && itemSmallStyle)}>
      <img src="/mypage/merge/merge-empty.svg" alt="empty" className={cn(imageStyle, isSmall && imageSmallStyle)} />
      <div className={cn(levelTextStyle, levelEmptyTextStyle, isSmall && levelTextSmallStyle)}>Level ?</div>
    </div>
  );
}

export function PersonaGradientBanner({ level }: { level: number | string }) {
  return (
    <div className={itemStyle}>
      <div className={mergeItemStyle}>
        <img src="/assets/mypage/evolution/evolution-empty.svg" alt="empty" className={imageStyle} />
      </div>
      <div className={cn(levelTextStyle, 'evolution-rainbow-gradient-text')}>Level {level}</div>
    </div>
  );
}

const itemStyle = 'relative p-[8px]';

const itemSmallStyle = 'p-[6px]';

const imageStyle = 'object-contain w-[120px] h-[120px]';

const imageSmallStyle = 'w-[72px] h-[72px]';

const levelTextStyle = 'text-center mt-[12px] glyph18-bold text-white-100';

const levelTextSmallStyle = 'mt-[6px] glyph14-bold';

const levelEmptyTextStyle = 'text-white-75';

const mergeItemStyle = 'rounded-[16px] border-2 border-solid border-[rgba(255,255,255,0.25)] bg-[rgba(255,255,255,0.25)]';
