'use client';

import { useSearchParams } from 'next/navigation';
import { css, cx } from '_panda/css';
import { rankQueries } from '@gitanimals/react-query';
import { useQuery } from '@tanstack/react-query';

import { MediaQuery } from '@/components/MediaQuery';
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

  return (
    <div className={containerStyle}>
      <h2 className={titleStyle}>Ranking</h2>
      <p className={descriptionStyle}>You can get up to 10000P depending on your ranking!</p>
      <MediaQuery
        desktop={
          <GameConsole>
            {ranks && (
              <div className={screenContentStyle}>
                <RankingTab selectedTab={selectedTab} />
                <TopPodium ranks={ranks.slice(0, 3)} />
                <RankingTable ranks={ranks.slice(3)} />
              </div>
            )}
          </GameConsole>
        }
        mobile={
          ranks && (
            <div className={screenContentStyle}>
              <RankingTab selectedTab={selectedTab} />
              <TopPodium ranks={ranks.slice(0, 3)} />
              <RankingTable ranks={ranks.slice(3)} />
            </div>
          )
        }
      />
    </div>
  );
}

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
  _mobile: {
    textStyle: 'glyph16.regular',
  },
});
const containerStyle = css({
  width: '100%',
  backgroundColor: '#111827',
  padding: '130px',
  overflow: 'hidden',
  _mobile: {
    padding: '80px 16px',
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
