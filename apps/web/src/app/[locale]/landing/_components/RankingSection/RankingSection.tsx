'use client';

import { useSearchParams } from 'next/navigation';
import { rankQueries } from '@gitanimals/react-query';
import { cn } from '@gitanimals/ui-tailwind';
import { useQueries } from '@tanstack/react-query';

import { MediaQuery } from '@/components/MediaQuery';
import { Link } from '@/i18n/routing';

import GameConsole from './GameConsole/GameConsole';
import { MobileGameConsole } from './MobileGameConsole/MobileGameConsole';
import { calcTotalPage, RANKS_PER_PAGE, RANKS_TOP_3 } from './RankingSection.constants';
import { MobileRankingTable } from './MobileRankingTable';
import { RankingTable } from './RankingTable';
import { TopPodium } from './TopPodium';

const containerStyle =
  'w-full bg-[#111827] p-[130px] overflow-hidden mobile:p-[80px_16px_0] mobile:w-full mobile:bg-[linear-gradient(180deg,#000_0%,#001420_16.5%,#002943_36.5%,#008FE8_100%)]';

const titleStyle = 'glyph82-bold text-white-100 text-center mb-[16px] mobile:mb-[8px] mobile:glyph40-bold';

const descriptionStyle = 'glyph18-regular text-white-90 text-center mb-[120px] mobile:mb-0 mobile:glyph16-regular';

const screenContentStyle =
  'p-[60px_130px] text-[#4ADE80] h-full font-dnf flex flex-col mobile:p-[40px_0_0] mobile:w-full';

const tabsStyle =
  'flex justify-center mb-[60px] mobile:bg-black-25 mobile:w-fit mobile:m-[0_auto_60px] mobile:rounded-[20px] mobile:p-[4px]';

const tabStyle =
  'glyph18-bold p-[4px_10px] mobile:px-[12px] mobile:inline-flex mobile:glyph16-bold mobile:h-[32px] mobile:rounded-[32px] mobile:leading-[32px]';

const nonSelectedTabStyle = 'text-white-50 mobile:text-white-25';

const selectedTabStyle = 'text-white-100 mobile:text-white-75 mobile:bg-white-10';

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
      rankQueries.getRanksOptions({ rank: 1, size: RANKS_TOP_3, type }),
      rankQueries.getRanksOptions({ rank: startRankNumber, size: RANKS_PER_PAGE, type }),
      rankQueries.getTotalRankOptions({ type }),
    ],
  });

  const totalPage = calcTotalPage(queries[2].data?.count ?? 0);

  if (queries[0].isLoading || queries[1].isLoading || !queries[0].data || !queries[1].data) {
    return <div></div>;
  }

  return (
    <div className={containerStyle}>
      <h2 className={titleStyle}>Ranking</h2>
      <p className={descriptionStyle}>You can get up to 10000P depending on your ranking!</p>
      <MediaQuery
        desktop={
          <GameConsole>
            <div className={screenContentStyle}>
              <RankingTab selectedTab={selectedTab} />
              <TopPodium ranks={queries[0].data} />
              <RankingTable ranks={queries[1].data} page={currentPage} totalPage={totalPage} />
            </div>
          </GameConsole>
        }
        mobile={
          <div className={screenContentStyle}>
            <RankingTab selectedTab={selectedTab} />
            <TopPodium ranks={queries[0].data} />
            <MobileRankingTable
              initialRanks={queries[1].data}
              initialPage={currentPage}
              totalPage={totalPage}
              type={type}
            />
            <MobileGameConsole />
          </div>
        }
      />
    </div>
  );
}

// TODO: tab 공통화 필요
function RankingTab({ selectedTab }: { selectedTab: string }) {
  return (
    <div className={tabsStyle}>
      <Link
        href="/?ranking=people"
        // href="/test/ranking/?ranking=people"
        shallow
        scroll={false}
        className={cn(tabStyle, selectedTab === 'people' ? selectedTabStyle : nonSelectedTabStyle)}
      >
        People
      </Link>
      <Link
        href="/?ranking=guild"
        // href="/test/ranking/?ranking=guild"
        shallow
        scroll={false}
        className={cn(tabStyle, selectedTab === 'guild' ? selectedTabStyle : nonSelectedTabStyle)}
      >
        Guild
      </Link>
    </div>
  );
}
