import { getServerSession } from 'next-auth';
import { getRankByUsername } from '@gitanimals/api';
import { rankQueries } from '@gitanimals/react-query';

import { getDehydratedQueries, Hydrate } from '@/lib/react-query/queryClient';

import RankingSection from './RankingSection';

const TOTAL_VIEW_RANKS = 8 as const;
const RANKS_TOP_3 = 3 as const;
const RANKS_PER_PAGE = TOTAL_VIEW_RANKS - RANKS_TOP_3;

export async function RankingServerSide({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  try {
    const type = searchParams.ranking ?? 'people';

    const session = await getServerSession();

    const getStartPageNumber = async () => {
      if (session && type === 'people') {
        const rankByUsername = await getRankByUsername(session.user.name);
        const currentUserRank = rankByUsername.rank;
        const currentPage = Math.ceil((currentUserRank - RANKS_TOP_3) / RANKS_PER_PAGE) - 1;

        return Math.max(currentPage, 0);
      }

      return 0;
    };

    const currentPage = searchParams.page ? Number(searchParams.page) : await getStartPageNumber();
    const startRankNumber = currentPage * RANKS_PER_PAGE + 4;

    const rankType = type === 'people' ? 'WEEKLY_USER_CONTRIBUTIONS' : 'WEEKLY_GUILD_CONTRIBUTIONS';

    const queries = await getDehydratedQueries([
      rankQueries.getRanksOptions({ rank: 1, size: RANKS_TOP_3, type: rankType }),
      rankQueries.getRanksOptions({ rank: startRankNumber, size: RANKS_PER_PAGE, type: rankType }),
      rankQueries.getTotalRankOptions({ type: rankType }),
    ]);

    return (
      <Hydrate state={{ queries }}>
        <RankingSection type={rankType} startRankNumber={startRankNumber} currentPage={currentPage} />
      </Hydrate>
    );
  } catch (error) {
    return <></>;
  }
}
