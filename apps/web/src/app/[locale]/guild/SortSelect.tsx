'use client';

import { CombineChip } from '@gitanimals/ui-panda';

const options = [{ label: 'Random', value: 'Random' }];

type OptionType = (typeof options)[number]['value'];

export function SortSelect() {
  const onSelect = (value: OptionType) => {
    console.log(value);
  };

  return (
    <CombineChip defaultValue={options[0].value} onValueChange={(value) => onSelect(value as OptionType)}>
      <CombineChip.Trigger>
        <CombineChip.Value />
      </CombineChip.Trigger>
      <CombineChip.Content>
        {options.map((option) => (
          <CombineChip.Item key={option.value} value={option.value}>
            {option.label}
          </CombineChip.Item>
        ))}
      </CombineChip.Content>
    </CombineChip>
  );
}
