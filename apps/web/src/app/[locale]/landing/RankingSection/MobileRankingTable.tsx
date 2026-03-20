'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { css, cx } from '_panda/css';
import useEmblaCarousel from 'embla-carousel-react';
import type { RankType } from '@gitanimals/api';
import { rankQueries } from '@gitanimals/react-query';
import { getNewUrl } from '@gitanimals/util-common';
import { useQuery } from '@tanstack/react-query';

import { RankingLink } from './RankingLink';

const RANKS_PER_PAGE = 5;
const CURRENT_SLIDE_INDEX = 1;

interface MobileRankingTableProps {
  ranks: RankType[];
  page: number;
  totalPage: number;
  type: 'WEEKLY_USER_CONTRIBUTIONS' | 'WEEKLY_GUILD_CONTRIBUTIONS';
}

export function MobileRankingTable({ ranks, page, totalPage, type }: MobileRankingTableProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const currentUsername = session?.user?.name;

  const hasPrev = page > 0;
  const hasNext = page < totalPage;

  const prevRankStart = (page - 1) * RANKS_PER_PAGE + 4;
  const nextRankStart = (page + 1) * RANKS_PER_PAGE + 4;

  const { data: prevRanks } = useQuery({
    ...rankQueries.getRanksOptions({ rank: prevRankStart, size: RANKS_PER_PAGE, type }),
    enabled: hasPrev,
  });

  const { data: nextRanks } = useQuery({
    ...rankQueries.getRanksOptions({ rank: nextRankStart, size: RANKS_PER_PAGE, type }),
    enabled: hasNext,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel({ startIndex: CURRENT_SLIDE_INDEX });

  const getRankingPageUrl = (params: Record<string, unknown>) => {
    const oldParams = Object.fromEntries(searchParams.entries());
    return getNewUrl({ baseUrl: '/', newParams: params, oldParams });
  };

  useEffect(() => {
    if (!emblaApi) return;

    const onSettle = () => {
      const selectedIndex = emblaApi.selectedScrollSnap();
      if (selectedIndex === CURRENT_SLIDE_INDEX) return;

      const newPage = selectedIndex < CURRENT_SLIDE_INDEX ? page + 1 : page - 1;

      if (newPage < 0 || newPage > totalPage) {
        emblaApi.scrollTo(CURRENT_SLIDE_INDEX, true);
        return;
      }

      const newUrl = getRankingPageUrl({ page: newPage });
      router.push(newUrl);
    };

    emblaApi.on('settle', onSettle);
    return () => {
      emblaApi.off('settle', onSettle);
    };
  }, [emblaApi, page, totalPage]);

  return (
    <div className={rankingListStyle}>
      <div className={emblaViewportStyle} ref={emblaRef}>
        <div className={emblaContainerStyle}>
          {hasPrev && (
            <div className={emblaSlideStyle}>
              <RankingTableView ranks={prevRanks} currentUsername={currentUsername} />
            </div>
          )}
          <div className={emblaSlideStyle}>
            <RankingTableView ranks={ranks} currentUsername={currentUsername} />
          </div>
          {hasNext && (
            <div className={emblaSlideStyle}>
              <RankingTableView ranks={nextRanks} currentUsername={currentUsername} />
            </div>
          )}
        </div>
      </div>
      <div className={paginationStyle}>
        {[0, 1, 2].map((_, index) => {
          const isActive =
            (page === 0 && index === 0) ||
            (page !== 0 && page !== totalPage && index === 1) ||
            (page === totalPage && index === 2);
          return <div key={index} className={cx(paginationBulletStyle, isActive && 'active')}></div>;
        })}
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
  if (!ranks) return null;

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
  );
}

const emblaViewportStyle = css({ overflow: 'hidden', width: '100%' });
const emblaContainerStyle = css({ display: 'flex' });
const emblaSlideStyle = css({ flex: '0 0 100%', minWidth: 0 });

const paginationStyle = css({
  marginTop: '20px',
  position: 'relative',
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
});

const paginationBulletStyle = css({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: 'white.white_50',
  cursor: 'pointer',

  '&.active': {
    backgroundColor: 'white.white_100',
  },
});

const rankingListStyle = css({
  width: '100%',
});

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
