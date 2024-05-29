import React from 'react';

import { useMySellHistory } from '@/apis/auctions/useGetHistory';

import ShopTable from './ShopTable';

function HistoryTable() {
  const { data } = useMySellHistory();
  console.log('data: ', data);

  return <ShopTable list={data?.products ?? []} />;
}

export default HistoryTable;
