import type { PropsWithChildren } from 'react';
import { cn } from '@gitanimals/ui-tailwind/utils';

import { useSelectOpenContext } from './Root';

function SelectPanel({ children }: PropsWithChildren) {
  const { isOpen } = useSelectOpenContext();

  return (
    <div
      className={cn(
        'rounded-lg p-1.5 px-2 border border-black/10 bg-[#fbfbfb] shadow-[0px_2px_4px_0px_rgba(51,50,54,0.06)] z-floating absolute top-full left-0 right-0 transition-all invisible opacity-0',
        isOpen && 'visible opacity-100',
      )}
    >
      {children}
    </div>
  );
}

export default SelectPanel;
