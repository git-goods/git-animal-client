// https://api.gitanimals.org/auctions/products

import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { api } from '.';

// {
//     "products": [
//       {
//         "id": "1",
//         "sellerId": "1",
//         "persona": {
//           "personaId": "1",
//           "personaType": "PENGUIN",
//           "personaLevel": 1
//         },
//         "price": "1000",
//         "paymentState": "ON_SALE"
//       },
//       {
//         "id": "2",
//         "sellerId": "1",
//         "persona": {
//           "personaId": "1",
//           "personaType": "CAT",
//           "personaLevel": 1
//         },
//         "price": "1000",
//         "paymentState": "ON_SALE"
//       },
//       {
//         "id": "3",
//         "sellerId": "1",
//         "persona": {
//           "personaId": "1",
//           "personaType": "WHITE_CAT",
//           "personaLevel": 1
//         },
//         "price": "1000",
//         "paymentState": "ON_SALE"
//       }
//     ]
//   }

interface Product {
  id: string;
  sellerId: string;
  persona: {
    personaId: string;
    personaType: string;
    personaLevel: number;
  };
  price: string;
  paymentState: string;
}

interface GetProductsResponse {
  products: Product[];
}
interface GetProductsRequest {
  'last-id'?: string;
  'persona-type'?: string;
  count?: number;
}

//   export const useFetFollowList = (targetId: number, option?: UseQueryOptions<FollowListResponse>) => {
//     return useQuery<FollowListResponse>({
//       queryKey: getQueryKey('followList', { targetId }),
//       queryFn: () => FOLLOW_API.getFollowList(targetId),
//       ...option,
//     });
//   };

export const useGetProducts = (request: GetProductsRequest, option?: UseQueryOptions<GetProductsResponse>) => {
  return useQuery<GetProductsResponse>({
    queryKey: ['products', request],
    queryFn: async () => {
      const response = await api.get<GetProductsResponse>('/auctions/products', {
        params: request,
      });
      console.log('response: ', response);
      return response.data; // Return the 'data' property of the response
    },
    ...option,
  });
};
