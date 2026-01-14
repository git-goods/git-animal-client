'use client';

import { useSearchParams } from 'next/navigation';
import { rankQueries } from '@gitanimals/react-query';
import { cn } from '@gitanimals/ui-tailwind';
import { useQueries } from '@tanstack/react-query';

import { MediaQuery } from '@/components/MediaQuery';
import { Link } from '@/i18n/routing';

import GameConsole from './GameConsole/GameConsole';
import { MobileGameConsole } from './MobileGameConsole/MobileGameConsole';
import { MobileRankingTable } from './MobileRankingTable';
import { RankingTable } from './RankingTable';
import { TopPodium } from './TopPodium';

export default function RankingSection({
  type,
  startRankNumber,
  currentPage,
}: {
  type: 'WEEKLY_USER_CONTRIBUTIONS' | 'WEEKLY_GUILD_CONTRIBUTIONS';
  startRankNumber: number;
  currentPage: number;
}) {
  const searchParams = useSearchParams();
  const selectedTab = searchParams.get('ranking') ?? 'people';

  const queries = useQueries({
    queries: [
      rankQueries.getRanksOptions({ rank: 1, size: 3, type }),
      rankQueries.getRanksOptions({ rank: startRankNumber, size: 5, type }),
      rankQueries.getTotalRankOptions({ type }),
    ],
  });

  const totalPage = calcTotalPage(queries[2].data?.count ?? 0);

  if (queries[0].isLoading || queries[1].isLoading || !queries[0].data || !queries[1].data) {
    return <div></div>;
  }

  return (
    <div
      className={cn(
        'w-full bg-[#111827] p-[130px] overflow-hidden',
        'max-mobile:p-[80px_16px_0] max-mobile:w-full max-mobile:bg-[linear-gradient(180deg,#000_0%,#001420_16.5%,#002943_36.5%,#008FE8_100%)]',
      )}
    >
      <h2
        className={cn(
          'font-product text-glyph-82 font-bold text-white-100 text-center mb-4',
          'max-mobile:mb-2 max-mobile:text-glyph-40 max-mobile:font-bold',
        )}
      >
        Ranking
      </h2>
      <p
        className={cn(
          'font-product text-glyph-18 text-white-90 text-center mb-[120px]',
          'max-mobile:mb-0 max-mobile:text-glyph-16',
        )}
      >
        You can get up to 10000P depending on your ranking!
      </p>
      <MediaQuery
        desktop={
          <GameConsole>
            <div className={cn('p-[60px_130px] text-[#4ADE80] h-full font-dnf flex flex-col', 'max-mobile:p-[40px_0_0] max-mobile:w-full')}>
              <RankingTab selectedTab={selectedTab} />
              <TopPodium ranks={queries[0].data} />
              <RankingTable ranks={queries[1].data} page={currentPage} totalPage={totalPage} />
            </div>
          </GameConsole>
        }
        mobile={
          <div className={cn('p-[60px_130px] text-[#4ADE80] h-full font-dnf flex flex-col', 'max-mobile:p-[40px_0_0] max-mobile:w-full')}>
            <RankingTab selectedTab={selectedTab} />
            <TopPodium ranks={queries[0].data} />
            <MobileRankingTable ranks={queries[1].data} page={currentPage} totalPage={totalPage} />
            <MobileGameConsole />
          </div>
        }
      />
    </div>
  );
}

const calcTotalPage = (totalCount: number) => {
  if (totalCount <= 3) return 0;
  return Math.ceil((totalCount - 3) / 5) - 1;
};

// TODO: tab 공통화 필요
function RankingTab({ selectedTab }: { selectedTab: string }) {
  return (
    <div
      className={cn(
        'flex justify-center mb-[60px]',
        'max-mobile:bg-black-25 max-mobile:w-fit max-mobile:m-[0_auto_60px] max-mobile:rounded-[20px] max-mobile:p-1',
      )}
    >
      <Link
        href="/?ranking=people"
        // href="/test/ranking/?ranking=people"
        shallow
        scroll={false}
        className={cn(
          'font-product text-glyph-18 font-bold p-[4px_10px]',
          'max-mobile:px-3 max-mobile:inline-flex max-mobile:text-glyph-16 max-mobile:font-bold max-mobile:h-8 max-mobile:rounded-[32px] max-mobile:leading-8',
          selectedTab === 'people' ? 'text-white-100 max-mobile:text-white-75 max-mobile:bg-white-10' : 'text-white-50 max-mobile:text-white-25',
        )}
      >
        People
      </Link>
      <Link
        href="/?ranking=guild"
        // href="/test/ranking/?ranking=guild"
        shallow
        scroll={false}
        className={cn(
          'font-product text-glyph-18 font-bold p-[4px_10px]',
          'max-mobile:px-3 max-mobile:inline-flex max-mobile:text-glyph-16 max-mobile:font-bold max-mobile:h-8 max-mobile:rounded-[32px] max-mobile:leading-8',
          selectedTab === 'guild' ? 'text-white-100 max-mobile:text-white-75 max-mobile:bg-white-10' : 'text-white-50 max-mobile:text-white-25',
        )}
      >
        Guild
      </Link>
    </div>
  );
}
