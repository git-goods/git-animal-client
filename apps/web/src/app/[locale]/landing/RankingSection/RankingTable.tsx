import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import type { RankType } from '@gitanimals/api';
import { cn } from '@gitanimals/ui-tailwind/utils';
import { getNewUrl } from '@gitanimals/util-common';

import { PaginationServer } from '@/components/Pagination/PaginationServer';

import { RankingLink } from './RankingLink';

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
    <div className="w-full">
      {groupedRanks.map((group, index) => (
        <div key={index} className="w-full h-auto flex items-center justify-center">
          <table className="w-full border-separate text-left [border-spacing:0_4px]">
            <thead>
              <tr
                className={cn(
                  'rounded-lg',
                  '[&_img]:rounded-full [&_img]:overflow-hidden',
                  '[&_td]:border-none [&_td]:p-[0_16px] [&_th]:border-none [&_th]:p-[0_16px]',
                  '[&_td:first-child]:pl-10 [&_td:first-child]:rounded-l-lg [&_td:first-child]:w-[120px]',
                  '[&_th:first-child]:pl-10 [&_th:first-child]:rounded-l-lg [&_th:first-child]:w-[120px]',
                  '[&_td:last-child]:pr-10 [&_td:last-child]:rounded-r-lg [&_td:last-child]:text-right',
                  '[&_th:last-child]:pr-10 [&_th:last-child]:rounded-r-lg [&_th:last-child]:text-right',
                  '[&_td:nth-child(2)]:text-center [&_td:nth-child(2)]:w-[72px] [&_td:nth-child(2)]:p-[0_8px]',
                  '[&_th:nth-child(2)]:text-center [&_th:nth-child(2)]:w-[72px] [&_th:nth-child(2)]:p-[0_8px]',
                  'max-mobile:rounded-md',
                  'max-mobile:[&_td]:border-none max-mobile:[&_td]:p-[0_8px] max-mobile:[&_th]:border-none max-mobile:[&_th]:p-[0_8px]',
                  'max-mobile:[&_td:first-child]:pl-4 max-mobile:[&_td:first-child]:w-[54px]',
                  'max-mobile:[&_th:first-child]:pl-4 max-mobile:[&_th:first-child]:w-[54px]',
                  'max-mobile:[&_td:last-child]:pr-4 max-mobile:[&_th:last-child]:pr-4',
                  'max-mobile:[&_td:nth-child(2)]:w-7 max-mobile:[&_td:nth-child(2)]:pl-0',
                  'max-mobile:[&_th:nth-child(2)]:w-7 max-mobile:[&_th:nth-child(2)]:pl-0',
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
              {group.map((item) => (
                <tr
                  key={item.rank}
                  className={cn(
                    'rounded-lg',
                    '[&_img]:rounded-full [&_img]:overflow-hidden',
                    '[&_td]:border-none [&_td]:p-[0_16px] [&_th]:border-none [&_th]:p-[0_16px]',
                    '[&_td:first-child]:pl-10 [&_td:first-child]:rounded-l-lg [&_td:first-child]:w-[120px]',
                    '[&_th:first-child]:pl-10 [&_th:first-child]:rounded-l-lg [&_th:first-child]:w-[120px]',
                    '[&_td:last-child]:pr-10 [&_td:last-child]:rounded-r-lg [&_td:last-child]:text-right',
                    '[&_th:last-child]:pr-10 [&_th:last-child]:rounded-r-lg [&_th:last-child]:text-right',
                    '[&_td:nth-child(2)]:text-center [&_td:nth-child(2)]:w-[72px] [&_td:nth-child(2)]:p-[0_8px]',
                    '[&_th:nth-child(2)]:text-center [&_th:nth-child(2)]:w-[72px] [&_th:nth-child(2)]:p-[0_8px]',
                    'max-mobile:rounded-md',
                    'max-mobile:[&_td]:border-none max-mobile:[&_td]:p-[0_8px] max-mobile:[&_th]:border-none max-mobile:[&_th]:p-[0_8px]',
                    'max-mobile:[&_td:first-child]:pl-4 max-mobile:[&_td:first-child]:w-[54px]',
                    'max-mobile:[&_th:first-child]:pl-4 max-mobile:[&_th:first-child]:w-[54px]',
                    'max-mobile:[&_td:last-child]:pr-4 max-mobile:[&_th:last-child]:pr-4',
                    'max-mobile:[&_td:nth-child(2)]:w-7 max-mobile:[&_td:nth-child(2)]:pl-0',
                    'max-mobile:[&_th:nth-child(2)]:w-7 max-mobile:[&_th:nth-child(2)]:pl-0',
                    'font-product text-glyph-18 text-white-100 bg-white-10 h-[60px]',
                    '[&_td:first-child]:text-xl [&_td:first-child]:leading-7 [&_td:first-child]:font-dnf [&_td:first-child]:text-white-50',
                    'max-mobile:h-12 max-mobile:text-glyph-15',
                    'max-mobile:[&_td:first-child]:text-base',
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
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <div className="mt-5 relative h-[30px] flex items-center justify-center gap-0.5">
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
