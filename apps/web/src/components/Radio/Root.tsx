import type { ComponentProps, PropsWithChildren } from 'react';
import { createContext, useContext, useState } from 'react';
import { Flex } from '_panda/jsx';

interface RadioContextProps {
  value: string;
  handleChangeValue: (value: string) => void;
}

interface RadioRootProps extends ComponentProps<typeof Flex> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

function RadioRoot({ children, value, defaultValue, onValueChange, ...props }: PropsWithChildren<RadioRootProps>) {
  const [selected, setSelected] = useState<string>(value || defaultValue || '');

  const handleChangeSelected = (value: string) => {
    setSelected(value);
    onValueChange?.(value);
  };

  return (
    <RadioContext.Provider value={{ value: selected, handleChangeValue: handleChangeSelected }}>
      <Flex gap="6px" width="100%" {...props}>
        {children}
      </Flex>
    </RadioContext.Provider>
  );
}

export default RadioRoot;

const RadioContext = createContext<RadioContextProps>({
  value: '',
  handleChangeValue: () => {},
});

export const useRadioContext = () => {
  const context = useContext(RadioContext);
  if (!context) {
    throw new Error('useRadioContext must be used within a RadioRoot');
  }
  return context;
};
