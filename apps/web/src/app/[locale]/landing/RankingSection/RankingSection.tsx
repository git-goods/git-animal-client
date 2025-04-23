'use client';

import { useSearchParams } from 'next/navigation';
import { css, cx } from '_panda/css';
import { rankQueries } from '@gitanimals/react-query';
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

const titleStyle = css({
  textStyle: 'glyph82.bold',
  color: 'white.white_100',
  textAlign: 'center',
  mb: '16px',
  _mobile: {
    mb: '8px',
    textStyle: 'glyph40.bold',
  },
});

const descriptionStyle = css({
  textStyle: 'glyph18.regular',
  color: 'white.white_90',
  textAlign: 'center',
  mb: '120px',
  _mobile: {
    mb: '0',
    textStyle: 'glyph16.regular',
  },
});
const containerStyle = css({
  width: '100%',
  backgroundColor: '#111827',
  padding: '130px',
  overflow: 'hidden',
  _mobile: {
    padding: '80px 16px 0',
    width: '100%',
    background: 'linear-gradient(180deg, #000 0%, #001420 16.5%, #002943 36.5%, #008FE8 100%)',
  },
});

const screenContentStyle = css({
  padding: '60px 130px',
  color: '#4ADE80',
  height: '100%',
  fontFamily: 'token(fonts.dnf)',
  display: 'flex',
  flexDirection: 'column',
  _mobile: {
    padding: '40px 0 0',
    width: '100%',
  },
});

// TODO: tab 공통화 필요
function RankingTab({ selectedTab }: { selectedTab: string }) {
  return (
    <div className={tabsStyle}>
      <Link
        // href="/?ranking=people"
        href="/test/ranking/?ranking=people"
        shallow
        scroll={false}
        className={cx(tabStyle, selectedTab === 'people' ? selectedTabStyle : nonSelectedTabStyle)}
      >
        People
      </Link>
      <Link
        // href="/?ranking=guild"
        href="/test/ranking/?ranking=guild"
        shallow
        scroll={false}
        className={cx(tabStyle, selectedTab === 'guild' ? selectedTabStyle : nonSelectedTabStyle)}
      >
        Guild
      </Link>
    </div>
  );
}

const tabsStyle = css({
  display: 'flex',
  justifyContent: 'center',
  mb: '60px',

  _mobile: {
    backgroundColor: 'black.black_25',
    width: 'fit-content',
    margin: '0 auto 60px',
    borderRadius: '20px',
    p: '4px',
  },
});

const tabStyle = css({
  textStyle: 'glyph18.bold',
  p: '4px 10px',

  _mobile: {
    padding: '0 12px',
    display: 'inline-flex',
    textStyle: 'glyph16.bold',
    height: '32px',
    borderRadius: '32px',
    lineHeight: '32px',
  },
});

const nonSelectedTabStyle = css({
  color: 'white.white_50',
  _mobile: { color: 'white.white_25' },
});

const selectedTabStyle = css({
  color: 'white.white_100',
  _mobile: { color: 'white.white_75', backgroundColor: 'white.white_10' },
});
