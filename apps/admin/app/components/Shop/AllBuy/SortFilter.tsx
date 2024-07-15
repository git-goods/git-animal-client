import { Link } from '@remix-run/react';
import { GetProductsRequest } from '@gitanimals/api';
import { Button } from '@/components/ui/button';
import { Grid } from '_panda/jsx';

const SORT_OPTION: {
  label: string;
  options?: Partial<GetProductsRequest>;
}[] = [
  {
    label: '오래된 순',
    options: { sortDirection: 'ASC', orderType: 'CREATED_AT' },
  },
  {
    label: '가격 낮은 순',
    options: { orderType: 'PRICE', sortDirection: 'ASC' },
  },
  {
    label: '가격 높은 순',
    options: { orderType: 'PRICE', sortDirection: 'DESC' },
  },
];

const PAGE_SIZE = [20, 40, 100];

function SortFilter({ tableParams }: { tableParams: Record<string, string> }) {
  return (
    <Grid w="full" gridTemplateColumns="3">
      {SORT_OPTION.map((option) => (
        <Link
          key={option.label}
          to={getNewTableUrl({ baseUrl: '/shop/all-buy', newParams: option.options ?? {}, oldParams: tableParams })}
        >
          <Button variant="outline" size="sm" w="full">
            {option.label}
          </Button>
        </Link>
      ))}

      {PAGE_SIZE.map((size) => (
        <Link
          key={size}
          to={getNewTableUrl({ baseUrl: '/shop/all-buy', newParams: { count: size }, oldParams: tableParams })}
        >
          <Button variant="outline" size="sm" w="full">
            {size}개씩
          </Button>
        </Link>
      ))}
    </Grid>
  );
}

export default SortFilter;

const getNewTableUrl = ({
  baseUrl,
  newParams,
  oldParams = {},
}: {
  baseUrl: string;
  oldParams?: Record<string, unknown>;
  newParams: Record<string, unknown>;
}) => {
  let params = new URLSearchParams();

  for (const [key, value] of Object.entries({ ...oldParams, ...newParams })) {
    params.append(key, String(value));
  }

  return `${baseUrl}?${params.toString()}`;
};
