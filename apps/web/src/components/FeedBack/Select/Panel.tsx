import type { PropsWithChildren } from 'react';
import React from 'react';
import styled from 'styled-components';

import { useSelectOpenContext } from './Root';

function SelectPanel({ children }: PropsWithChildren) {
  const { isOpen } = useSelectOpenContext();

  return <PanelStyled $isOpen={isOpen}>{children}</PanelStyled>;
}

export default SelectPanel;

const PanelStyled = styled.div<{ $isOpen: boolean }>`
  border-radius: 8px;
  padding: 6px 8px;

  border: 1px solid rgba(0, 0, 0, 0.1);
  background: var(--gray-color-gray-05, #fbfbfb);
  box-shadow: 0px 2px 4px 0px rgba(51, 50, 54, 0.06);

  position: absolute;

  ${({ $isOpen }) => ($isOpen ? 'display:block' : `display: none;`)}
`;
