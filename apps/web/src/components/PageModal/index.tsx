import type { PropsWithChildren } from 'react';
import { css, cx } from '_panda/css';
import { Flex } from '_panda/jsx';
import { dialogTitleStyle } from '@gitanimals/ui-panda';
import { XIcon } from 'lucide-react';

import { BackTrigger } from '@/components/Trigger';

export function PageModalLayout({ children }: PropsWithChildren) {
  return (
    <div className={css({ minH: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' })}>
      <div
        className={css({
          maxWidth: '880px',
          mx: 'auto',
          background: 'gray.gray_150',
          p: '40px',
          borderRadius: '16px',
          color: 'white.white',
          w: '100%',
          position: 'relative',
          _mobile: {
            minHeight: 'calc(100vh - var(--mobile-header-height))',
            borderRadius: 0,
            p: 5,
          },
        })}
      >
        <BackTrigger className={css({ position: 'absolute', top: '16px', right: '16px' })}>
          <XIcon />
        </BackTrigger>
        <Flex flexDirection="column" gap="24px">
          {children}
        </Flex>
      </div>
    </div>
  );
}

export const PageModalTitle = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <h2 className={cx(dialogTitleStyle, className)}>{children}</h2>
);
