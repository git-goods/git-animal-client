import type { ComponentProps, ElementType } from 'react';
import { cn } from '@gitanimals/ui-tailwind/utils';

const desktopClass = 'block max-mobile:hidden';
const mobileClass = 'hidden max-mobile:block';

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
      <Comp {...shared} {...desktop} className={cn(desktopClass, shared.className as string, desktop?.className)}>
        {children}
      </Comp>
      <Comp {...shared} {...mobile} className={cn(mobileClass, shared.className as string, mobile?.className)}>
        {children}
      </Comp>
    </>
  );
}
