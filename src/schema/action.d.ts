export interface PersonaSchema {
  personaId: string;
  personaType: string;
  personaLevel: number;
}

export type ProductStatusSchema = 'ON_SALE' | 'SOLD_OUT' | 'SELL'; // server에서 사용하는 type

export type ProductStatusType = 'ON_SALE' | 'SOLD_OUT' | 'SELL' | 'MY_SELLING' | 'SELL_HISTORY' | 'EDIT';

export interface ProductType<PaymentStatus extends ProductStatusType = ProductStatusType> {
  id: string;
  sellerId: string;
  persona: PersonaSchema;
  price: string;
  paymentState: PaymentStatus;
}

export interface ProductSchema {
  id: string;
  sellerId: string;
  persona: PersonaSchema;
  price: string;
  paymentState: ProductStatusSchema;
}

export interface ProductHistoryType extends ProductType {
  receipt: {
    buyerId: string;
    soldAt: string;
  };
}

export interface ProductHistorySchema extends ProductSchema {
  receipt: {
    buyerId: string;
    soldAt: string;
  };
}

export type ProductItemType = ProductType | ProductHistoryType;
