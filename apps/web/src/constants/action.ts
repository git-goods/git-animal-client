import type { ProductStatusType } from '@/schema/action';

export const ACTION_BUTTON_OBJ: Record<
  ProductStatusType,
  {
    label: string;
    color: string;
  }
> = {
  ON_SALE: {
    label: 'buy!',
    color: '#00B2FF',
  },
  SOLD_OUT: {
    label: 'cancel!',
    color: '#FF0000',
  },
  MY_SELLING: {
    label: 'cancel!',
    color: '#FF0000',
  },
  SELL: {
    label: 'sell!',
    color: '#00B2FF',
  },
  SELL_HISTORY: {
    label: 'input label here!',
    color: '#FC899A',
  },
  EDIT: {
    label: 'edit!',
    color: '#00B2FF',
  },
};
