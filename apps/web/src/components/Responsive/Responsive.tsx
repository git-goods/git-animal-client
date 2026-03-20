import type { ComponentProps, ElementType } from 'react';
import { css, cx } from '_panda/css';

const desktopClass = css({ display: 'block', _mobile: { display: 'none' } });
const mobileClass = css({ display: 'none', _mobile: { display: 'block' } });

type ResponsiveProps<C extends ElementType> = {
  component: C;
  desktop?: Partial<ComponentProps<C>>;
  mobile?: Partial<ComponentProps<C>>;
} & Omit<ComponentProps<C>, 'component' | 'desktop' | 'mobile'>;

export function Responsive<C extends ElementType>({
  component: Component,
  desktop,
  mobile,
  children,
  ...sharedProps
}: ResponsiveProps<C>) {
  const Comp = Component as ElementType;
  const shared = sharedProps as Record<string, unknown>;

  return (
    <>
      <Comp {...shared} {...desktop} className={cx(desktopClass, shared.className as string, desktop?.className)}>
        {children}
      </Comp>
      <Comp {...shared} {...mobile} className={cx(mobileClass, shared.className as string, mobile?.className)}>
        {children}
      </Comp>
    </>
  );
}
