import { cn } from '@gitanimals/ui-tailwind';
import { checkIsMyGuild, getGuildById } from '@gitanimals/api';
import { Button } from '@gitanimals/ui-tailwind';

import RouteModal from '@/components/RouteModal';
import { Link } from '@/i18n/routing';

import { GuildDetail } from '../../../(subpage)/detail/GuildDetail';

export default async function GuildDetailModal({ params }: { params: { id: string } }) {
  const details = await getGuildById({ guildId: params.id });
  const isMyGuild = await checkIsMyGuild(params.id);

  return (
    <RouteModal>
      <div className={containerStyle}>
        <GuildDetail guildId={params.id} details={details} />
        {!isMyGuild && (
          <Link href={`/guild/detail/${params.id}/join`} style={{ margin: 'auto' }}>
            <Button className="w-[100px]">Join</Button>
          </Link>
        )}
      </div>
    </RouteModal>
  );
}

const containerStyle = cn(
  'flex flex-col justify-center gap-8 h-fit'
);
