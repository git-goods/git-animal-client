'use client';

import { createContext, useContext, useState } from 'react';

const SelecableListContext = createContext<{
  selected: string | null;
  onChange: (value: string) => void;
}>({
  selected: null,
  onChange: () => {},
});

const useSelecableListContext = () => {
  const context = useContext(SelecableListContext);
  if (!context) {
    throw new Error('useSelecableList must be used within a SelecableList');
  }
  return context;
};

interface SelecableListProps {
  name: string;
  children: React.ReactNode;
  className?: string;
}

export function SelecableList(props: SelecableListProps) {
  const [value, setValue] = useState<string | null>(null);

  const contextValue = {
    selected: value,
    onChange: (value: string) => setValue(value),
  };

  return (
    <SelecableListContext.Provider value={contextValue}>
      <input type="text" name={props.name} className="display-none" />
      {props.children}
    </SelecableListContext.Provider>
  );
}

interface SelecableListOptionProps {
  className?: string;
  children: React.ReactNode | ((props: { isSelected: boolean }) => React.ReactNode);
  value: string;
}

export function SelecableListOption(props: SelecableListOptionProps) {
  const { selected, onChange } = useSelecableListContext();

  return (
    <button className={props.className} onClick={() => onChange(props.value)}>
      {typeof props.children === 'function' ? props.children({ isSelected: selected === props.value }) : props.children}
    </button>
  );
}
