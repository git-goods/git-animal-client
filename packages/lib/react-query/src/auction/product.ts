import {
  buyProduct,
  BuyProductRequest,
  BuyProductResponse,
  changeProduct,
  ChangeProductRequest,
  ChangeProductResponse,
  deleteProduct,
  DeleteProductResponse,
} from '@gitanimals/api';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useDeleteProduct = (options?: UseMutationOptions<DeleteProductResponse, unknown, string>) =>
  useMutation<DeleteProductResponse, unknown, string>({
    mutationFn: deleteProduct,
    ...options,
  });

export const useChangeProductPrice = (
  options?: UseMutationOptions<ChangeProductResponse, unknown, ChangeProductRequest>,
) =>
  useMutation<ChangeProductResponse, unknown, ChangeProductRequest>({
    mutationFn: changeProduct,
    ...options,
  });

export const useBuyProduct = (options?: UseMutationOptions<BuyProductResponse, unknown, BuyProductRequest>) =>
  useMutation<BuyProductResponse, unknown, BuyProductRequest>({
    mutationFn: buyProduct,
    ...options,
  });
