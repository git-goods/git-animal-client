import { GIT_ANIMALS_MAIN_URL } from '@/constants/outlink';

export interface NavMenu {
  label: string;
  href: string;
  isExternal?: boolean;
}

export const LOGIN_NAV_MENU_LIST: NavMenu[] = [
  {
    label: 'auction',
    href: '/shop',
  },
] as const;

export const NON_LOGIN_NAV_MENU_LIST: NavMenu[] = [
  {
    label: 'github',
    href: GIT_ANIMALS_MAIN_URL,
    isExternal: true,
  },
] as const;
