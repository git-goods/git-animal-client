'use client';

import { css } from '_panda/css';
import { rankQueries } from '@gitanimals/react-query';
import { useQuery } from '@tanstack/react-query';

import GameConsole from './GameConsole/GameConsole';
import { TopPodium } from './TopPodium';

export default function RankingSection() {
  const { data: ranks } = useQuery({
    ...rankQueries.getRanksOptions({
      rank: 1,
      size: 10,
      type: 'WEEKLY_USER_CONTRIBUTIONS',
    }),
  });

  if (!ranks) return null;

  return (
    <div className={containerStyle}>
      <GameConsole>
        <div className={screenContentStyle}>
          {/* 상단 탭 */}
          <div className={tabsStyle}>
            <button className={tabStyle}>People</button>
            <button className={tabStyle}>Guild</button>
          </div>

          {/* 상위 3위 포디움 */}
          <TopPodium ranks={ranks.slice(0, 3)} />

          </div>
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
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#4ADE80',
  fontFamily: 'monospace',
  fontSize: '36px',
  '@media (min-width: 640px)': {
    fontSize: '48px',
  },
});
