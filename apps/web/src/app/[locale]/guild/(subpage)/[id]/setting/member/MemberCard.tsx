'use client';

import type { GuildMember } from '@gitanimals/api';
import { kickMemberFromGuild } from '@gitanimals/api';
import { Button } from '@gitanimals/ui-panda';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/routing';
import { getPersonaImage } from '@/utils/image';

import { BannerGuildMember } from './BannerGuildMember';

export function MemberCard({ member, guildId }: { member: GuildMember; guildId: string }) {
  const router = useRouter();

  const kickMember = async () => {
    await kickMemberFromGuild({ guildId, userId: member.userId });
    toast.success('Kicked member');
    router.refresh();
  };

  return (
    <BannerGuildMember
      key={member.id}
      image={getPersonaImage(member.personaType)}
      name={member.name}
      count={member.contributions}
      bottomElement={
        <Button variant="secondary" onClick={kickMember} width="90px">
          Kick
        </Button>
      }
    />
  );
}
