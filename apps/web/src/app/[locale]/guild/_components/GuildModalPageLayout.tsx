import type { PropsWithChildren } from 'react';
import { dialogTitleStyle } from '@gitanimals/ui-panda';
import { cn } from '@gitanimals/ui-tailwind';
import { XIcon } from 'lucide-react';

import { BackTrigger } from '@/components/Trigger';

export function GuildModalPageLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-full flex justify-center items-center">
      <div className="max-w-[880px] mx-auto bg-gray-150 p-[40px] rounded-[16px] text-white w-full relative mobile:p-5 mobile:rounded-none">
        <BackTrigger className="absolute top-[16px] right-[16px]">
          <XIcon />
        </BackTrigger>
        <div className="flex flex-col gap-[24px]">{children}</div>
      </div>
    </div>
  );
}

export const GuildModalPageTitle = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <h2 className={cn(dialogTitleStyle, className)}>{children}</h2>
);
