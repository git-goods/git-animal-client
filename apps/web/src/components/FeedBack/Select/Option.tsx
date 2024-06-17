import React from 'react';
import styled from 'styled-components';

import { useSelectValueContext } from './Root';

interface SelectOptionProps {
  value: string;
  children?: React.ReactNode;
}

function SelectOption({ children, value }: SelectOptionProps) {
  const { value: selectedValue, onChangeValue } = useSelectValueContext();

  const isSelected = selectedValue === value;

  return (
    <OptionStyled onClick={() => onChangeValue(value)}>
      {isSelected && (
        <CheckIconWrapper>
          <CheckIcon />
        </CheckIconWrapper>
      )}
      {children ?? value}
    </OptionStyled>
  );
}

export default SelectOption;

const OptionStyled = styled.div`
  position: relative;
  display: flex;
  padding: 6px 14px 6px 32px;
  align-items: center;
  gap: 8px;
  border-radius: var(--radius-radius-6, 6px);
  background: var(--text-black-05, rgba(0, 0, 0, 0.05));

  color: var(--text-black-75, rgba(0, 0, 0, 0.75));
  font-feature-settings:
    'clig' off,
    'liga' off;
  /* glyph14 regular */
  font-family: 'Product Sans';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
  letter-spacing: -0.3px;
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

const CheckIconWrapper = styled.div`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
`;
