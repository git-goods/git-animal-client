'use client';

import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { css, cx } from '_panda/css';
import type { RankType } from '@gitanimals/api';
import { rankQueries } from '@gitanimals/react-query';
import { Skeleton } from '@gitanimals/ui-panda';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';

import { getRankStart, RANKS_PER_PAGE } from './constants';
import { RankingLink } from './RankingLink';

const SWIPE_THRESHOLD = 50;

interface MobileRankingTableProps {
  initialRanks: RankType[];
  initialPage: number;
  totalPage: number;
  type: 'WEEKLY_USER_CONTRIBUTIONS' | 'WEEKLY_GUILD_CONTRIBUTIONS';
}

export function MobileRankingTable({ initialRanks, initialPage, totalPage, type }: MobileRankingTableProps) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const currentUsername = session?.user?.name;
  const [page, setPage] = useState(initialPage);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const touchStartX = useRef(0);

  const goToPage = (next: number) => {
    const clamped = Math.max(0, Math.min(next, totalPage));
    if (clamped === page) return;
    setSlideDirection(clamped > page ? 'left' : 'right');
    setPage(clamped);
  };

  const rankStart = getRankStart(page);

  const { data: ranks, isPlaceholderData } = useQuery({
    ...rankQueries.getRanksOptions({ rank: rankStart, size: RANKS_PER_PAGE, type }),
    initialData: page === initialPage ? initialRanks : undefined,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (page > 0) {
      queryClient.prefetchQuery(rankQueries.getRanksOptions({ rank: getRankStart(page - 1), size: RANKS_PER_PAGE, type }));
    }
    if (page < totalPage) {
      queryClient.prefetchQuery(rankQueries.getRanksOptions({ rank: getRankStart(page + 1), size: RANKS_PER_PAGE, type }));
    }
  }, [page, totalPage, type, queryClient]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) < SWIPE_THRESHOLD) return;

    if (diff > 0 && page < totalPage) {
      goToPage(page + 1);
    } else if (diff < 0 && page > 0) {
      goToPage(page - 1);
    }
  };

  return (
    <div className={containerStyle} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div
        key={page}
        className={cx(tableWrapperStyle, isPlaceholderData && fetchingStyle, slideDirection === 'left' && slideInFromRight, slideDirection === 'right' && slideInFromLeft)}
      >
        <RankingTableView ranks={ranks} currentUsername={currentUsername} />
      </div>
      <div className={paginationStyle}>
        <button className={arrowButtonStyle} onClick={() => goToPage(page - 1)} disabled={page <= 0} aria-label="이전 페이지">
          ‹
        </button>
        <span className={paginationTextStyle}>
          {page + 1} / {totalPage + 1}
        </span>
        <button className={arrowButtonStyle} onClick={() => goToPage(page + 1)} disabled={page >= totalPage} aria-label="다음 페이지">
          ›
        </button>
      </div>
    </div>
  );
}

function RankingTableView({
  ranks,
  currentUsername,
}: {
  ranks: RankType[] | undefined;
  currentUsername: string | null | undefined;
}) {
  return (
    <table className={tableStyle}>
      <thead>
        <tr className={theadTrStyle}>
          <th>Rank</th>
          <th>Pet</th>
          <th>Name</th>
          <th>Contribution</th>
        </tr>
      </thead>
      <tbody>
        {ranks
          ? ranks.map((item) => (
              <tr key={item.rank} className={cx(trStyle, item.name === currentUsername && currentUserTrStyle)}>
                <td>{item.rank}</td>
                <td>
                  <RankingLink id={item.name}>
                    <img src={item.image} alt={item.name} width={60} height={60} />
                  </RankingLink>
                </td>
                <td>
                  <RankingLink id={item.name}>{item.name}</RankingLink>
                </td>
                <td>{item.contributions}</td>
              </tr>
            ))
          : Array.from({ length: RANKS_PER_PAGE }).map((_, i) => (
              <tr key={i} className={trStyle}>
                <td>
                  <Skeleton style={{ width: 20, height: 20, borderRadius: 4 }} />
                </td>
                <td>
                  <Skeleton style={{ width: 40, height: 40, borderRadius: '50%' }} />
                </td>
                <td>
                  <Skeleton style={{ width: 80, height: 16, borderRadius: 4 }} />
                </td>
                <td>
                  <Skeleton style={{ width: 40, height: 16, borderRadius: 4 }} />
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
}

const containerStyle = css({ width: '100%', overflow: 'hidden' });

const tableWrapperStyle = css({
  transition: 'opacity 0.15s ease',
});

const fetchingStyle = css({
  opacity: 0.5,
});

const slideInFromRight = css({
  animation: 'slideFromRight 0.2s ease-out',
});

const slideInFromLeft = css({
  animation: 'slideFromLeft 0.2s ease-out',
});

const paginationStyle = css({
  marginTop: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const paginationTextStyle = css({
  textStyle: 'glyph14.regular',
  color: 'white.white_50',
});

const arrowButtonStyle = css({
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  background: 'none',
  color: 'white.white_75',
  fontSize: '20px',
  cursor: 'pointer',
  _disabled: {
    opacity: 0.25,
    cursor: 'default',
  },
});

const tableStyle = css({
  width: '100%',
  borderCollapse: 'separate',
  textAlign: 'left',
  borderSpacing: '0 4px',
});

const trBaseStyle = css({
  borderRadius: '6px',

  '& img': {
    borderRadius: '50%',
    overflow: 'hidden',
  },

  '& td, & th': {
    border: 'none',
    padding: '0 8px',
  },

  '& td:first-child, & th:first-child': {
    paddingLeft: '16px',
    borderRadius: '6px 0 0 6px',
    width: '54px',
  },
  '& td:last-child, & th:last-child': {
    paddingRight: '16px',
    borderRadius: '0 6px 6px 0',
    textAlign: 'right',
  },
  '& td:nth-child(2), & th:nth-child(2)': {
    textAlign: 'center',
    width: '28px',
    paddingLeft: '0px',
  },
});

const theadTrStyle = cx(
  trBaseStyle,
  css({
    textStyle: 'glyph16.bold',
    backgroundColor: 'white.white_50',
    color: 'white.white_100',
    height: '40px',
  }),
);

const trStyle = cx(
  trBaseStyle,
  css({
    textStyle: 'glyph18.regular',
    color: 'white.white_100',
    backgroundColor: 'white.white_10',
    height: '48px',
    fontSize: 'glyph15.regular',

    '& td:first-child': {
      fontSize: '16px',
      lineHeight: '28px',
      fontFamily: 'token(fonts.dnf)',
      color: 'white.white_50',
    },
  }),
);

const currentUserTrStyle = css({
  background:
    'linear-gradient(133deg, rgba(255, 253, 201, 0.30) 2.19%, rgba(150, 230, 216, 0.30) 49.24%, rgba(125, 171, 241, 0.30) 98.21%)',
});
