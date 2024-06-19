import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';
import styled from 'styled-components';

interface SelectOpenContextProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface SelectValueContextProps {
  value?: string;
  onChangeValue: (value?: string) => void;
}

const SelectOpenContext = createContext<SelectOpenContextProps>({
  isOpen: false,
  setIsOpen: () => {},
});

const SelectValueContext = createContext<SelectValueContextProps>({
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

  const valueValues = {
    value,
    onChangeValue: (value?: string) => {
      setValue(value);
    },
  };

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
  position: relative;
  width: fit-content;
  min-width: 190px;
`;

export const useSelectOpenContext = () => {
  const context = useContext(SelectOpenContext);
  if (!context) {
    throw new Error('useSelectOpenContext must be used within a Select');
  }

  return context;
};

export const useSelectValueContext = () => {
  const context = useContext(SelectValueContext);
  if (!context) {
    throw new Error('useSelectValueContext must be used within a Select');
  }

  return context;
};
