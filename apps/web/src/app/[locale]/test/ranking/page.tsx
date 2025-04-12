import { getRanks } from '@gitanimals/api';

import RankingSection from '../../landing/RankingSection/RankingSection';

export default async function TestRankingPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const type = searchParams.ranking ?? 'people';

  const data = await getRanks({
    rank: 1,
    size: 8,
    type: type === 'people' ? 'WEEKLY_USER_CONTRIBUTIONS' : 'WEEKLY_GUILD_CONTRIBUTIONS',
  });
  return <RankingSection data={data} />;
}
