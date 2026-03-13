/**
 * Cart Feature Types
 */

export interface CartProductPayload {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

export interface CartItem extends CartProductPayload {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}
