import type { ReactNode } from 'react';
import { ShoppingCartIcon } from 'lucide-react';

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

export const NON_LOGIN_NAV_MENU_LIST: NavMenu[] = [] as const;
