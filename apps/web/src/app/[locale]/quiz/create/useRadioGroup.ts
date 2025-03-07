import { useState } from 'react';

type RadioItem<T> = {
  label: string;
  value: T;
};

interface Arguments<T> {
  options: RadioItem<T>[];
  initalSelectedValue?: T;
}

const useRadioGroup = <T>({ options, initalSelectedValue }: Arguments<T>) => {
  const [selected, setSelected] = useState<T | null>(initalSelectedValue ?? options[0].value);

  const handleSelect = (value: T) => {
    setSelected(value);
  };

  const radioItemProps = options.map((option) => ({
    selected: option.value === selected,
    value: option.value,
    label: option.label,
    onSelect: () => handleSelect(option.value),
  }));

  return { selected, setSelected, radioItemProps };
};

export default useRadioGroup;
