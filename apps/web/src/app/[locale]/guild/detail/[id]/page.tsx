import { GuildDetail } from '../../(components)/GuildDetail';

export default function GuildDetailPage({ params }: { params: { id: string } }) {
  return <GuildDetail guildId={params.id} />;
}
