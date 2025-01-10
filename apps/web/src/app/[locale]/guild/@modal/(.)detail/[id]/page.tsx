import { getGuildById } from '@gitanimals/api';
import { Button } from '@gitanimals/ui-panda';

import { GuildDetail } from '@/app/[locale]/guild/_components/GuildDetail';
import GuildModal from '@/app/[locale]/guild/@modal/GuildModal';
import { Link } from '@/i18n/routing';

export default async function GuildDetailModal({ params }: { params: { id: string } }) {
  const details = await getGuildById({ guildId: params.id });
  return (
    <GuildModal>
      <GuildDetail guildId={params.id} details={details} />
      <Link href={`/guild/detail/${params.id}/join`} style={{ margin: 'auto' }}>
        <Button w="100px">Join</Button>
      </Link>
    </GuildModal>
  );
}
