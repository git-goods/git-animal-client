import { getGuildById } from '@gitanimals/api';
import { Button } from '@gitanimals/ui-panda';

import { Link } from '@/i18n/routing';

import { GuildDetail } from '../../_components/GuildDetail';

export default async function GuildDetailPage({ params }: { params: { id: string } }) {
  const details = await getGuildById({ guildId: params.id });

  return (
    <>
      <GuildDetail guildId={params.id} details={details} />{' '}
      <Link href={`/guild/detail/${params.id}/join`} style={{ margin: 'auto' }}>
        <Button w="100px">Join</Button>
      </Link>
    </>
  );
}
