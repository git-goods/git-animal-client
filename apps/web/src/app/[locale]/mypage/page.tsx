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
      <div
        className={cn(
          'flex gap-3',
          'max-mobile:[&_a]:flex-1',
          '[&_.tab-item]:font-product [&_.tab-item]:text-glyph-28 [&_.tab-item]:font-bold',
          '[&_.tab-item]:rounded-xl [&_.tab-item]:p-3 [&_.tab-item]:text-center',
          '[&_.tab-item]:border-[1.5px] [&_.tab-item]:border-solid [&_.tab-item]:h-[58px]',
          '[&_.tab-item]:text-white/25 [&_.tab-item]:bg-white/10 [&_.tab-item]:border-white/10',
          '[&_.tab-item.selected]:text-white [&_.tab-item.selected]:bg-white/25 [&_.tab-item.selected]:border-white/50',
          '[&_.tab-item:hover]:text-white/75 [&_.tab-item:hover]:bg-white/25 [&_.tab-item:hover]:border-white/50',
          'max-mobile:[&_.tab-item]:w-full max-mobile:[&_.tab-item]:rounded-md max-mobile:[&_.tab-item]:border',
          'max-mobile:[&_.tab-item]:text-glyph-16 max-mobile:[&_.tab-item]:font-bold',
          'max-mobile:[&_.tab-item]:h-10 max-mobile:[&_.tab-item]:px-4 max-mobile:[&_.tab-item]:py-2'
        )}
      >
        <Link href="/mypage?type=farm-type">
          <button className={cn('tab-item', selectedType === 'farm-type' && 'selected')}>Farm Type</button>
        </Link>
        <Link href="/mypage?type=line-type">
          <button className={cn('tab-item', selectedType === 'line-type' && 'selected')}>1 Type</button>
        </Link>
      </div>
      {MYPAGE_TAB_INNER_MAP[selectedType]}
    </>
  );
}
export default Mypage;
