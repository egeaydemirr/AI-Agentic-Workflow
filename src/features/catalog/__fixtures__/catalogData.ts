/**
 * Catalog fixture data
 */

import type {
  CatalogCategory,
  CatalogProduct,
  CatalogSortOptionItem,
} from '../types';

export const catalogCategories: CatalogCategory[] = [
  { id: 'all', name: 'Tümü' },
  { id: 'phone', name: 'Telefon' },
  { id: 'laptop', name: 'Bilgisayar' },
  { id: 'tablet', name: 'Tablet' },
  { id: 'accessory', name: 'Aksesuar' },
];

export const catalogSortOptions: CatalogSortOptionItem[] = [
  { id: 'recommended', label: 'Önerilen' },
  { id: 'price-asc', label: 'Fiyat (Artan)' },
  { id: 'price-desc', label: 'Fiyat (Azalan)' },
  { id: 'name-asc', label: 'İsim (A-Z)' },
];

export const catalogProducts: CatalogProduct[] = [
  {
    id: 'cat-1',
    name: 'iPhone 15 Pro',
    description: 'A17 Pro işlemci, güçlü kamera sistemi.',
    price: 54999,
    categoryId: 'phone',
    categoryName: 'Telefon',
    inStock: true,
    rating: 4.8,
    imageUrl:
      'https://via.placeholder.com/300x300/007AFF/FFFFFF?text=iPhone+15+Pro',
  },
  {
    id: 'cat-2',
    name: 'Galaxy S24',
    description: 'Galaxy AI özellikleri ile yeni nesil deneyim.',
    price: 42999,
    categoryId: 'phone',
    categoryName: 'Telefon',
    inStock: true,
    rating: 4.6,
    imageUrl:
      'https://via.placeholder.com/300x300/1428A0/FFFFFF?text=Galaxy+S24',
  },
  {
    id: 'cat-3',
    name: 'MacBook Pro 14',
    description: 'M3 çip ile profesyonel performans.',
    price: 89999,
    categoryId: 'laptop',
    categoryName: 'Bilgisayar',
    inStock: true,
    rating: 4.9,
    imageUrl:
      'https://via.placeholder.com/300x300/8E8E93/FFFFFF?text=MacBook+Pro',
  },
  {
    id: 'cat-4',
    name: 'iPad Air',
    description: 'Taşınabilir güç ve Apple Pencil desteği.',
    price: 27999,
    categoryId: 'tablet',
    categoryName: 'Tablet',
    inStock: true,
    rating: 4.5,
    imageUrl: 'https://via.placeholder.com/300x300/5AC8FA/FFFFFF?text=iPad+Air',
  },
  {
    id: 'cat-5',
    name: 'AirPods Pro',
    description: 'Aktif gürültü engelleme ve şeffaf mod.',
    price: 9999,
    categoryId: 'accessory',
    categoryName: 'Aksesuar',
    inStock: false,
    rating: 4.4,
    imageUrl:
      'https://via.placeholder.com/300x300/F59E0B/FFFFFF?text=AirPods+Pro',
  },
  {
    id: 'cat-6',
    name: 'Magic Keyboard',
    description: 'Konforlu yazım deneyimi ve kompakt tasarım.',
    price: 5499,
    categoryId: 'accessory',
    categoryName: 'Aksesuar',
    inStock: true,
    rating: 4.2,
    imageUrl:
      'https://via.placeholder.com/300x300/10B981/FFFFFF?text=Magic+Keyboard',
  },
];

export const catalog2Tabs = ['T-shirts', 'Crop tops', 'Sleeveless', 'Shirts'];

export const catalog2FilterChips = ['Filters', 'Price: lowest to high'];

export const catalog2Products: CatalogProduct[] = [
  {
    id: 'figma-1',
    brand: 'Mango',
    name: 'T-Shirt SPANISH',
    description: 'Printed cotton shirt',
    price: 9,
    oldPrice: 10,
    discountPercent: 10,
    imageUrl:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=640&q=80',
    categoryId: 'women',
    categoryName: 'Women',
    inStock: true,
    rating: 4,
    ratingCount: 10,
    isFavorite: false,
    tags: ['new'],
  },
  {
    id: 'figma-2',
    brand: 'Dorothy Perkins',
    name: 'Blouse',
    description: 'Soft fabric blouse',
    price: 14,
    oldPrice: 21,
    discountPercent: 33,
    imageUrl:
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=640&q=80',
    categoryId: 'women',
    categoryName: 'Women',
    inStock: true,
    rating: 0,
    ratingCount: 0,
    isFavorite: true,
    tags: ['sale'],
  },
  {
    id: 'figma-3',
    brand: 'LOST Ink',
    name: 'T-shirt',
    description: 'Basic fit t-shirt',
    price: 12,
    oldPrice: undefined,
    discountPercent: undefined,
    imageUrl:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=640&q=80',
    categoryId: 'women',
    categoryName: 'Women',
    inStock: true,
    rating: 5,
    ratingCount: 3,
    isFavorite: false,
    tags: ['featured'],
  },
  {
    id: 'figma-4',
    brand: 'Topshop',
    name: 'Sleeveless Top',
    description: 'Relaxed sleeveless top',
    price: 19,
    oldPrice: 24,
    discountPercent: 20,
    imageUrl:
      'https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=640&q=80',
    categoryId: 'women',
    categoryName: 'Women',
    inStock: true,
    rating: 4,
    ratingCount: 8,
    isFavorite: true,
    tags: ['sale'],
  },
  {
    id: 'figma-5',
    brand: 'Zara',
    name: 'Striped T-shirt',
    description: 'Modern striped pattern',
    price: 16,
    oldPrice: undefined,
    discountPercent: undefined,
    imageUrl:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=640&q=80',
    categoryId: 'women',
    categoryName: 'Women',
    inStock: true,
    rating: 5,
    ratingCount: 12,
    isFavorite: false,
    tags: ['new'],
  },
  {
    id: 'figma-6',
    brand: 'H&M',
    name: 'Basic V-neck',
    description: 'Essential V-neck t-shirt',
    price: 11,
    oldPrice: 13,
    discountPercent: 15,
    imageUrl:
      'https://images.unsplash.com/photo-1495121605193-b116b5b09a45?auto=format&fit=crop&w=640&q=80',
    categoryId: 'women',
    categoryName: 'Women',
    inStock: true,
    rating: 4,
    ratingCount: 5,
    isFavorite: false,
    tags: ['sale'],
  },
];
