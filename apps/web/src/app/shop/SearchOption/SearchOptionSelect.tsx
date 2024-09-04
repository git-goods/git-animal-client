import React from 'react';
import { center } from '_panda/patterns';

import DottedThreeBox from '@/components/DottedBox/DottedThreeBox';

function SearchOptionSelect({
  onSelect,
  options,
  size,
}: {
  onSelect: (orderType: string) => void;
  options: { label: string; value: string }[];
  size: number;
}) {
  return (
    <DottedThreeBox width={size} height={54} bgColor="white">
      <select className={selectStyle} onChange={(e) => onSelect(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </DottedThreeBox>
  );
}
export default SearchOptionSelect;

const selectStyle = center({
  width: '100%',
  height: '100%',
  padding: '0 8px',
  border: 'none',
  backgroundColor: 'transparent',
  outline: 'none',
});
