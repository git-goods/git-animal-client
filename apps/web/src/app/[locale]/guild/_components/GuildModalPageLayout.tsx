import type { PropsWithChildren } from 'react';
import { css, cx } from '_panda/css';
import { Flex } from '_panda/jsx';
import { dialogTitleStyle } from '@gitanimals/ui-panda';

export function GuildModalPageLayout({ children }: PropsWithChildren) {
  return (
    <div className={css({ minH: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' })}>
      <div
        className={css({
          maxWidth: '880px',
          mx: 'auto',
          background: 'gray.gray_150',
          px: '40px',
          py: '60px',
          borderRadius: '16px',
          color: 'white.white',
          w: '100%',
        })}
      >
        <Flex flexDirection="column" gap="24px">
          {children}
        </Flex>
      </div>
    </div>
  );
}

export const GuildModalPageTitle = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <h2 className={cx(dialogTitleStyle, className)}>{children}</h2>
);
