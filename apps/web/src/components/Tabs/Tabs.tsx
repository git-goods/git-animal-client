import type { PropsWithChildren } from 'react';
import { createContext, useContext, useState } from 'react';

interface TabsContextProps {
  value: string;
  handleChangeValue: (value: string) => void;
}

interface TabsProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

function Tabs({ children, value, defaultValue, onValueChange }: PropsWithChildren<TabsProps>) {
  const [selected, setSelected] = useState<string>(value || defaultValue || '');

  const handleChangeSelected = (value: string) => {
    setSelected(value);
    onValueChange?.(value);
  };

  return (
    <TabsContext.Provider value={{ value: selected, handleChangeValue: handleChangeSelected }}>
      {children}
    </TabsContext.Provider>
  );
}

export default Tabs;

const TabsContext = createContext<TabsContextProps>({
  value: '',
  handleChangeValue: () => {},
});

export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabsContext must be used within a Tabs');
  }
  return context;
};
