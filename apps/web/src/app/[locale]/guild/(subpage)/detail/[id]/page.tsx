import { checkIsMyGuild, getGuildById } from '@gitanimals/api';
import { Button } from '@gitanimals/ui-tailwind';

import { Link } from '@/i18n/routing';

import { GuildDetail } from '../GuildDetail';

export default async function GuildDetailPage({ params }: { params: { id: string } }) {
  const details = await getGuildById({ guildId: params.id });
  const isMyGuild = await checkIsMyGuild(params.id);

  return (
    <>
      <GuildDetail guildId={params.id} details={details} />{' '}
      {!isMyGuild && (
        <Link href={`/guild/detail/${params.id}/join`} style={{ margin: 'auto' }}>
          <Button className="w-[100px]">Join</Button>
        </Link>
      )}
    </>
  );
}
