import type { PropsWithChildren } from 'react';
import { cn } from '@gitanimals/ui-tailwind/utils';
import { XIcon } from 'lucide-react';

import { BackTrigger } from '@/components/Trigger';

const dialogTitleStyle = 'font-product text-glyph-48 font-bold text-white text-center max-[1200px]:text-glyph-32 max-mobile:text-glyph-24';

export function GuildModalPageLayout({ children }: PropsWithChildren) {
  return (
    <div className={cn('min-h-full flex justify-center items-center')}>
      <div
        className={cn(
          'max-w-[880px] mx-auto bg-gray-150 p-10 rounded-2xl text-white w-full relative',
          'max-mobile:p-5 max-mobile:rounded-none',
        )}
      >
        <BackTrigger className={cn('absolute top-4 right-4')}>
          <XIcon />
        </BackTrigger>
        <div className="flex flex-col gap-6">{children}</div>
      </div>
    </div>
  );
}

export const GuildModalPageTitle = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <h2 className={cn(dialogTitleStyle, className)}>{children}</h2>
);
