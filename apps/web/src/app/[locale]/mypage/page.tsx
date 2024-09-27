import type { ReactNode } from 'react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { css, cx } from '_panda/css';
import { center, flex, grid } from '_panda/patterns';
import { updateUrlSearchParams } from '@gitanimals/util-common';

import GNB from '@/components/GNB/GNB';
import { Link } from '@/i18n/routing';

import FarmType from './FarmType';
import { OneType } from './OneType';
import { ProfileSection } from './ProfileSection';

type TabType = '1-type' | 'farm-type';

async function Mypage({
  searchParams,
}: {
  searchParams: {
    type?: TabType;
  };
}) {
  const t = await getTranslations('Mypage');
  const selectedType = searchParams?.type ?? '1-type';

  const MYPAGE_TAB_INNER_MAP: Record<TabType, ReactNode> = {
    '1-type': <OneType />,
    'farm-type': <FarmType />,
  };

  return (
    <>
      <div className={cx(containerStyle, subStyle)}>
        <GNB />
        <Image src="/mypage/bg-cloud.webp" alt="bg" width={2400} height={1367} className={bgStyle} draggable={false} />
        <main className={mainStyle}>
          <ProfileSection />
          <section className={rightSectionStyle}>
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
      <div className={noticeStyle}>{t('no-mobile-support')}</div>
    </>
  );
}

export default Mypage;
const subStyle = css({
  '@media (max-width: 1100px)': {
    display: 'none',
  },
});

const noticeStyle = center({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: '#454545',
  color: 'white',
  zIndex: 1000,
  display: 'none',
  textStyle: 'glyph24.bold',
  lineHeight: '1.5',
  textAlign: 'center',
  '@media (max-width: 1100px)': {
    display: 'flex',
  },
});

const rightSectionStyle = css({
  width: '100%',
  maxW: 'min(1080px, calc(100vw - 400px - 222px - 80px ))',
  borderRadius: 16,
  background: 'white.white_10',
  backdropFilter: 'blur(7px)',
  minH: '700px',
  p: 40,
});

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
