import type { ReactNode } from 'react';
import { GithubIcon } from '@gitanimals/ui-icon';
import { ShoppingCartIcon } from 'lucide-react';

import { GIT_ANIMALS_MAIN_URL } from '@/constants/outlink';

export interface NavMenu {
  label: string;
  href: string;
  isExternal?: boolean;
  icon: ReactNode;
}

export const LOGIN_NAV_MENU_LIST: NavMenu[] = [
  {
    label: 'shop',
    href: '/shop',
    icon: <ShoppingCartIcon size={20} color="#9295A1" />,
  },
] as const;

export const NON_LOGIN_NAV_MENU_LIST: NavMenu[] = [
  {
    label: 'github',
    href: GIT_ANIMALS_MAIN_URL,
    isExternal: true,
    icon: <GithubIcon width={22} height={22} color="#6e717a" />,
  },
] as const;
