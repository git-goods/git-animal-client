import { getServerSession } from 'next-auth';
import { getRankByUsername, getRanks } from '@gitanimals/api';

import RankingSection from '../../landing/RankingSection/RankingSection';

const TOTAL_VIEW_RANKS = 8 as const;
const RANKS_TOP_3 = 3 as const;
const RANKS_PER_PAGE = TOTAL_VIEW_RANKS - RANKS_TOP_3;

export default async function TestRankingPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  try {
    const type = searchParams.ranking ?? 'people';

    const session = await getServerSession();

    const rankType = type === 'people' ? 'WEEKLY_USER_CONTRIBUTIONS' : 'WEEKLY_GUILD_CONTRIBUTIONS';

    if (!session) {
      const data = await getRanks({ rank: 1, size: TOTAL_VIEW_RANKS, type: rankType });

      return <RankingSection topRanks={data.slice(0, 3)} bottomRanks={data.slice(3)} />;
    }

    const rankByUsername = await getRankByUsername(session.user.name);
    const currentUserRank = rankByUsername.rank;

    if (currentUserRank <= 3) {
      const data = await getRanks({ rank: 1, size: TOTAL_VIEW_RANKS, type: rankType });

      return <RankingSection topRanks={data} bottomRanks={data} />;
    }

    const topRanks = await getRanks({ rank: 1, size: RANKS_TOP_3, type: rankType });
    const currentUserRankData = await getRanks({ rank: currentUserRank, size: RANKS_PER_PAGE, type: rankType });

    return <RankingSection topRanks={topRanks} bottomRanks={currentUserRankData} />;
  } catch (error) {
    return <></>;
  }
}
