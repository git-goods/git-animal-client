'use client';

import { useSearchParams } from 'next/navigation';
import { css, cx } from '_panda/css';
import { rankQueries } from '@gitanimals/react-query';
import { useQuery } from '@tanstack/react-query';

import { Link } from '@/i18n/routing';

import GameConsole from './GameConsole/GameConsole';
import { RankingTable } from './RankingTable';
import { TopPodium } from './TopPodium';

export default function RankingSection() {
  const searchParams = useSearchParams();
  const selectedTab = searchParams.get('ranking') ?? 'people';

  const { data: ranks } = useQuery({
    ...rankQueries.getRanksOptions({
      rank: 1,
      size: 8,
      type: selectedTab === 'people' ? 'WEEKLY_USER_CONTRIBUTIONS' : 'WEEKLY_GUILD_CONTRIBUTIONS',
    }),
  });
  console.log('ranks: ', ranks);

  if (!ranks) return null;

  return (
    <div className={containerStyle}>
      <GameConsole>
        <div className={screenContentStyle}>
          <RankingTab selectedTab={selectedTab} />
          <TopPodium ranks={ranks.slice(0, 3)} />
          <RankingTable ranks={ranks.slice(3)} />
        </div>
      </GameConsole>
    </div>
  );
}

const containerStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  backgroundColor: '#111827',
  padding: '130px',
  overflow: 'hidden',
});

const screenContentStyle = css({
  padding: '60px 130px 0',
  color: '#4ADE80',
  fontFamily: 'token(fonts.dnf)',
});

function RankingTab({ selectedTab }: { selectedTab: string }) {
  return (
    <div className={tabsStyle}>
      <Link
        href="/?ranking=people"
        shallow
        scroll={false}
        className={cx(tabStyle, selectedTab === 'people' && selectedTabStyle)}
      >
        People
      </Link>
      <Link
        href="/?ranking=guild"
        shallow
        scroll={false}
        className={cx(tabStyle, selectedTab === 'guild' && selectedTabStyle)}
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
});

const tabStyle = css({
  textStyle: 'glyph18.bold',
  color: 'white.white_50',
  p: '4px 10px',
});

const selectedTabStyle = css({
  color: 'white.white_100',
});
