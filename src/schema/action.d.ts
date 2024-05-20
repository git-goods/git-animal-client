export interface PersonaSchema {
  personaId: string;
  personaType: string;
  personaLevel: number;
}

export type ProductStatusType = 'ON_SALE' | 'SOLD_OUT' | 'SELL';

export interface Product {
  id: string;
  sellerId: string;
  persona: PersonaSchema;
  price: string;
  paymentState: ProductStatusType;
}

export interface ProductSchema {
  id: string;
  sellerId: string;
  persona: PersonaSchema;
  price: string;
  paymentState: ProductStatusType;
}

export interface ProductHistorySchema extends ProductSchema {
  receipt: {
    buyerId: string;
    soldAt: string;
  };
}
