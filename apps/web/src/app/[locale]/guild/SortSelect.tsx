'use client';

import { ChipCombine } from '@gitanimals/ui-panda';

const options = [{ label: 'Random', value: 'Random' }];

type OptionType = (typeof options)[number]['value'];

export function SortSelect() {
  const onSelect = (value: OptionType) => {
    console.log(value);
  };

  return (
    <ChipCombine defaultValue={options[0].value} onValueChange={(value) => onSelect(value as OptionType)}>
      <ChipCombine.Trigger>
        <ChipCombine.Value />
      </ChipCombine.Trigger>
      <ChipCombine.Content>
        {options.map((option) => (
          <ChipCombine.Item key={option.value} value={option.value}>
            {option.label}
          </ChipCombine.Item>
        ))}
      </ChipCombine.Content>
    </ChipCombine>
  );
}
