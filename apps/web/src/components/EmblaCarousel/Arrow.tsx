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
        'absolute top-0 bottom-[64px] m-auto z-floating',
        '[&_img]:w-full [&_img]:h-auto',
        'max-mobile:bottom-[72px]',
        direction === 'prev' ? 'left-[-62px] max-mobile:left-[-26px]' : 'right-[-62px] max-mobile:right-[-26px]',
        direction === 'prev' ? 'rotate-180' : 'rotate-0',
        disabled ? 'cursor-not-allowed w-9 h-9 max-mobile:w-6 max-mobile:h-6' : 'cursor-pointer w-10 h-10 max-mobile:w-[26px] max-mobile:h-[26px]'
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
