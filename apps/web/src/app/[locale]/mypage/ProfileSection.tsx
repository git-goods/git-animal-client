'use client';

import { memo } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { css, cx } from '_panda/css';
import { flex } from '_panda/patterns';
import { Skeleton } from '@gitanimals/ui-panda';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';

import { useUserQueryOptions } from '@/apis/user/useGetUser';
import { Link, usePathname } from '@/i18n/routing';
import { addNumberComma } from '@/utils/number';

export const ProfileSection = memo(
  wrap
    .Suspense({
      fallback: (
        <section>
          <Skeleton width={160} height={160} borderRadius="50%" />
        </section>
      ),
    })
    .ErrorBoundary({ fallback: <section></section> })
    .on(function ProfileSection() {
      const t = useTranslations('Mypage');
      const pathname = usePathname();

      const { data } = useSuspenseQuery(useUserQueryOptions);

      return (
        <section>
          <div className={profileImageStyle}>
            <Image src={data.profileImage ?? ''} alt="profile" width={160} height={160} />
          </div>
          <p className={profileNameStyle}>{data?.username}</p>
          <div className={pointStyle}>
            <Image src="/mypage/coin.svg" alt="coin" width={24} height={24} /> {addNumberComma(data.points ?? 0)}
          </div>
          <hr className={dividerStyle} />
          <div className={navStyle}>
            <Link href="/mypage" className={cx(navItemStyle, pathname === '/mypage' && 'selected')}>
              <ChevronRight size={20} color={pathname === '/mypage' ? '#FCFD9C' : '#FFFFFF80'} />
              <span>{t('github-custom')}</span>
            </Link>
            <Link href="/mypage/my-pet" className={cx(navItemStyle, pathname === '/mypage/my-pet' && 'selected')}>
              <ChevronRight size={20} color={pathname === '/mypage/my-pet' ? '#FCFD9C' : '#FFFFFF80'} />
              <span>{t('my-pet')}</span>
            </Link>
          </div>
        </section>
      );
    }),
);

const navStyle = css({
  textStyle: 'glyph18.regular',
  color: 'white.white_50',
  display: 'flex',
  flexDirection: 'column',
});

const navItemStyle = css({
  padding: 4,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  '&.selected': {
    color: 'brand.canary',
  },
});

const dividerStyle = css({
  background: 'white.white_25',
  height: 1,
  margin: 0,
  border: 'none',
  marginTop: 48,
  marginBottom: 20,
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
});

const profileNameStyle = css({
  color: 'white.white',
  textStyle: 'glyph48.bold',
  marginTop: '8px',
  marginBottom: '4px',
});

const pointStyle = flex({
  color: 'white.white',
  textStyle: 'glyph24.regular',
  gap: '6',
});
