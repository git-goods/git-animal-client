import React from 'react';
import { center } from '_panda/patterns';

type SelectOptionItem<T> = {
  label: string;
  value: T;
};

export function SelectOption<T extends string>({
  onSelect,
  options,
}: {
  onSelect: (select: T) => void;
  options: SelectOptionItem<T>[];
}) {
  return (
    <select className={selectStyle} onChange={(e) => onSelect(e.target.value as T)}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

const selectStyle = center({
  textStyle: 'glyph16.regular',
  color: 'white.white_90',
  width: 'fit-content',
  height: '36px',
  // TODO: 화살표 커스텀
  padding: '6px 8px',
  borderRadius: 10,
  backgroundColor: 'white.white_25',
});
