import type { ComponentProps } from 'react';
import { Flex } from '_panda/jsx';

interface TabsListProps extends ComponentProps<typeof Flex> {}

const TabsList = ({ children, gap = '6px', width = '100%', ...props }: TabsListProps) => {
  return (
    <Flex {...props} gap={gap} width={width}>
      {children}
    </Flex>
  );
};

export default TabsList;
