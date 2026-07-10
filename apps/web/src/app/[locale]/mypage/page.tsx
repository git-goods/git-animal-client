import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { cn } from '@gitanimals/ui-tailwind';

import { Link } from '@/i18n/routing';

import { FarmType } from './(github-custom)/FarmType';
import { LineType } from './(github-custom)/LineType';

type TabType = 'line-type' | 'farm-type';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('page');

  return {
    title: t('mypage'),
  };
}

async function Mypage({
  searchParams,
}: {
  searchParams: {
    type?: TabType;
  };
}) {
  const selectedType = searchParams?.type ?? 'farm-type';

  const MYPAGE_TAB_INNER_MAP: Record<TabType, ReactNode> = {
    'line-type': <LineType />,
    'farm-type': <FarmType />,
  };

  return (
    <>
      <div className={tabListStyle}>
        <Link href="/mypage?type=farm-type">
          <button className={cn(tabItemStyle, selectedType === 'farm-type' && tabItemSelectedStyle)}>Farm Type</button>
        </Link>
        <Link href="/mypage?type=line-type">
          <button className={cn(tabItemStyle, selectedType === 'line-type' && tabItemSelectedStyle)}>1 Type</button>
        </Link>
      </div>
      {MYPAGE_TAB_INNER_MAP[selectedType]}
    </>
  );
}
export default Mypage;

const tabListStyle = 'flex gap-[12px] mobile:[&_a]:flex-1';

const tabItemStyle = cn(
  'glyph28-bold rounded-[12px] p-[12px] text-center border-[1.5px] border-solid h-[58px]',
  'text-white-25 bg-white-10 border-white-10',
  'hover:text-white-75 hover:bg-white-25 hover:border-white-50',
  'mobile:w-full mobile:rounded-[6px] mobile:border mobile:border-solid mobile:glyph16-bold mobile:h-[40px] mobile:px-[16px] mobile:py-[8px]',
);

const tabItemSelectedStyle = 'text-white-100 bg-white-25 border-white-50';
