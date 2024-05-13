import React from 'react';

import { useGetHistory } from '@/apis/auctions/useGetHistory';

import ShopTable from './ShopTable';

function HistoryTable() {
  const { data } = useGetHistory();

  return <ShopTable list={data?.products ?? []} />;
}

export default HistoryTable;
