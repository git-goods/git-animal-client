import { Flex } from '_panda/jsx';

import { OrderTypeSelect, useOrderTypeSelect } from './OrderTypeSelect';
import { SortDirectionSelect, useSortDirectionSelect } from './SortDirectionSelect';

export function useSortSelect() {
  const { orderType, setOrderType } = useOrderTypeSelect();
  const { sortDirection, setSortDirection } = useSortDirectionSelect();

  const sortOptions = {
    orderType,
    sortDirection,
  };

  const SortElement = () => {
    return (
      <Flex gap="4px" alignItems="center">
        <OrderTypeSelect onSelect={(option) => setOrderType(option)} />
        <SortDirectionSelect onSelect={(option) => setSortDirection(option)} />
      </Flex>
    );
  };

  return { SortElement, sortOptions };
}
