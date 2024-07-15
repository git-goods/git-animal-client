'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import ListItem from './NavItem';
import { css } from '_panda/css';
import { MENU } from './menu.constants';

export default function Example() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a href="/">Home</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{MENU[0].title}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className={listStyle}>
              {MENU[0].items.map((component) => (
                <ListItem key={component.title} href={component.href} title={component.title}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const listStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '3',
  p: '6',
  md: {
    w: '400px',
  },
  lg: {
    w: '500px',
    gridTemplateColumns: '.75fr 1fr',
  },
});
