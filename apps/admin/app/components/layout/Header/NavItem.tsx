import { NavigationMenuLink } from '@radix-ui/react-navigation-menu';
import { cx, css } from '_panda/css';
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';

const ListItem = forwardRef<ElementRef<'a'>, ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cx('focus:bg-accent focus:text-accent-foreground', anchorStyle, className)}
            {...props}
          >
            <div className={titleStyle}>{title}</div>
            <p className={descriptionStyle}>{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);

ListItem.displayName = 'ListItem';

export default ListItem;

const anchorStyle = css({
  display: 'block',
  userSelect: 'none',
  spaceY: '1',
  rounded: 'md',
  p: '3',
  leading: 'none',
  textDecoration: 'none',
  outline: 'none',
  transition: 'colors',
  _hover: {
    bg: 'accent',
    color: 'accent.foreground',
  },
  _focus: {
    bg: 'accent',
    color: 'accent.foreground',
  },
});

const titleStyle = css({
  textStyle: 'sm',
  fontWeight: 'medium',
  leading: 'none',
});

const descriptionStyle = css({
  lineClamp: '2',
  textStyle: 'sm',
  leading: 'snug',
  color: 'muted.foreground',
});
