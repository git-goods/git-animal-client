import type { ReactNode } from 'react';
import { css, cx } from '_panda/css';
import { flex } from '_panda/patterns';
import { updateUrlSearchParams } from '@gitanimals/util-common';

import { Link } from '@/i18n/routing';

import { FarmType } from './FarmType';
import { LineType } from './LineType';

type TabType = 'line-type' | 'farm-type';

async function Mypage({
  searchParams,
}: {
  searchParams: {
    type?: TabType;
  };
}) {
  const selectedType = searchParams?.type ?? 'line-type';

  const MYPAGE_TAB_INNER_MAP: Record<TabType, ReactNode> = {
    'line-type': <LineType />,
    'farm-type': <FarmType />,
  };

  return (
    <>
      <div className={tabListStyle}>
        <Link href={`/mypage?${updateUrlSearchParams(searchParams, 'type', 'line-type')}`}>
          <button className={cx('tab-item', selectedType === 'line-type' && 'selected')}>1 Type</button>
        </Link>
        <Link href={`/mypage?${updateUrlSearchParams(searchParams, 'type', 'farm-type')}`}>
          <button className={cx('tab-item', selectedType === 'farm-type' && 'selected')}>Farm Type</button>
        </Link>
      </div>
      <div className={tabItemStyle}>{MYPAGE_TAB_INNER_MAP[selectedType]}</div>
    </>
  );
}
export default Mypage;

const tabItemStyle = css({
  flex: 1,
  overflow: 'hidden',
});

const tabListStyle = flex({
  gap: '12px',
  _mobile: {
    '& a': {
      flex: 1,
    },
  },
  '& .tab-item': {
    textStyle: 'glyph28.bold',
    borderRadius: '12px',
    padding: '12px',
    textAlign: 'center',
    border: '1.5px solid',
    height: '58px',
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
    _mobile: {
      width: '100%',
      borderRadius: '6px',
      border: '1px solid',
      textStyle: 'glyph16.bold',
      h: '40px',
      p: '8px 16px',
    },
  },
});
