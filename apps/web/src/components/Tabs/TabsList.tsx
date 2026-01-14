import type { ComponentProps, PropsWithChildren } from 'react';
import { cn } from '@gitanimals/ui-tailwind';

interface TabsListProps extends ComponentProps<'div'> {
  gap?: string;
  width?: string;
}

const TabsList = ({ children, gap = '6px', width = '100%', className, style, ...props }: PropsWithChildren<TabsListProps>) => {
  return (
    <div
      className={cn('flex', className)}
      style={{ gap, width, ...style }}
      {...props}
    >
      {children}
    </div>
  );
};

export default TabsList;
