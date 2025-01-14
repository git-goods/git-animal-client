import { css } from '_panda/css';
import { Flex } from '_panda/jsx';
import { getGuildById } from '@gitanimals/api';

import { GuildModalPageTitle } from '@/app/[locale]/guild/_components/GuildModalPageLayout';

import { MemberCard } from './MemberCard';
import { WaitMemberCard } from './WaitMemberCard';

export default async function GuildMemberSetting({ params }: { params: { id: string } }) {
  const guild = await getGuildById({ guildId: params.id });

  return (
    <div className={css({ minH: 'calc(100vh - 300px)' })}>
      <GuildModalPageTitle className={css({ mb: '40px' })}>Manage members</GuildModalPageTitle>

      {guild?.waitMembers.length === 0 ? null : (
        <>
          <h3 className={subHeadingStyle}>Request</h3>
          <Flex gap="1" flexWrap="wrap" mb="24px">
            {guild.waitMembers.map((member) => (
              <WaitMemberCard member={member} guildId={guild.id} key={member.id} />
            ))}
          </Flex>
        </>
      )}

      {guild?.members.length === 0 ? (
        <p className={css({ textAlign: 'center', py: '40px', color: 'white.white_50' })}>No members</p>
      ) : (
        <>
          <h3 className={subHeadingStyle}>Members</h3>
          <Flex gap="1" flexWrap="wrap">
            {guild.members.map((member) => (
              <MemberCard member={member} key={member.id} guildId={guild.id} />
            ))}
          </Flex>
        </>
      )}
    </div>
  );
}

const subHeadingStyle = css({
  textStyle: 'glyph14.regular',
  color: 'white',
  mb: '8px',
});
