import styled from 'styled-components';

import { useSelectOpenContext, useSelectValueContext } from './Root';

function SelectLabel(props: { placeholder?: string }) {
  const { value: selectedValue } = useSelectValueContext();
  const { isOpen, setIsOpen } = useSelectOpenContext();

  return (
    <Label $isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)}>
      {selectedValue ? <div>{selectedValue}</div> : <Placeholder>{props.placeholder}</Placeholder>}
    </Label>
  );
}

export default SelectLabel;

const Label = styled.div<{ $isOpen: boolean }>`
  display: flex;
  padding: 14px 14px 13px 20px;
  align-items: flex-start;
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

const Placeholder = styled.div`
  color: rgba(0, 0, 0, 0.5);
`;
