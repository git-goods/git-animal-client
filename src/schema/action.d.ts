export interface PersonaSchema {
  personaId: string;
  personaType: string;
  personaLevel: number;
}

export interface Product {
  id: string;
  sellerId: string;
  persona: PersonaSchema;
  price: string;
  paymentState: string;
}
