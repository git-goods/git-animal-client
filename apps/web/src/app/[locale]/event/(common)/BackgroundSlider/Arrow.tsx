import Image from 'next/image';
import { cn } from '@gitanimals/ui-tailwind';

export function ArrowButton({
  onClick,
  direction,
  disabled,
}: {
  onClick: () => void;
  direction: 'prev' | 'next';
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        direction === 'prev' ? prevArrowStyle : nextArrowStyle,
        direction === 'prev' ? 'rotate-[180deg]' : 'rotate-[0deg]',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        disabled ? 'w-[36px] h-[36px] mobile:w-[24px] mobile:h-[24px]' : 'w-[40px] h-[40px] mobile:w-[26px] mobile:h-[26px]',
      )}
    >
      {disabled ? (
        <Image src="/icon/circle-arrow-disable.svg" alt="arrow" width={36} height={36} />
      ) : (
        <Image src="/icon/circle-arrow.svg" alt="arrow" width={40} height={40} />
      )}
    </button>
  );
}

const arrowStyle =
  'absolute top-0 bottom-0 m-auto z-floating [&_img]:w-full [&_img]:h-full mobile:bottom-[72px]';

const prevArrowStyle = cn(arrowStyle, 'left-[-62px] mobile:left-[-26px]');

const nextArrowStyle = cn(arrowStyle, 'right-[-62px] mobile:right-[-26px]');
