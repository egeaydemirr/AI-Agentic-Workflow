/**
 * Home Feature Types
 */

export interface HomeData {
  id: string;
  title: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
  inStock: boolean;
}
