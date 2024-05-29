import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ProductHistorySchema } from '@/schema/action';

import { get } from '..';

interface GetHistoryRequest {
  lastId?: string;
  personaType?: string;
  count?: number;
}

interface GetHistoryResponse {
  products: ProductHistorySchema[];
}

const getHistory = async <T = GetHistoryResponse>(request?: GetHistoryRequest): Promise<T> =>
  get('/auctions/products/histories', { params: request });

export const getHistoryQueryKey = (request?: GetHistoryRequest) => ['history', request];

export const useGetHistory = <T = GetHistoryResponse>(
  request?: GetHistoryRequest,
  option?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<T>({
    queryKey: getHistoryQueryKey(request),
    queryFn: () => getHistory(request),
    ...option,
  });
};

export const HISTORY_DUMMY_DATA: GetHistoryResponse = {
  products: [
    {
      id: '1',
      sellerId: '1',
      persona: {
        personaId: '1',
        personaType: 'PENGUIN',
        personaLevel: 1,
      },
      price: '1000',
      paymentState: 'SOLD_OUT',
      receipt: {
        buyerId: '12345677123123123123',
        soldAt: '2024-05-06T12:30:45Z',
      },
    },
    {
      id: '2',
      sellerId: '1',
      persona: {
        personaId: '1',
        personaType: 'CAT',
        personaLevel: 1,
      },
      price: '1000',
      paymentState: 'SOLD_OUT',
      receipt: {
        buyerId: '12345677123123123123',
        soldAt: '2024-05-06T12:30:45Z',
      },
    },
    {
      id: '3',
      sellerId: '1',
      persona: {
        personaId: '1',
        personaType: 'WHITE_CAT',
        personaLevel: 1,
      },
      price: '1000',
      paymentState: 'SOLD_OUT',
      receipt: {
        buyerId: '12345677123123123123',
        soldAt: '2024-05-06T12:30:45Z',
      },
    },
  ],
};
