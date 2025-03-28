import { useState } from 'react';

type RadioItem<T> = {
  label: string;
  value: T;
};

interface Arguments<T> {
  options: RadioItem<T>[];
  initialSelectedValue?: T;
}

const useRadioGroup = <T>({ options, initialSelectedValue }: Arguments<T>) => {
  const [selected, setSelected] = useState<T | null>(initialSelectedValue ?? options[0].value);

  const handleClick = (value: T) => {
    setSelected(value);
  };

  const radioItemProps = options.map((option) => ({
    selected: option.value === selected,
    value: option.value,
    label: option.label,
    onClick: () => handleClick(option.value),
  }));

  return { selected, setSelected, radioItemProps };
};

export default useRadioGroup;
