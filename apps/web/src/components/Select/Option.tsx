import type { ReactNode } from 'react';
import styled from 'styled-components';

import { useSelectOpenContext, useSelectValueContext } from './Root';

interface SelectOptionProps {
  value: string;
  children?: ReactNode;
}

function SelectOption({ children, value }: SelectOptionProps) {
  const { value: selectedValue, onChangeValue } = useSelectValueContext();
  const { setIsOpen } = useSelectOpenContext();

  const isSelected = selectedValue === value;

  const onClick = () => {
    onChangeValue(value);
    setIsOpen(false);
  };

  return (
    <OptionStyled onClick={onClick} $isSelected={isSelected}>
      <CheckIconWrapper className="check-icon">
        <CheckIcon />
      </CheckIconWrapper>
      <ValueWrapper>{children ?? value}</ValueWrapper>
    </OptionStyled>
  );
}

export default SelectOption;

const CheckIconWrapper = styled.div`
  position: absolute;
  left: 8px;
  top: calc(50% + 2px);

  transform: translateY(-50%);
`;

const OptionStyled = styled.div<{ $isSelected: boolean }>`
  position: relative;
  display: flex;
  padding: 6px 14px 6px 32px;
  align-items: center;
  gap: 8px;
  border-radius: 6px;

  color: rgba(0, 0, 0, 0.75);

  /* glyph14 regular */
  font-family: 'Product Sans';
  font-size: 14px;
  font-weight: 400;
  line-height: 150%; /* 21px */
  letter-spacing: -0.3px;

  transition: background 0.2s;

  ${CheckIconWrapper} {
    display: none;
    ${({ $isSelected }) => $isSelected && 'display: block;'}
  }

  ${({ $isSelected }) => $isSelected && `  background: rgba(0, 0, 0, 0.05); `}
`;

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

function CheckIcon() {
  return (
    <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.06484 15.4664C6.86484 15.4664 6.66484 15.3997 6.53151 15.1997L3.46484 12.1331C3.13151 11.7997 3.13151 11.3331 3.46484 10.9997C3.79818 10.6664 4.26484 10.6664 4.59818 10.9997L7.06484 13.4664L11.4648 9.06641C11.7982 8.73307 12.2648 8.73307 12.5982 9.06641C12.9315 9.39974 12.9315 9.86641 12.5982 10.1997L7.66484 15.1331C7.46484 15.3997 7.26484 15.4664 7.06484 15.4664V15.4664Z"
        fill="#888888"
      />
    </svg>
  );
}
