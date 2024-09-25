'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { css } from '_panda/css';
import { flex } from '_panda/patterns';

import { useGetUser } from '@/apis/user/useGetUser';
import { addNumberComma } from '@/utils/number';

export function ProfileSection() {
  const { data } = useSession();
  const { data: userData } = useGetUser();

  return (
    <section>
      <div className={profileImageStyle}>
        <Image src={data?.user.image ?? ''} alt="profile" width={160} height={160} />
      </div>
      <p className={profileNameStyle}>{data?.user.name}</p>
      <div className={pointStyle}>
        <Image src="/mypage/coin.svg" alt="coin" width={24} height={24} /> {addNumberComma(userData?.points ?? 0)}
      </div>
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
