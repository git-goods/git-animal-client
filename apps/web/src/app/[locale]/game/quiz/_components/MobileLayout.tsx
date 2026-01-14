import React from 'react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { cn } from '@gitanimals/ui-tailwind';

import GNB from '@/components/GNB/GNB';

interface MobileLayoutProps {
  background?: {
    url: string;
    position?: 'top' | 'absolute' | 'bottom' | 'center';
    opacity?: number;
  };
  children: React.ReactNode;
}

const getBackgroundPositionClass = (position?: string) => {
  switch (position) {
    case 'top':
      return 'bg-top';
    case 'bottom':
      return 'bg-bottom';
    case 'absolute':
    case 'center':
    default:
      return 'bg-center';
  }
};

export const MobileLayout = async ({ children, background }: MobileLayoutProps) => {
  const t = await getTranslations('HomePage');
  return (
    <div className="relative flex flex-col items-center w-full h-full bg-black z-0">
      <GNB />
      <div className="relative flex justify-center w-full h-full min-h-[calc(100vh-var(--mobile-header-height))]">
        <div
          className={cn(
            'absolute w-full h-full bg-cover bg-no-repeat pointer-events-none',
            getBackgroundPositionClass(background?.position),
          )}
          style={{
            backgroundImage: `url(${background?.url})`,
            opacity: background?.opacity ?? 0.3,
          }}
        />
        <div className="sticky w-[min(100vw,475px)] h-[calc(100vh-var(--mobile-header-height))] flex flex-col justify-center items-center gap-4 text-white text-lg max-[950px]:hidden">
          <Image
            className="drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
            src="/layout/gitanimals-string-logo-white.svg"
            alt="gitanimals-logo"
            width={266}
            height={75}
          />
          <p>{t('description')}</p>
        </div>
        <div className="relative z-[1] w-full max-w-[475px] h-full min-h-[calc(100vh-var(--mobile-header-height))] flex flex-col justify-start items-start">
          {children}
        </div>
      </div>
    </div>
  );
};
