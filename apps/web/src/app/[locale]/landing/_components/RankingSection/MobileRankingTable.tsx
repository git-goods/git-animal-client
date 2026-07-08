'use client';

import { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import type { RankType } from '@gitanimals/api';
import { rankQueries } from '@gitanimals/react-query';
import { cn, Skeleton } from '@gitanimals/ui-tailwind';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RankingLink } from './RankingLink';

const RANKS_PER_PAGE = 5;
const SWIPE_THRESHOLD = 50;

const containerStyle = 'w-full overflow-hidden';

const tableWrapperStyle = 'transition-opacity duration-150 ease-[ease]';

const fetchingStyle = 'opacity-50';

const paginationStyle = 'mt-[16px] flex items-center justify-center';

const paginationTextStyle = 'glyph14-regular text-white-50';

const arrowButtonStyle =
  'w-[32px] h-[32px] flex items-center justify-center border-none bg-none text-white-75 text-[20px] cursor-pointer disabled:opacity-25 disabled:cursor-default';

const tableStyle = 'w-full border-separate text-left [border-spacing:0_4px]';

const trBaseStyle = cn(
  'rounded-[6px]',
  '[&_img]:rounded-full [&_img]:overflow-hidden',
  '[&_td]:border-none [&_th]:border-none [&_td]:px-[8px] [&_th]:px-[8px]',
  '[&_td:first-child]:pl-[16px] [&_th:first-child]:pl-[16px] [&_td:first-child]:rounded-[6px_0_0_6px] [&_th:first-child]:rounded-[6px_0_0_6px] [&_td:first-child]:w-[54px] [&_th:first-child]:w-[54px]',
  '[&_td:last-child]:pr-[16px] [&_th:last-child]:pr-[16px] [&_td:last-child]:rounded-[0_6px_6px_0] [&_th:last-child]:rounded-[0_6px_6px_0] [&_td:last-child]:text-right [&_th:last-child]:text-right',
  '[&_td:nth-child(2)]:text-center [&_th:nth-child(2)]:text-center [&_td:nth-child(2)]:w-[28px] [&_th:nth-child(2)]:w-[28px] [&_td:nth-child(2)]:pl-0 [&_th:nth-child(2)]:pl-0',
);

const theadTrStyle = cn(trBaseStyle, 'glyph16-bold bg-white-50 text-white-100 h-[40px]');

const trStyle = cn(
  trBaseStyle,
  'glyph18-regular text-white-100 bg-white-10 h-[48px] glyph15-regular',
  '[&_td:first-child]:text-[16px] [&_td:first-child]:leading-[28px] [&_td:first-child]:font-dnf [&_td:first-child]:text-white-50',
);

const currentUserTrStyle =
  'bg-[linear-gradient(133deg,rgba(255,253,201,0.30)_2.19%,rgba(150,230,216,0.30)_49.24%,rgba(125,171,241,0.30)_98.21%)]';

interface MobileRankingTableProps {
  initialRanks: RankType[];
  initialPage: number;
  totalPage: number;
  type: 'WEEKLY_USER_CONTRIBUTIONS' | 'WEEKLY_GUILD_CONTRIBUTIONS';
}

export function MobileRankingTable({ initialRanks, initialPage, totalPage, type }: MobileRankingTableProps) {
  const { data: session } = useSession();
  const currentUsername = session?.user?.name;
  const [page, setPage] = useState(initialPage);
  const touchStartX = useRef(0);

  const goToPage = (next: number) => {
    setPage(next);
  };

  const rankStart = page * RANKS_PER_PAGE + 4;

  const { data: ranks, isPlaceholderData } = useQuery({
    ...rankQueries.getRanksOptions({ rank: rankStart, size: RANKS_PER_PAGE, type }),
    initialData: page === initialPage ? initialRanks : undefined,
    placeholderData: keepPreviousData,
  });

  // Prefetch adjacent pages
  useQuery({
    ...rankQueries.getRanksOptions({ rank: (page - 1) * RANKS_PER_PAGE + 4, size: RANKS_PER_PAGE, type }),
    enabled: page > 0,
  });
  useQuery({
    ...rankQueries.getRanksOptions({ rank: (page + 1) * RANKS_PER_PAGE + 4, size: RANKS_PER_PAGE, type }),
    enabled: page < totalPage,
  });

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
      <div className={cn(tableWrapperStyle, isPlaceholderData && fetchingStyle)}>
        <RankingTableView ranks={ranks} currentUsername={currentUsername} />
      </div>
      <div className={paginationStyle}>
        <button
          className={arrowButtonStyle}
          onClick={() => goToPage(page - 1)}
          disabled={page <= 0}
          aria-label="이전 페이지"
        >
          ‹
        </button>
        <span className={paginationTextStyle}>
          {page + 1} / {totalPage + 1}
        </span>
        <button
          className={arrowButtonStyle}
          onClick={() => goToPage(page + 1)}
          disabled={page >= totalPage}
          aria-label="다음 페이지"
        >
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
              <tr key={item.rank} className={cn(trStyle, item.name === currentUsername && currentUserTrStyle)}>
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
