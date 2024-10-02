import type { ReactNode } from 'react';
import { cx } from '_panda/css';
import { flex } from '_panda/patterns';
import { updateUrlSearchParams } from '@gitanimals/util-common';

import { Link } from '@/i18n/routing';

import FarmType from './FarmType';
import { OneType } from './OneType';

type TabType = '1-type' | 'farm-type';

async function Mypage({
  searchParams,
}: {
  searchParams: {
    type?: TabType;
  };
}) {
  const selectedType = searchParams?.type ?? '1-type';

  const MYPAGE_TAB_INNER_MAP: Record<TabType, ReactNode> = {
    '1-type': <OneType />,
    'farm-type': <FarmType />,
  };

  return (
    <div>
      <div className={tabListStyle}>
        <Link href={`/mypage?${updateUrlSearchParams(searchParams, 'type', '1-type')}`}>
          <button className={cx('tab-item', selectedType === '1-type' && 'selected')}>1 Type</button>
        </Link>
        <Link href={`/mypage?${updateUrlSearchParams(searchParams, 'type', 'farm-type')}`}>
          <button className={cx('tab-item', selectedType === 'farm-type' && 'selected')}>Farm Type</button>
        </Link>
      </div>
      <div>{MYPAGE_TAB_INNER_MAP[selectedType]}</div>
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
