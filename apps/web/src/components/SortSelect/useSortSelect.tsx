import { cn } from '@gitanimals/ui-tailwind/utils';

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
      <div className="flex gap-1 items-center">
        <OrderTypeSelect onSelect={(option) => setOrderType(option)} />
        <SortDirectionSelect onSelect={(option) => setSortDirection(option)} />
      </div>
    );
  };

  return { SortElement, sortOptions };
}
