'use client';

import type { PropsWithChildren } from 'react';
import { createContext, useContext, useState } from 'react';
import { cn } from '@gitanimals/ui-tailwind';

const SelectableFormItemContext = createContext<{
  selected: string | null;
  onChange: (value: string) => void;
}>({
  selected: null,
  onChange: () => {},
});

const useSelectableFormItemContext = () => {
  const context = useContext(SelectableFormItemContext);
  if (!context) {
    throw new Error('useSelectableFormItem must be used within a SelectableFormItem');
  }
  return context;
};

interface SelectableFormItemProps {
  name: string;
  className?: string;
  defaultValue?: string;
}

export function SelectableFormItem(props: PropsWithChildren<SelectableFormItemProps>) {
  const [value, setValue] = useState<string | null>(props.defaultValue ?? null);

  const contextValue = {
    selected: value,
    onChange: (value: string) => setValue(value),
  };

  return (
    <SelectableFormItemContext.Provider value={contextValue}>
      <input type="text" name={props.name} className="display-none" value={value ?? ''} hidden />
      {props.children}
    </SelectableFormItemContext.Provider>
  );
}

interface SelectableFormItemOptionProps {
  className?: string;
  children: React.ReactNode | ((props: { isSelected: boolean }) => React.ReactNode);
  value: string;
}

// children render prop 은 server component 에서 쓸 수 없다.
export function SelectableFormItemOption(props: SelectableFormItemOptionProps) {
  const { selected, onChange } = useSelectableFormItemContext();

  return (
    <button
      type="button"
      className={cn('selectable-form-item-option group', props.className)}
      onClick={() => onChange(props.value)}
      data-active={selected === props.value}
    >
      {typeof props.children === 'function' ? props.children({ isSelected: selected === props.value }) : props.children}
    </button>
  );
}
