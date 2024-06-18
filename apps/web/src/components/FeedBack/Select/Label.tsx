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

  return (
    <Label $isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)}>
      {!selectedValue && <Placeholder>{props.placeholder}</Placeholder>}
      {selectedValue &&
        (typeof props.children === 'function' ? props.children({ value: selectedValue }) : props.children)}
      <ArrowIcon />
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

  .arrow-icon {
    position: absolute;
    right: 14px;
    top: 0;
    bottom: 0;
    margin: auto;
    transition: transform 0.2s;
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  }
`;

const Placeholder = styled.div`
  color: rgba(0, 0, 0, 0.5);
`;

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="arrow-icon"
    >
      <path
        d="M6.3664 7.93589L9.77807 4.09589C10.0538 3.78553 9.83002 3.2998 9.41128 3.2998H2.58794C2.1692 3.2998 1.94541 3.78553 2.22115 4.09589L5.63282 7.93589C5.827 8.15444 6.17222 8.15444 6.3664 7.93589Z"
        fill="black"
      />
    </svg>
  );
}
