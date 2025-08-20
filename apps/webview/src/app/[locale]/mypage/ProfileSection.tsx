/* eslint-disable @next/next/no-img-element */
'use client';

import { memo } from 'react';
import Image from 'next/image';
import { css } from '_panda/css';
import { flex } from '_panda/patterns';
import { userQueries } from '@gitanimals/react-query';
import { Skeleton } from '@gitanimals/ui-panda';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { addNumberComma } from '@/utils/number';

const profileSkeletonStyle = css({
  '& > div': {
    margin: '32px 20px',
    width: '48px',
    height: '48px',
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
      const { data } = useSuspenseQuery(userQueries.userOptions());

      return (
        <section className={profileSectionStyle}>
          <div className={profileImageStyle}>
            <img src={data.profileImage ?? ''} alt="profile" width={160} height={160} />
          </div>
          <div className={profileTextStyle}>
            <p className={profileNameStyle}>{data?.username}</p>
            <div className={pointStyle}>
              <Image src="/assets/mypage/coin.svg" alt="coin" width={24} height={24} />{' '}
              {addNumberComma(data.points ?? 0)}
            </div>
          </div>
        </section>
      );
    }),
);

const profileSectionStyle = css({
  display: 'flex',
  padding: '32px 0',
  gap: '12px',
  alignItems: 'center',
});

const profileTextStyle = css({
  flex: 1,
});

const profileImageStyle = css({
  borderRadius: '50%',
  backgroundColor: '#fff',
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
  },
  width: '48px',
  height: '48px',
});

const profileNameStyle = css({
  color: 'white.white',
  textStyle: 'glyph24.bold',
  margin: 0,
  mb: '2px',
});

const pointStyle = flex({
  color: 'white.white',
  gap: '6px',
  alignItems: 'center',
  textStyle: 'glyph14.regular',
  '& img': {
    width: '16px',
    height: '16px',
  },
});
