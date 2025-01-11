import { GuildDetail } from '../../_components/GuildDetail';

export default function GuildDetailPage({ params }: { params: { id: string } }) {
  return <GuildDetail guildId={params.id} />;
}
