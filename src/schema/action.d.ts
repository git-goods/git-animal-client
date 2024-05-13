export interface PersonaSchema {
  personaId: string;
  personaType: string;
  personaLevel: number;
}

export type ProductStatusType = 'ON_SALE' | 'SOLD_OUT';

export interface Product {
  id: string;
  sellerId: string;
  persona: PersonaSchema;
  price: string;
  paymentState: ProductStatusType;
}
