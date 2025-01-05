'use client';

import { useRouter } from '@/i18n/routing';

import { GuildDetail } from '../../(components)/GuildDetail';

export default function GuildDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  return <GuildDetail guildId={params.id} onJoin={() => router.push(`/guild/detail/${params.id}/join`)} />;
}
