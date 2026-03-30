import { getServerSession } from 'next-auth';
import { getRankByUsername } from '@gitanimals/api';
import { rankQueries } from '@gitanimals/react-query';

import { getDehydratedQueries, Hydrate } from '@/lib/react-query/queryClient';

import { RANKS_PER_PAGE, RANKS_TOP_3 } from './constants';
import RankingSection from './RankingSection';

export async function RankingServerSide({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  try {
    const searchParams = await searchParamsPromise;
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
