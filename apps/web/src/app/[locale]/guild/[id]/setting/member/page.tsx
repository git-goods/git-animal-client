import { css } from '_panda/css';
import { Flex } from '_panda/jsx';
import { getGuildById, kickMemberFromGuild } from '@gitanimals/api';
import { Button, dialogTitleStyle } from '@gitanimals/ui-panda';

import { getPersonaImage } from '@/utils/image';

import { BannerGuildMember } from '../../../(components)/BannerGuildMember';

import { WaitMemberCard } from './WaitMemberCard';

export default async function GuildMemberSetting({ params }: { params: { id: string } }) {
  const guild = await getGuildById({ guildId: params.id });

  const removeMember = async (formData: FormData) => {
    'use server';
    const guildId = formData.get('guildId') as string;
    const userId = formData.get('userId') as string;
    await kickMemberFromGuild({ guildId, userId });
  };

  return (
    <div>
      <h2 className={dialogTitleStyle}>Manage members</h2>

      <h3 className={subHeadingStyle}>Request</h3>
      {guild?.waitMembers.length === 0 ? (
        <p className={css({ textAlign: 'center', pt: '40px', color: 'white.white_50' })}>No members</p>
      ) : (
        <Flex gap="1" flexWrap="wrap">
          {guild.waitMembers.map((member) => (
            <WaitMemberCard member={member} guildId={guild.id} key={member.id} />
          ))}
        </Flex>
      )}

      <h3 className={subHeadingStyle}>Members</h3>
      {guild?.members.length === 0 ? (
        <p className={css({ textAlign: 'center', pt: '40px', color: 'white.white_50' })}>No members</p>
      ) : (
        <Flex gap="1" flexWrap="wrap">
          {guild.members.map((member) => (
            <form key={member.id} action={removeMember}>
              <input type="hidden" name="guildId" value={guild.id} />
              <input type="hidden" name="userId" value={member.id} />
              <BannerGuildMember
                key={member.id}
                image={getPersonaImage(member.personaType)}
                name={member.name}
                count={member.contributions}
                bottomElement={<Button>Remove</Button>}
              />
            </form>
          ))}
        </Flex>
      )}
    </div>
  );
}

const subHeadingStyle = css({
  textStyle: 'glyph14.regular',
  color: 'white',
  mb: '8px',
});
