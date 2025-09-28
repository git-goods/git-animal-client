import React from 'react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { css } from '_panda/css';

import GNB from '@/components/GNB/GNB';

interface MobileLayoutProps {
  background?: {
    url: string;
    position?: 'top' | 'absolute' | 'bottom' | 'center';
    opacity?: number;
  };
  children: React.ReactNode;
}

export const MobileLayout = async ({ children, background }: MobileLayoutProps) => {
  const t = await getTranslations('HomePage');
  return (
    <div className={layoutStyle}>
      <GNB />
      <div className={bodyContainerStyle}>
        <div className={backgroundStyle(background)} style={{ backgroundImage: `url(${background?.url})` }} />
        <div className={logoContainerStyle}>
          <Image
            className={logoStyle}
            src="/layout/gitanimals-string-logo-white.svg"
            alt="gitanimals-logo"
            width={266}
            height={75}
          />
          <p>{t('description')}</p>
        </div>
        <div className={contentStyle}>{children}</div>
      </div>
    </div>
  );
};

const layoutStyle = css({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: 'black',
  zIndex: 0,
});

const bodyContainerStyle = css({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  minHeight: 'calc(100vh - var(--mobile-header-height))',
});

const backgroundStyle = (background?: MobileLayoutProps['background']) =>
  css({
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundPosition: background?.position ?? 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    opacity: background?.opacity ?? 0.3,
    pointerEvents: 'none',
  });

const logoContainerStyle = css({
  position: 'sticky',
  width: 'min(100vw, 475px)',
  height: `calc(100vh - var(--mobile-header-height))`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '16px',
  color: 'white',
  fontSize: '18px',

  '@media (max-width: 950px)': {
    display: 'none',
  },
});

const logoStyle = css({
  dropShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
});

const contentStyle = css({
  position: 'relative',
  zIndex: 1,
  width: '100%',
  maxWidth: '475px',
  height: '100%',
  minHeight: 'calc(100vh - var(--mobile-header-height))',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
});
