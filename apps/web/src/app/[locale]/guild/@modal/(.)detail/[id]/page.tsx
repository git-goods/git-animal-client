import { Button } from '@gitanimals/ui-panda';

import { Link } from '@/i18n/routing';

import { GuildDetail } from '../../../_components/GuildDetail';
import GuildModal from '../../GuildModal';

export default function GuildDetailModal({ params }: { params: { id: string } }) {
  return (
    <GuildModal>
      <GuildDetail guildId={params.id} />
      <Link href={`/guild/detail/${params.id}/join`} style={{ margin: 'auto' }}>
        <Button w="100px">Join</Button>
      </Link>
    </GuildModal>
  );
}
