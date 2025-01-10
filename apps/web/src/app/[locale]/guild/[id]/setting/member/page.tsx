import { css } from '_panda/css';
import { Flex } from '_panda/jsx';
import { getGuildById } from '@gitanimals/api';
import { Button, dialogTitleStyle } from '@gitanimals/ui-panda';

import { getPersonaImage } from '@/utils/image';

import { BannerGuildMember } from '../../../(components)/BannerGuildMember';

export default async function GuildMemberSetting({ params }: { params: { id: string } }) {
  const guild = await getGuildById({ guildId: params.id });
  console.log('guild: ', guild);

  return (
    <div>
      <h2 className={dialogTitleStyle}>Manage members</h2>
      {guild?.members.length === 0 ? (
        <p className={css({ textAlign: 'center', pt: '40px', color: 'white.white_50' })}>No members</p>
      ) : (
        <Flex gap="1" flexWrap="wrap">
          {guild.members.map((member) => (
            <BannerGuildMember
              key={member.id}
              image={getPersonaImage(member.personaType)}
              name={member.name}
              count={member.contributions}
              bottomElement={<Button>Remove</Button>}
            />
          ))}
        </Flex>
      )}
    </div>
  );
}
