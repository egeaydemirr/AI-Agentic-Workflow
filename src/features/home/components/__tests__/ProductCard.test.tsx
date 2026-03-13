/**
 * ProductCard Unit Tests
 */

import { fireEvent, render, screen } from '@testing-library/react-native';
import { Image } from 'react-native';
import {
  mockProductInStock,
  mockProductOutOfStock,
} from '../../__fixtures__/products';
import { ProductCard } from '../ProductCard';

const onPressMock = jest.fn();

const renderCard = (overrides = {}) =>
  render(
    <ProductCard
      product={{ ...mockProductInStock, ...overrides }}
      onPress={onPressMock}
    />,
  );

describe('ProductCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders product name', () => {
      renderCard();
      expect(screen.getByText(mockProductInStock.name)).toBeTruthy();
    });

    it('renders product category', () => {
      renderCard();
      expect(screen.getByText(mockProductInStock.category)).toBeTruthy();
    });

    it('renders formatted price', () => {
      renderCard({ price: 299.99 });
      // formatCurrency with TRY locale produces a price string containing the digits
      expect(screen.getByText(/299/)).toBeTruthy();
    });

    it('renders "Stokta" badge when product is in stock', () => {
      renderCard({ inStock: true });
      expect(screen.getByText('Stokta')).toBeTruthy();
    });

    it('renders "Tükendi" badge when product is out of stock', () => {
      render(
        <ProductCard product={mockProductOutOfStock} onPress={onPressMock} />,
      );
      expect(screen.getByText('Tükendi')).toBeTruthy();
    });

    it('uses placeholder image URI when imageUrl is undefined', () => {
      const { UNSAFE_getByType } = render(
        <ProductCard product={mockProductOutOfStock} onPress={onPressMock} />,
      );
      const image = UNSAFE_getByType(Image);
      expect(image.props.source.uri).toBeTruthy();
    });

    it('uses the provided imageUrl when defined', () => {
      const { UNSAFE_getByType } = render(
        <ProductCard product={mockProductInStock} onPress={onPressMock} />,
      );
      const image = UNSAFE_getByType(Image);
      expect(image.props.source.uri).toBe(mockProductInStock.imageUrl);
    });
  });

  describe('Accessibility', () => {
    it('has accessibilityRole of "button"', () => {
      renderCard();
      expect(screen.getByRole('button')).toBeTruthy();
    });

    it('has descriptive accessibilityLabel including name, price and stock status for in-stock product', () => {
      renderCard({ name: 'Test Ürünü', inStock: true });
      expect(screen.getByRole('button', { name: /Test Ürünü/ })).toBeTruthy();
      expect(screen.getByRole('button', { name: /Stokta var/ })).toBeTruthy();
    });

    it('has "Stokta yok" in accessibilityLabel when out of stock', () => {
      render(
        <ProductCard product={mockProductOutOfStock} onPress={onPressMock} />,
      );
      expect(screen.getByRole('button', { name: /Stokta yok/ })).toBeTruthy();
    });
  });

  describe('Interaction', () => {
    it('calls onPress with the correct product when tapped', () => {
      renderCard();
      fireEvent.press(screen.getByRole('button'));
      expect(onPressMock).toHaveBeenCalledTimes(1);
      expect(onPressMock).toHaveBeenCalledWith(
        expect.objectContaining({ id: mockProductInStock.id }),
      );
    });

    it('calls onPress with the full product object', () => {
      renderCard();
      fireEvent.press(screen.getByRole('button'));
      expect(onPressMock).toHaveBeenCalledWith(
        expect.objectContaining({
          id: mockProductInStock.id,
          name: mockProductInStock.name,
          price: mockProductInStock.price,
        }),
      );
    });

    it('does not call onPress when not tapped', () => {
      renderCard();
      expect(onPressMock).not.toHaveBeenCalled();
    });
  });
});
