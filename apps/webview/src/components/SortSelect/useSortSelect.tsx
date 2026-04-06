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
      <div className="flex items-center gap-1">
        <OrderTypeSelect onSelect={(option) => setOrderType(option)} />
        <SortDirectionSelect onSelect={(option) => setSortDirection(option)} />
      </div>
    );
  };

  return { SortElement, sortOptions };
}
