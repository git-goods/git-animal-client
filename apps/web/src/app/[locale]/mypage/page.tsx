import type { ReactNode } from 'react';
import Image from 'next/image';
import { css, cx } from '_panda/css';
import { flex, grid } from '_panda/patterns';
import { updateUrlSearchParams } from '@gitanimals/util-common';

import GNB from '@/components/GNB/GNB';
import { Link } from '@/i18n/routing';

import FarmType from './FarmType';
import { OneType } from './OneType';
import { ProfileSection } from './ProfileSection';

type TabType = '1-type' | 'farm-type';

function Mypage({
  searchParams,
}: {
  searchParams: {
    type?: TabType;
  };

  pathname: string;
}) {
  const selectedType = searchParams?.type ?? '1-type';

  const MYPAGE_TAB_INNER_MAP: Record<TabType, ReactNode> = {
    '1-type': <OneType />,
    'farm-type': <FarmType />,
  };

  return (
    <div className={containerStyle}>
      <GNB />
      <Image src="/mypage/bg-cloud.webp" alt="bg" width={2400} height={1367} className={bgStyle} draggable={false} />
      <main className={mainStyle}>
        <ProfileSection />
        <section className={css({ width: '100%', maxW: 'min(1080px, calc(100vw - 400px - 222px - 80px ))' })}>
          <div className={tabListStyle}>
            <Link href={`/mypage?${updateUrlSearchParams(searchParams, 'type', '1-type')}`}>
              <button className={cx('tab-item', selectedType === '1-type' && 'selected')}>1 Type</button>
            </Link>
            <Link href={`/mypage?${updateUrlSearchParams(searchParams, 'type', 'farm-type')}`}>
              <button className={cx('tab-item', selectedType === 'farm-type' && 'selected')}>Farm Type</button>
            </Link>
          </div>
          <div>{MYPAGE_TAB_INNER_MAP[selectedType]}</div>
        </section>
      </main>
    </div>
  );
}

export default Mypage;

const tabListStyle = flex({
  gap: 12,
  '& .tab-item': {
    textStyle: 'glyph28.bold',
    borderRadius: 12,
    padding: 12,
    textAlign: 'center',
    border: '1.5px solid',
    height: 58,
    color: 'white.white_25',
    backgroundColor: 'white.white_10',
    borderColor: 'white.white_10',
    '&.selected': {
      color: 'white.white_100',
      backgroundColor: 'white.white_25',
      borderColor: 'white.white_50',
    },
    _hover: {
      color: 'white.white_75',
      backgroundColor: 'white.white_25',
      borderColor: 'white.white_50',
    },
  },
});

const containerStyle = css({
  minHeight: '100vh',
  height: 'fit-content',
  backgroundColor: '#019C5A',
});

const bgStyle = css({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: 'calc(100% - 86px)',
  zIndex: 0,
  objectFit: 'cover',
  marginTop: '86px',
  pointerEvents: 'none',
});

const mainStyle = grid({
  gap: 80,
  gridTemplateColumns: '222px 1fr',
  position: 'relative',
  zIndex: 1,
  margin: '120px 200px 0',
});
