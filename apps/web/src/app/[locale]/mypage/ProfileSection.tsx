/* eslint-disable @next/next/no-img-element */
'use client';

import { memo } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { css, cx } from '_panda/css';
import { flex } from '_panda/patterns';
import { userQueries } from '@gitanimals/react-query';
import { Skeleton } from '@gitanimals/ui-panda';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ChevronRight, FlaskConical } from 'lucide-react';

import { Link, usePathname } from '@/i18n/routing';
import { addNumberComma } from '@/utils/number';

const profileSkeletonStyle = css({
  '& > div': {
    margin: '32px 20px',
    _mobile: {
      width: '48px',
      height: '48px',
    },
  },
});

export const ProfileSection = memo(
  wrap
    .Suspense({
      fallback: (
        <section className={profileSkeletonStyle}>
          <Skeleton width={160} height={160} borderRadius="50%" />
        </section>
      ),
    })
    .ErrorBoundary({ fallback: <section></section> })
    .on(function ProfileSection() {
      const t = useTranslations('Mypage');
      const pathname = usePathname();

      const { data } = useSuspenseQuery(userQueries.userOptions());

      const isMypagePath = pathname === '/mypage';
      const isMyPetPath = pathname === '/mypage/my-pet';

      return (
        <section className={profileSectionStyle}>
          <div className={profileImageStyle}>
            <img src={data.profileImage ?? ''} alt="profile" width={160} height={160} />
          </div>
          <div className={profileTextStyle}>
            <p className={profileNameStyle}>{data?.username}</p>
            <div className={pointStyle}>
              <Image src="/mypage/coin.svg" alt="coin" width={24} height={24} /> {addNumberComma(data.points ?? 0)}
            </div>
          </div>
          <hr className={dividerStyle} />
          <div className={navStyle}>
            <Link href="/mypage" className={cx(navItemStyle, isMypagePath && 'selected')}>
              <ChevronRight size={20} color={isMypagePath ? '#FCFD9C' : '#FFFFFF80'} />
              <span>{t('github-custom')}</span>
            </Link>
            <Link href="/mypage/my-pet" className={cx(navItemStyle, isMyPetPath && 'selected')}>
              <ChevronRight size={20} color={isMyPetPath ? '#FCFD9C' : '#FFFFFF80'} />
              <span>{t('my-pet')}</span>
            </Link>
          </div>
          <Link href="/laboratory" className={laboButtonStyle}>
            <FlaskConical />
            {t('laboratory')}
          </Link>
        </section>
      );
    }),
);

const laboButtonStyle = css({
  background: 'white.white_10',
  backdropFilter: 'blur(7px)',
  borderRadius: '8px',
  p: '10px 20px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  textStyle: 'glyph16.regular',
  color: 'white.white_100',

  marginTop: '24px',
  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  transition: 'background 0.3s ease',

  _hover: {
    background: 'linear-gradient(150.51deg, #016EDB 11.25%, #16B7CD 61.95%, #5CCA69 94.01%)',
    animation: 'pulse 1.6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },

  _pc: {
    p: '8px 12px',
    '& > svg': {
      width: '18px',
      height: '18px',
    },
  },
  _mobile: {
    display: 'none',
  },
});

const profileSectionStyle = css({
  _mobile: {
    display: 'flex',
    padding: '32px 20px',
    gap: '12px',
    alignItems: 'center',
  },
});

const profileTextStyle = css({
  _mobile: {
    flex: 1,
  },
});

const navStyle = css({
  display: 'flex',
  flexDirection: 'column',
});

const navItemStyle = css({
  padding: '4px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  textStyle: 'glyph18.regular',
  color: 'white.white_50',
  '&.selected': {
    color: 'brand.canary',
  },
  _mobile: {
    gap: 0,
    textStyle: 'glyph15.regular',
    p: 0,
  },
});

const dividerStyle = css({
  background: 'white.white_25',
  height: '1px',
  margin: 0,
  border: 'none',
  marginTop: '48px',
  marginBottom: '20px',
  _mobile: {
    display: 'none',
  },
});

const profileImageStyle = css({
  width: '160px',
  height: '160px',
  borderRadius: '50%',
  backgroundColor: '#fff',
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
  },
  _mobile: {
    width: '48px',
    height: '48px',
  },
});

const profileNameStyle = css({
  color: 'white.white',
  textStyle: 'glyph48.bold',
  marginTop: '8px',
  marginBottom: '4px',
  _mobile: {
    textStyle: 'glyph24.bold',
    margin: 0,
    mb: '2px',
  },
});

const pointStyle = flex({
  color: 'white.white',
  textStyle: 'glyph24.regular',
  gap: '6px',
  alignItems: 'center',
  _mobile: {
    textStyle: 'glyph14.regular',
    '& img': {
      width: '16px',
      height: '16px',
    },
  },
});
