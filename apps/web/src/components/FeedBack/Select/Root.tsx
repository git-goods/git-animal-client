import type { PropsWithChildren } from 'react';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

interface SelectOpenContextProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface SelectValueContextProps {
  value?: string;
  onChangeValue: (value?: string) => void;
}

const SelectOpenContext = React.createContext<SelectOpenContextProps>({
  isOpen: false,
  setIsOpen: () => {},
});

const SelectValueContext = React.createContext<SelectValueContextProps>({
  value: undefined,
  onChangeValue: () => {},
});

function SelectRoot(props: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<string | undefined>(undefined);

  const openValues = useMemo(
    () => ({
      isOpen,
      setIsOpen,
    }),
    [isOpen],
  );

  const valueValues = useMemo(
    () => ({
      value,
      onChangeValue: (value?: string) => {
        setValue(value);
      },
    }),
    [value],
  );

  return (
    <SelectOpenContext.Provider value={openValues}>
      <SelectValueContext.Provider value={valueValues}>
        <Container>{props.children}</Container>
      </SelectValueContext.Provider>
    </SelectOpenContext.Provider>
  );
}

export default SelectRoot;

const Container = styled.div`
  width: fit-content;
`;

export const useSelectOpenContext = () => {
  const context = React.useContext(SelectOpenContext);
  if (!context) {
    throw new Error('useSelectOpenContext must be used within a Select');
  }

  return context;
};

export const useSelectValueContext = () => {
  const context = React.useContext(SelectValueContext);
  if (!context) {
    throw new Error('useSelectValueContext must be used within a Select');
  }

  return context;
};
