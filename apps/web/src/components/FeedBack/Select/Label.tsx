import type { ReactNode } from 'react';
import styled from 'styled-components';

import { useSelectOpenContext, useSelectValueContext } from './Root';

interface SelectLabelProps {
  placeholder?: string;
  children?: React.ReactNode | (({ value }: { value: string }) => ReactNode);
}

function SelectLabel(props: SelectLabelProps) {
  const { value: selectedValue } = useSelectValueContext();
  const { isOpen, setIsOpen } = useSelectOpenContext();

  if (!selectedValue)
    return (
      <Placeholder $isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)}>
        {props.placeholder}
      </Placeholder>
    );

  return (
    <Label $isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)}>
      {typeof props.children === 'function' ? props.children({ value: selectedValue }) : props.children}
    </Label>
  );
}

export default SelectLabel;

const Label = styled.div<{ $isOpen: boolean }>`
  display: flex;
  padding: 14px 14px 14px 20px;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: transparent;

  color: rgba(0, 0, 0, 0.75);
  /* glyph16 regular */
  font-family: 'Product Sans';
  font-size: 16px;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: -0.3px;

  ${({ $isOpen }) => $isOpen && `border: 1px solid #00894d; `}
`;

const Placeholder = styled(Label)`
  color: rgba(0, 0, 0, 0.5);
`;
