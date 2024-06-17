import type { PropsWithChildren } from 'react';
import React from 'react';
import styled from 'styled-components';

function SelectPanel(props: PropsWithChildren) {
  return <div>SelectPanel</div>;
}

export default SelectPanel;
const Panel = styled.div`
  border-radius: 8px;
  padding: 6px 8px;

  border: 1px solid rgba(0, 0, 0, 0.1);
  background: var(--gray-color-gray-05, #fbfbfb);
  box-shadow: 0px 2px 4px 0px rgba(51, 50, 54, 0.06);
`;
