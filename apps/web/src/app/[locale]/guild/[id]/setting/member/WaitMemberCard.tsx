'use client';

import { Flex } from '_panda/jsx';
import { acceptJoinGuild, denyJoinGuild, type GuildMember } from '@gitanimals/api';
import { Button } from '@gitanimals/ui-panda';

import { getPersonaImage } from '@/utils/image';

import { BannerGuildMember } from '../../../(components)/BannerGuildMember';

export function WaitMemberCard({ member, guildId }: { member: GuildMember; guildId: string }) {
  const acceptMember = async () => {
    await acceptJoinGuild({ guildId: guildId, userId: member.id });
  };

  const denyMember = async () => {
    await denyJoinGuild({ guildId: guildId, userId: member.id });
  };

  return (
    <BannerGuildMember
      key={member.id}
      image={getPersonaImage(member.personaType)}
      name={member.name}
      count={member.contributions}
      bottomElement={
        <Flex gap="2">
          <Button variant="secondary" onClick={denyMember}>
            Deny
          </Button>
          <Button onClick={acceptMember}>Accept</Button>
        </Flex>
      }
    />
  );
}
