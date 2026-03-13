/**
 * Shared test fixtures for the home feature
 */

import type { Product } from '../types';

export const mockProductInStock: Product = {
  id: '1',
  name: 'Redux Toolkit Paketi',
  description: 'State yönetimini kolaylaştıran kapsamlı bir paket.',
  price: 299.99,
  imageUrl: 'https://example.com/image1.jpg',
  category: 'Yazılım',
  inStock: true,
};

export const mockProductOutOfStock: Product = {
  id: '2',
  name: 'React Native Paper Teması',
  description: 'Material Design 3 tabanlı UI bileşen seti.',
  price: 149.99,
  imageUrl: undefined,
  category: 'UI/UX',
  inStock: false,
};

export const mockProductList: Product[] = [
  mockProductInStock,
  mockProductOutOfStock,
  {
    id: '3',
    name: 'TypeScript Kütüphanesi',
    description: 'Gelişmiş TypeScript yardımcıları.',
    price: 99.5,
    imageUrl: 'https://example.com/image3.jpg',
    category: 'Yazılım',
    inStock: true,
  },
];
