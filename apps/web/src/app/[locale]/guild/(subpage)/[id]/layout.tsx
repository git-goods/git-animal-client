import Image from 'next/image';
import { cn } from '@gitanimals/ui-tailwind/utils';

export default function GuildLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <>
      <div className={bottomBgStyle}>
        <Image src="/guild/guild-bg-bottom.webp" className="bg-bottom" alt="bg-bottom" width={3600} height={228} />
        <Image
          src="/guild/guild-bg-bottom-house.webp"
          className="bg-bottom-house"
          alt="bg-bottom"
          width={257}
          height={202}
        />
      </div>
      <div className={containerStyle}>{children}</div>
      {modal}
    </>
  );
}

const containerStyle = cn(
  'relative w-full max-w-[880px] m-auto min-h-full',
  'flex flex-col justify-center py-[120px]',
  'max-mobile:py-0 max-mobile:min-h-fit',
  'max-mobile:h-[calc(100vh-var(--mobile-header-height))] max-mobile:p-4'
);

const bottomBgStyle = cn(
  'absolute w-screen bottom-0 left-1/2 -translate-x-1/2',
  '[&_.bg-bottom]:h-[228px] [&_.bg-bottom]:object-cover',
  '[&_.bg-bottom-house]:absolute [&_.bg-bottom-house]:bottom-8 [&_.bg-bottom-house]:right-[62px]',
  '[&_.bg-bottom-house]:h-[202px] [&_.bg-bottom-house]:w-auto [&_.bg-bottom-house]:object-contain'
);
