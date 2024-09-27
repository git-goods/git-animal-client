'use client';

import { memo } from 'react';
import Image from 'next/image';
import { css } from '_panda/css';
import { flex } from '_panda/patterns';
import { Skeleton } from '@gitanimals/ui-panda';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { useUserQueryOptions } from '@/apis/user/useGetUser';
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
        </section>
      );
    }),
);

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
