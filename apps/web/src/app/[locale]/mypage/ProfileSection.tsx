'use client';

/* eslint-disable @next/next/no-img-element */
import { Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { css } from '_panda/css';

import { prevTextTokenBlack3 } from '@/styles/prevTextToken';

import PointInfo from './PointInfo';

export default function ProfileSection() {
  const { data } = useSession();

  return (
    <section>
      <div className={profileImageStyle}>
        <img src={data?.user.image} alt="profile" width={160} height={160} />
      </div>
      <p className={profileNameStyle}>{data?.user.name}</p>
      <Suspense>
        <PointInfo />
      </Suspense>
    </section>
  );
}

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
  color: '#fff',

  fontSize: '40px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '140%' /* 56px */,
  marginTop: '40px',
  marginBottom: '30px',

  whiteSpace: 'nowrap',
  ...prevTextTokenBlack3,
});
