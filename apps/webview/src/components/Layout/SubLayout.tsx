'use client';

import { css, cx } from '_panda/css';
import { ChevronLeftIcon } from 'lucide-react';

import { useRouter } from '@/i18n/routing';
import { containerStyle } from '@/styles/layout';

export const SubLayout = ({ children, title }: { children: React.ReactNode; title: string }) => {
  const router = useRouter();

  return (
    <div
      className={cx(
        containerStyle,
        css({
          h: '100vh',
          backgroundColor: 'black',
          color: 'white',
        }),
      )}
    >
      <div
        className={cx(
          containerStyle,
          css({
            position: 'fixed',
            height: 'var(--mobile-sub-header-height)',
            width: '100%',
            zIndex: 101,
            top: 0,
            left: 0,
            right: 0,
            minHeight: '44px',
            display: 'grid',
            gridTemplateColumns: '24px 1fr 24px',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 4,
          }),
        )}
      >
        <button onClick={() => router.back()}>
          <ChevronLeftIcon size={24} color="white" />
        </button>
        <h1
          className={css({
            textStyle: 'glyph18.bold',
            color: 'white',
            textAlign: 'center',
          })}
        >
          {title}
        </h1>
      </div>
      <div className={css({ minH: 'var(--mobile-sub-header-height)', w: '100%' })}></div>

      <div
        className={css({
          padding: '16px',
          h: 'calc(100vh - var(--mobile-sub-header-height))',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        })}
      >
        {children}
      </div>
    </div>
  );
};

export function BottomButton({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div
        className={cx(
          containerStyle,
          css({
            position: 'fixed',
            bottom: '-34px',
            zIndex: 99,
            left: 0,
            pointerEvents: 'none',
            right: 0,
            bg: 'linear-gradient(180deg, rgba(24, 26, 29, 0) 0%, #181A1D 50%)',
            height: '160px',
          }),
        )}
      />
      <div
        className={cx(
          containerStyle,
          css({
            position: 'fixed',
            bottom: 0,
            width: '100%',
            zIndex: 100,
            px: 4,
            py: 2,
            left: 0,
            right: 0,
          }),
        )}
      >
        {children}
      </div>
    </div>
  );
}
