/**
 * ProductList Integration Tests
 *
 * Tests the full product list behavior including all states
 * (loading, success, empty, error) and user interactions.
 */

import { fireEvent, render, screen } from '@testing-library/react-native';
import {
  mockProductInStock,
  mockProductList,
  mockProductOutOfStock,
} from '../../__fixtures__/products';
import type { Product } from '../../types';
import { ProductList } from '../ProductList';

const defaultProps: {
  products: Product[];
  loading: boolean;
  isError: boolean;
  onRetry: jest.Mock;
  onProductPress: jest.Mock;
  onRefresh: jest.Mock;
  isRefreshing: boolean;
} = {
  products: [],
  loading: false,
  isError: false,
  onRetry: jest.fn(),
  onProductPress: jest.fn(),
  onRefresh: jest.fn(),
  isRefreshing: false,
};

const renderList = (overrides: Partial<typeof defaultProps> = {}) =>
  render(<ProductList {...defaultProps} {...overrides} />);

describe('ProductList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading state', () => {
    it('renders skeleton when loading=true', () => {
      renderList({ loading: true });
      expect(screen.getByLabelText('Ürünler yükleniyor...')).toBeTruthy();
    });

    it('does NOT render the "Ürünler" title when loading', () => {
      renderList({ loading: true });
      expect(screen.queryByText('Ürünler')).toBeNull();
    });

    it('does NOT render product cards when loading', () => {
      renderList({ loading: true, products: mockProductList });
      expect(screen.queryByText(mockProductInStock.name)).toBeNull();
    });

    it('does NOT render the skeleton when loading=false', () => {
      renderList({ loading: false });
      expect(screen.queryByLabelText('Ürünler yükleniyor...')).toBeNull();
    });
  });

  describe('Success state', () => {
    it('renders the "Ürünler" section title', () => {
      renderList({ products: mockProductList });
      expect(screen.getByText('Ürünler')).toBeTruthy();
    });

    it('renders each product name in the list', () => {
      renderList({ products: mockProductList });
      for (const product of mockProductList) {
        expect(screen.getByText(product.name)).toBeTruthy();
      }
    });

    it('renders product categories', () => {
      renderList({ products: [mockProductInStock] });
      expect(screen.getByText(mockProductInStock.category)).toBeTruthy();
    });

    it('renders "Stokta" for in-stock products', () => {
      renderList({ products: [mockProductInStock] });
      expect(screen.getByText('Stokta')).toBeTruthy();
    });

    it('renders "Tükendi" for out-of-stock products', () => {
      renderList({ products: [mockProductOutOfStock] });
      expect(screen.getByText('Tükendi')).toBeTruthy();
    });
  });

  describe('Empty state', () => {
    it('renders empty state component when products array is empty', () => {
      renderList({ products: [], isError: false });
      expect(screen.getByText('Ürün bulunamadı')).toBeTruthy();
    });

    it('renders "Yenile" button in empty state', () => {
      renderList({ products: [] });
      expect(screen.getByText('Yenile')).toBeTruthy();
    });

    it('renders accessible list view even when empty', () => {
      renderList({ products: [] });
      expect(screen.getByLabelText('Ürün listesi')).toBeTruthy();
    });
  });

  describe('Error state', () => {
    it('renders error empty state when isError=true and no products', () => {
      renderList({ products: [], isError: true });
      expect(screen.getByText('Bir hata oluştu')).toBeTruthy();
    });

    it('renders "Tekrar Dene" button in error state', () => {
      renderList({ products: [], isError: true });
      expect(screen.getByText('Tekrar Dene')).toBeTruthy();
    });

    it('calls onRetry when "Tekrar Dene" button is pressed', () => {
      const onRetry = jest.fn();
      renderList({ products: [], isError: true, onRetry });
      fireEvent.press(screen.getByText('Tekrar Dene'));
      expect(onRetry).toHaveBeenCalledTimes(1);
    });
  });

  describe('User interactions', () => {
    it('calls onProductPress with the pressed product', () => {
      const onProductPress = jest.fn();
      renderList({ products: [mockProductInStock], onProductPress });
      fireEvent.press(screen.getByRole('button', { name: /Redux Toolkit/ }));
      expect(onProductPress).toHaveBeenCalledTimes(1);
      expect(onProductPress).toHaveBeenCalledWith(
        expect.objectContaining<Partial<Product>>({
          id: mockProductInStock.id,
        }),
      );
    });

    it('calls onProductPress with the correct product when multiple products exist', () => {
      const onProductPress = jest.fn();
      renderList({ products: mockProductList, onProductPress });
      fireEvent.press(
        screen.getByRole('button', { name: /React Native Paper/ }),
      );
      expect(onProductPress).toHaveBeenCalledWith(
        expect.objectContaining<Partial<Product>>({
          id: mockProductOutOfStock.id,
        }),
      );
    });
  });

  describe('Accessibility', () => {
    it('has accessibilityRole="list" on the FlatList', () => {
      renderList({ products: mockProductList });
      expect(screen.getByLabelText('Ürün listesi')).toBeTruthy();
    });
  });
});
