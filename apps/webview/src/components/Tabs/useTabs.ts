import { useState } from 'react';

type TabsTriggerItem<T> = {
  label: string;
  value: T;
};

interface Arguments<T> {
  options: TabsTriggerItem<T>[];
  initialSelectedValue?: T;
}

const useTabs = <T>({ options, initialSelectedValue }: Arguments<T>) => {
  const [selected, setSelected] = useState<T>(initialSelectedValue ?? options[0].value);

  const handleChange = (value: T) => {
    setSelected(value);
  };

  const tabsTriggerProps = options.map((option) => ({
    value: option.value,
    label: option.label,
  }));

  return { selected, setSelected, tabsTriggerProps, handleChange };
};

export default useTabs;
