import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import type { RankType } from '@gitanimals/api';
import { cn } from '@gitanimals/ui-tailwind';
import { getNewUrl } from '@gitanimals/util-common';

import { PaginationServer } from '@/components/Pagination/PaginationServer';

import { RankingLink } from './RankingLink';

const slideStyle = 'w-full h-auto flex items-center justify-center';

const paginationStyle = 'mt-[20px] relative h-[30px] flex items-center justify-center gap-2';

const rankingListStyle = 'w-full';

const tableStyle = 'w-full border-separate text-left [border-spacing:0_4px]';

const trBaseStyle = cn(
  'rounded-[8px]',
  '[&_img]:rounded-full [&_img]:overflow-hidden',
  '[&_td]:border-none [&_th]:border-none [&_td]:px-[16px] [&_th]:px-[16px]',
  '[&_td:first-child]:pl-[40px] [&_th:first-child]:pl-[40px] [&_td:first-child]:rounded-[8px_0_0_8px] [&_th:first-child]:rounded-[8px_0_0_8px] [&_td:first-child]:w-[120px] [&_th:first-child]:w-[120px]',
  '[&_td:last-child]:pr-[40px] [&_th:last-child]:pr-[40px] [&_td:last-child]:rounded-[0_8px_8px_0] [&_th:last-child]:rounded-[0_8px_8px_0] [&_td:last-child]:text-right [&_th:last-child]:text-right',
  '[&_td:nth-child(2)]:text-center [&_th:nth-child(2)]:text-center [&_td:nth-child(2)]:w-[72px] [&_th:nth-child(2)]:w-[72px] [&_td:nth-child(2)]:px-[8px] [&_th:nth-child(2)]:px-[8px]',
  'mobile:rounded-[6px]',
  'mobile:[&_td]:border-none mobile:[&_th]:border-none mobile:[&_td]:px-[8px] mobile:[&_th]:px-[8px]',
  'mobile:[&_td:first-child]:pl-[16px] mobile:[&_th:first-child]:pl-[16px] mobile:[&_td:first-child]:w-[54px] mobile:[&_th:first-child]:w-[54px]',
  'mobile:[&_td:last-child]:pr-[16px] mobile:[&_th:last-child]:pr-[16px]',
  'mobile:[&_td:nth-child(2)]:w-[28px] mobile:[&_th:nth-child(2)]:w-[28px] mobile:[&_td:nth-child(2)]:pl-0 mobile:[&_th:nth-child(2)]:pl-0',
);

const theadTrStyle = cn(trBaseStyle, 'glyph16-bold bg-white-50 text-white-100 h-[40px]');

const trStyle = cn(
  trBaseStyle,
  'glyph18-regular text-white-100 bg-white-10 h-[60px]',
  '[&_td:first-child]:text-[20px] [&_td:first-child]:leading-[28px] [&_td:first-child]:font-dnf [&_td:first-child]:text-white-50',
  'mobile:h-[48px] mobile:glyph15-regular',
  'mobile:[&_td:first-child]:text-[16px]',
);

const currentUserTrStyle =
  'bg-[linear-gradient(133deg,rgba(255,253,201,0.30)_2.19%,rgba(150,230,216,0.30)_49.24%,rgba(125,171,241,0.30)_98.21%)]';

export function RankingTable({ ranks, page, totalPage }: { page: number; ranks: RankType[]; totalPage: number }) {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const currentUsername = session?.user?.name;

  const getRankingPageUrl = (params: Record<string, unknown>) => {
    const oldParams = Object.fromEntries(searchParams.entries());
    return getNewUrl({ baseUrl: '/', newParams: params, oldParams });
  };

  // 페이지 데이터를 10개씩 그룹화
  const groupedRanks = ranks.reduce((acc: RankType[][], rank, index) => {
    const groupIndex = Math.floor(index / 10);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(rank);
    return acc;
  }, []);

  return (
    <div className={rankingListStyle}>
      {groupedRanks.map((group, index) => (
        <div key={index} className={slideStyle}>
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
              {group.map((item) => (
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
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <div className={paginationStyle}>
        <PaginationServer
          currentPage={page}
          totalRecords={totalPage + 1}
          totalPages={totalPage + 1}
          nextPage={page === totalPage ? null : page + 1}
          prevPage={page < 1 ? null : page - 1}
          generateMoveLink={getRankingPageUrl}
        />
      </div>
    </div>
  );
}
