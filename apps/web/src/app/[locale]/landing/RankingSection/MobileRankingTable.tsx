import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { css, cx } from '_panda/css';
import useEmblaCarousel from 'embla-carousel-react';
import type { RankType } from '@gitanimals/api';
import { getNewUrl } from '@gitanimals/util-common';

import { RankingLink } from './RankingLink';

export function MobileRankingTable({ ranks, page, totalPage }: { page: number; ranks: RankType[]; totalPage: number }) {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const currentUsername = session?.user?.name;
  const prevIndexRef = useRef(page - 1);

  const [emblaRef, emblaApi] = useEmblaCarousel({ startIndex: page - 1 });

  const getRankingPageUrl = (params: Record<string, unknown>) => {
    const oldParams = Object.fromEntries(searchParams.entries());
    return getNewUrl({ baseUrl: '/', newParams: params, oldParams });
  };

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const currentIndex = emblaApi.selectedScrollSnap();
      const previousIndex = prevIndexRef.current;
      if (currentIndex === previousIndex) return;
      prevIndexRef.current = currentIndex;

      // Flicking NEXT(index 증가) → page - 1, PREV(index 감소) → page + 1
      const newPage = currentIndex > previousIndex ? page - 1 : page + 1;

      if (newPage < 0) return;
      if (newPage > totalPage) return;

      const newUrl = getRankingPageUrl({ page: newPage });
      router.push(newUrl);
    };

    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, page, totalPage]);

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
      <div className={emblaViewportStyle} ref={emblaRef}>
        <div className={emblaContainerStyle}>
          {groupedRanks.map((group, index) => (
            <div key={index} className={cx(slideStyle, emblaSlideStyle)}>
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
            </div>
          ))}
        </div>
      </div>
      <div className={paginationStyle}>
        {[0, 1, 2].map((group, index) => {
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

const emblaViewportStyle = css({
  width: '100%',
  overflow: 'hidden',
});

const emblaContainerStyle = css({ display: 'flex' });
const emblaSlideStyle = css({ flex: '0 0 100%', minWidth: 0 });

const slideStyle = css({
  width: '100%',
  height: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

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
