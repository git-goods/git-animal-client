import { cn } from '@gitanimals/ui-tailwind';
import { getGuildById } from '@gitanimals/api';

import { GuildModalPageTitle } from '@/app/[locale]/guild/_components/GuildModalPageLayout';

import { MemberCard } from './MemberCard';
import { WaitMemberCard } from './WaitMemberCard';

export default async function GuildMemberSetting({ params }: { params: { id: string } }) {
  const guild = await getGuildById({ guildId: params.id });

  return (
    <div className="min-h-[calc(100vh-300px)]">
      <GuildModalPageTitle className="mb-10">Manage members</GuildModalPageTitle>

      {guild?.waitMembers.length === 0 ? null : (
        <>
          <h3 className={subHeadingStyle}>Request</h3>
          <div className="flex gap-1 flex-wrap mb-6">
            {guild.waitMembers.map((member) => (
              <WaitMemberCard member={member} guildId={guild.id} key={member.id} />
            ))}
          </div>
        </>
      )}

      {guild?.members.length === 0 ? (
        <p className="text-center py-10 text-white/50">No members</p>
      ) : (
        <>
          <h3 className={subHeadingStyle}>Members</h3>
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

const subHeadingStyle = cn(
  'font-product text-glyph-14 text-white mb-2'
);
