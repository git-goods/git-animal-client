'use client';

import { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import type { RankType } from '@gitanimals/api';
import { rankQueries } from '@gitanimals/react-query';
import { cn } from '@gitanimals/ui-tailwind/utils';
import { Skeleton } from '@gitanimals/ui-tailwind';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { RankingLink } from './RankingLink';

const RANKS_PER_PAGE = 5;
const SWIPE_THRESHOLD = 50;

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
    <div className="w-full overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className={cn('transition-opacity duration-150 ease-in-out', isPlaceholderData && 'opacity-50')}>
        <RankingTableView ranks={ranks} currentUsername={currentUsername} />
      </div>
      <div className="mt-4 flex items-center justify-center">
        <button
          className={cn(
            'w-8 h-8 flex items-center justify-center border-none bg-transparent text-white-75 text-xl cursor-pointer',
            'disabled:opacity-25 disabled:cursor-default',
          )}
          onClick={() => goToPage(page - 1)}
          disabled={page <= 0}
          aria-label="이전 페이지"
        >
          ‹
        </button>
        <span className="font-product text-glyph-14 text-white-50">
          {page + 1} / {totalPage + 1}
        </span>
        <button
          className={cn(
            'w-8 h-8 flex items-center justify-center border-none bg-transparent text-white-75 text-xl cursor-pointer',
            'disabled:opacity-25 disabled:cursor-default',
          )}
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
    <table
      className={cn(
        'w-full border-separate text-left [border-spacing:0_4px]',
      )}
    >
      <thead>
        <tr
          className={cn(
            'rounded-md',
            '[&_img]:rounded-full [&_img]:overflow-hidden',
            '[&_td]:border-none [&_td]:p-[0_8px] [&_th]:border-none [&_th]:p-[0_8px]',
            '[&_td:first-child]:pl-4 [&_td:first-child]:rounded-l-md [&_td:first-child]:w-[54px]',
            '[&_th:first-child]:pl-4 [&_th:first-child]:rounded-l-md [&_th:first-child]:w-[54px]',
            '[&_td:last-child]:pr-4 [&_td:last-child]:rounded-r-md [&_td:last-child]:text-right',
            '[&_th:last-child]:pr-4 [&_th:last-child]:rounded-r-md [&_th:last-child]:text-right',
            '[&_td:nth-child(2)]:text-center [&_td:nth-child(2)]:w-7 [&_td:nth-child(2)]:pl-0',
            '[&_th:nth-child(2)]:text-center [&_th:nth-child(2)]:w-7 [&_th:nth-child(2)]:pl-0',
            'font-product text-glyph-16 font-bold bg-white-50 text-white-100 h-10',
          )}
        >
          <th>Rank</th>
          <th>Pet</th>
          <th>Name</th>
          <th>Contribution</th>
        </tr>
      </thead>
      <tbody>
        {ranks
          ? ranks.map((item) => (
              <tr
                key={item.rank}
                className={cn(
                  'rounded-md',
                  '[&_img]:rounded-full [&_img]:overflow-hidden',
                  '[&_td]:border-none [&_td]:p-[0_8px] [&_th]:border-none [&_th]:p-[0_8px]',
                  '[&_td:first-child]:pl-4 [&_td:first-child]:rounded-l-md [&_td:first-child]:w-[54px]',
                  '[&_th:first-child]:pl-4 [&_th:first-child]:rounded-l-md [&_th:first-child]:w-[54px]',
                  '[&_td:last-child]:pr-4 [&_td:last-child]:rounded-r-md [&_td:last-child]:text-right',
                  '[&_th:last-child]:pr-4 [&_th:last-child]:rounded-r-md [&_th:last-child]:text-right',
                  '[&_td:nth-child(2)]:text-center [&_td:nth-child(2)]:w-7 [&_td:nth-child(2)]:pl-0',
                  '[&_th:nth-child(2)]:text-center [&_th:nth-child(2)]:w-7 [&_th:nth-child(2)]:pl-0',
                  'font-product text-glyph-18 text-white-100 bg-white-10 h-12 text-glyph-15',
                  '[&_td:first-child]:text-base [&_td:first-child]:leading-7 [&_td:first-child]:font-dnf [&_td:first-child]:text-white-50',
                  item.name === currentUsername &&
                    'bg-[linear-gradient(133deg,rgba(255,253,201,0.30)_2.19%,rgba(150,230,216,0.30)_49.24%,rgba(125,171,241,0.30)_98.21%)]',
                )}
              >
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
              <tr
                key={i}
                className={cn(
                  'rounded-md',
                  '[&_td]:border-none [&_td]:p-[0_8px]',
                  '[&_td:first-child]:pl-4 [&_td:first-child]:rounded-l-md',
                  '[&_td:last-child]:pr-4 [&_td:last-child]:rounded-r-md',
                  'bg-white-10 h-12',
                )}
              >
                <td>
                  <Skeleton className="w-5 h-5 rounded" />
                </td>
                <td>
                  <Skeleton className="w-10 h-10 rounded-full" />
                </td>
                <td>
                  <Skeleton className="w-20 h-4 rounded" />
                </td>
                <td>
                  <Skeleton className="w-10 h-4 rounded" />
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
}
