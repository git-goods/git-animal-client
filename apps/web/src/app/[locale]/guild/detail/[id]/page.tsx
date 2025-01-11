import { getGuildById } from '@gitanimals/api';

import { GuildDetail } from '../../_components/GuildDetail';

export default async function GuildDetailPage({ params }: { params: { id: string } }) {
  const details = await getGuildById({ guildId: params.id });

  return <GuildDetail guildId={params.id} details={details} />;
}
