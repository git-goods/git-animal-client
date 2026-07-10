import type { PropsWithChildren } from 'react';
import { cn } from '@gitanimals/ui-tailwind';

import { useSelectOpenContext } from './Root';

function SelectPanel({ children }: PropsWithChildren) {
  const { isOpen } = useSelectOpenContext();

  return (
    <div
      className={cn(
        "invisible absolute left-0 right-0 top-full z-floating rounded-[8px] border border-solid border-[rgba(0,0,0,0.1)] bg-[var(--gray-color-gray-05,#fbfbfb)] px-[8px] py-[6px] opacity-0 shadow-[0px_2px_4px_0px_rgba(51,50,54,0.06)] transition-all duration-200 [&.open]:visible [&.open]:opacity-100",
        isOpen && 'open',
      )}
    >
      {children}
    </div>
  );
}

export default SelectPanel;
