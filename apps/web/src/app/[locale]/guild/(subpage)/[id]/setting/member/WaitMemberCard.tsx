'use client';

import { acceptJoinGuild, denyJoinGuild, type GuildMember } from '@gitanimals/api';
import { Button } from '@gitanimals/ui-tailwind';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/routing';
import { getPersonaImage } from '@/utils/image';

import { BannerGuildMember } from './BannerGuildMember';

export function WaitMemberCard({ member, guildId }: { member: GuildMember; guildId: string }) {
  const router = useRouter();

  const acceptMember = async () => {
    await acceptJoinGuild({ guildId: guildId, userId: member.userId });
    toast.success('Accepted member');
    router.refresh();
  };

  const denyMember = async () => {
    await denyJoinGuild({ guildId: guildId, userId: member.userId });
    toast.success('Denied member');
    router.refresh();
  };

  return (
    <BannerGuildMember
      key={member.id}
      image={getPersonaImage(member.personaType)}
      name={member.name}
      count={member.contributions}
      bottomElement={
        <div className="flex gap-2">
          <Button variant="secondary" onClick={denyMember}>
            Deny
          </Button>
          <Button onClick={acceptMember}>Accept</Button>
        </div>
      }
    />
  );
}
