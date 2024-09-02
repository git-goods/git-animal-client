import React from 'react';
import { center } from '_panda/patterns';

import DottedThreeBox from '@/components/DottedBox/DottedThreeBox';

function SearchOptionSelect({
  onSelect,
}: {
  onSelect: (orderType: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <DottedThreeBox width={110} height={54} bgColor="white">
      <select className={selectStyle} onChange={(e) => onSelect(e.target.value)}>
        <option value="PRICE">Price</option>
        <option value="CREATED_AT">Date</option>
        <option value="LEVEL">Level</option>
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
