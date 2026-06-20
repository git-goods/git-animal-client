import { getGuildById } from '@gitanimals/api';

import { GuildModalPageTitle } from '@/app/[locale]/guild/_components/GuildModalPageLayout';

import { MemberCard } from './MemberCard';
import { WaitMemberCard } from './WaitMemberCard';

export default async function GuildMemberSetting({ params }: { params: { id: string } }) {
  const guild = await getGuildById({ guildId: params.id });

  return (
    <div className="min-h-[calc(100vh_-_300px)]">
      <GuildModalPageTitle className="mb-[40px]">Manage members</GuildModalPageTitle>

      {guild?.waitMembers.length === 0 ? null : (
        <>
          <h3 className="glyph14-regular text-white mb-[8px]">Request</h3>
          <div className="flex gap-1 flex-wrap mb-[24px]">
            {guild.waitMembers.map((member) => (
              <WaitMemberCard member={member} guildId={guild.id} key={member.id} />
            ))}
          </div>
        </>
      )}

      {guild?.members.length === 0 ? (
        <p className="text-center py-[40px] text-white-50">No members</p>
      ) : (
        <>
          <h3 className="glyph14-regular text-white mb-[8px]">Members</h3>
          <div className="flex gap-1 flex-wrap">
            {guild.members.map((member) => (
              <MemberCard member={member} key={member.id} guildId={guild.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
