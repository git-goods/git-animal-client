'use client';

import { useParams } from 'next/navigation';
import { leaveGuild } from '@gitanimals/api';
import { guildQueries } from '@gitanimals/react-query';
import {
  Button,
  Dialog,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@gitanimals/ui-tailwind';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { CatIcon, EllipsisVerticalIcon, LinkIcon, LogOutIcon, SettingsIcon, UsersRoundIcon } from 'lucide-react';
import { overlay } from 'overlay-kit';
import { toast } from 'sonner';

import { ORIGIN_URL, ROUTE } from '@/constants/route';
import { Link, useRouter } from '@/i18n/routing';
import { useClientUser } from '@/utils/clientAuth';
import { copyClipBoard } from '@/utils/copy';

interface MenuType {
  title: string;
  href?: (guildId: string) => string;
  icon: React.ElementType;
  onClick?: () => void;
  access: ('leader' | 'member')[];
}

/**
 * 더보기 메뉴
 */
export const MoreMenu = wrap
  .ErrorBoundary({ fallback: null })
  .Suspense({
    fallback: null,
  })
  .on(({ guildId }: { guildId: string }) => {
    const { id } = useClientUser();
    const { data } = useSuspenseQuery(guildQueries.getGuildByIdOptions(guildId));
    const isLeader = data.leader.userId === id;

    const leaveGuildAction = useLeaveGuild();

    const MENU: MenuType[] = [
      {
        title: 'Guild setting',
        href: (guildId: string) => `/guild/${guildId}/setting`,
        icon: SettingsIcon,
        access: ['leader'],
      },
      {
        title: 'Edit profile pet',
        href: (guildId: string) => `/guild/${guildId}/setting/pet`,
        icon: CatIcon,
        access: ['leader', 'member'],
      },
      {
        title: 'Manage members',
        href: (guildId: string) => `/guild/${guildId}/setting/member`,
        icon: UsersRoundIcon,
        access: ['leader'],
      },
      {
        title: 'Send invite message',
        icon: LinkIcon,
        onClick: () => {
          copyClipBoard(ORIGIN_URL + ROUTE.GUILD.DETAIL(guildId));
          toast.success('Invite message copied to clipboard');
        },
        access: ['leader', 'member'],
      },
      {
        title: 'Leave guilds',
        icon: LogOutIcon,
        onClick: leaveGuildAction,
        access: ['member'],
      },
    ];

    const viewMenu = MENU.filter((menu) => menu.access.includes(isLeader ? 'leader' : 'member'));

    return (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVerticalIcon size={24} color="#FFFFFFBF" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" sideOffset={10} alignOffset={-4}>
            {viewMenu.map((menu) => {
              if (menu.href) {
                return (
                  <Link href={menu.href(guildId)} key={menu.title}>
                    <DropdownMenuItem>
                      <menu.icon color="#FFFFFF80" size={18} />
                      {menu.title}
                    </DropdownMenuItem>
                  </Link>
                );
              }
              return (
                <DropdownMenuItem key={menu.title} onClick={menu.onClick}>
                  <menu.icon color="#FFFFFF80" size={18} />
                  {menu.title}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  });

const useLeaveGuild = () => {
  const { id: guildId } = useParams();
  const router = useRouter();

  const action = () => {
    overlay.open(({ isOpen, close }) => (
      <Dialog open={isOpen} onOpenChange={close}>
        <Dialog.Content className="max-w-fit">
          <Dialog.Title className="font-product font-medium text-glyph-20 text-left">
            Are you sure you want to leave the guild?
          </Dialog.Title>
          <div className="flex gap-2 justify-end w-full">
            <Button onClick={submitLeaveGuild} variant="secondary" size="m">
              Ok
            </Button>
            <Button onClick={() => close()} variant="primary" size="m">
              Close
            </Button>
          </div>
        </Dialog.Content>
      </Dialog>
    ));
  };

  const submitLeaveGuild = async () => {
    if (!guildId) return;
    if (typeof guildId !== 'string') return;

    await leaveGuild({ guildId });
    router.push('/guild');
  };

  return action;
};
