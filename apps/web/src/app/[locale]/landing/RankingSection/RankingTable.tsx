import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { css, cx } from '_panda/css';
import type { RankType } from '@gitanimals/api';
import { getNewUrl } from '@gitanimals/util-common';

import { PaginationServer } from '@/components/Pagination/PaginationServer';

import { RankingLink } from './RankingLink';

export function RankingTable({ ranks, page }: { page: number; ranks: RankType[] }) {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const currentUsername = session?.user?.name;

  const getRankingPageUrl = (params: Record<string, unknown>) => {
    const oldParams = Object.fromEntries(searchParams.entries());
    return getNewUrl({ baseUrl: '/test/ranking', newParams: params, oldParams });
  };

  return (
    <div className={rankingListStyle}>
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
          {ranks.map((item) => (
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
          ))}
        </tbody>
      </table>
      <PaginationServer
        totalRecords={100} // TODO: 서버 데이터 필요
        currentPage={page}
        totalPages={100}
        nextPage={page + 1}
        prevPage={page - 1}
        generateMoveLink={getRankingPageUrl}
      />
    </div>
  );
}

const rankingListStyle = css({});

const tableStyle = css({
  width: '100%',
  borderCollapse: 'separate',
  textAlign: 'left',
  borderSpacing: '0 4px',
});

const trBaseStyle = css({
  borderRadius: '8px',

  '& img': {
    borderRadius: '50%',
    overflow: 'hidden',
  },

  '& td, & th': {
    border: 'none',
    padding: '0 16px',
  },

  '& td:first-child, & th:first-child': {
    paddingLeft: '40px',
    borderRadius: '8px 0 0 8px',
    width: '120px',
  },
  '& td:last-child, & th:last-child': {
    paddingRight: '40px',
    borderRadius: '0 8px 8px 0',
    textAlign: 'right',
  },
  '& td:nth-child(2), & th:nth-child(2)': {
    textAlign: 'center',
    width: '72px',
    padding: '0 8px',
  },

  _mobile: {
    borderRadius: '6px',
    '& td, & th': {
      border: 'none',
      padding: '0 8px',
    },

    '& td:first-child, & th:first-child': {
      paddingLeft: '16px',
      width: '54px',
    },
    '& td:last-child, & th:last-child': {
      paddingRight: '16px',
    },
    '& td:nth-child(2), & th:nth-child(2)': {
      width: '28px',
      paddingLeft: '0px',
    },
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
    height: '60px',

    '& td:first-child': {
      fontSize: '20px',
      lineHeight: '28px',
      fontFamily: 'token(fonts.dnf)',
      color: 'white.white_50',
    },
    _mobile: {
      height: '48px',
      fontSize: 'glyph15.regular',

      '& td:first-child': {
        fontSize: '16px',
      },
    },
  }),
);

const currentUserTrStyle = css({
  background:
    'linear-gradient(133deg, rgba(255, 253, 201, 0.30) 2.19%, rgba(150, 230, 216, 0.30) 49.24%, rgba(125, 171, 241, 0.30) 98.21%)',
});
