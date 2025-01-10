'use client';

import { Flex } from '_panda/jsx';
import { acceptJoinGuild, type GuildMember } from '@gitanimals/api';
import { Button } from '@gitanimals/ui-panda';

import { getPersonaImage } from '@/utils/image';

import { BannerGuildMember } from '../../../(components)/BannerGuildMember';

export function WaitMemberCard({ member, guildId }: { member: GuildMember; guildId: string }) {
  const acceptMember = async () => {
    await acceptJoinGuild({ guildId: guildId, userId: member.id });
  };

  return (
    <BannerGuildMember
      key={member.id}
      image={getPersonaImage(member.personaType)}
      name={member.name}
      count={member.contributions}
      bottomElement={
        <Flex>
          <Button onClick={acceptMember}>Accept</Button>
          {/* <Button formAction={rejectMember}>Reject</Button> */}
        </Flex>
      }
    />
  );
}
