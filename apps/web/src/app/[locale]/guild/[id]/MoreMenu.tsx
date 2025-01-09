import { checkIsLeader } from '@gitanimals/api';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@gitanimals/ui-panda';
import { CatIcon, EllipsisVerticalIcon, LinkIcon, SettingsIcon, UsersRoundIcon } from 'lucide-react';

import { Link } from '@/i18n/routing';

/**
 * 더보기 메뉴
 * 현재는 모두 길드장만 볼 수 있음
 */
export async function MoreMenu({ guildId }: { guildId: string }) {
  const isLeader = await checkIsLeader(guildId);

  if (!isLeader) return null;

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVerticalIcon size={24} color="#FFFFFFBF" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={10} alignOffset={-4}>
          <Link href={`/guild/${guildId}/setting`}>
            <DropdownMenuItem>
              <SettingsIcon color="#FFFFFF80" size={18} />
              Guild setting
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <CatIcon color="#FFFFFF80" size={18} />
            Edit profile pet
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UsersRoundIcon color="#FFFFFF80" size={18} />
            Manage members
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LinkIcon color="#FFFFFF80" size={18} />
            Send invite message
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
