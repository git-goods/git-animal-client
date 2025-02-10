import type { PropsWithChildren } from 'react';
import { css, cx } from '_panda/css';

import { useSelectOpenContext } from './Root';

function SelectPanel({ children }: PropsWithChildren) {
  const { isOpen } = useSelectOpenContext();

  return <div className={cx(panelStyle, isOpen && 'open')}>{children}</div>;
}

export default SelectPanel;

const panelStyle = css({
  borderRadius: '8px',
  padding: '6px 8px',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  background: 'var(--gray-color-gray-05, #fbfbfb)',
  boxShadow: '0px 2px 4px 0px rgba(51, 50, 54, 0.06)',
  zIndex: 'floating',
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  transition: 'all 0.2s',
  visibility: 'hidden',
  opacity: 0,
  '&.open': {
    visibility: 'visible',
    opacity: 1,
  },
});
