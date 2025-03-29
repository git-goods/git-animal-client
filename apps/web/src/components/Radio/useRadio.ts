import { useState } from 'react';

type RadioItem<T> = {
  label: string;
  value: T;
};

interface Arguments<T> {
  options: RadioItem<T>[];
  initialSelectedValue?: T;
}

const useRadio = <T>({ options, initialSelectedValue }: Arguments<T>) => {
  const [selected, setSelected] = useState<T>(initialSelectedValue ?? options[0].value);

  const handleChange = (value: T) => {
    setSelected(value);
  };

  const radioItemProps = options.map((option) => ({
    value: option.value,
    label: option.label,
  }));

  return { selected, setSelected, radioItemProps, handleChange };
};

export default useRadio;
