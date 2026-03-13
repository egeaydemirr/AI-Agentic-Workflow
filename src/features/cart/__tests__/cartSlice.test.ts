/**
 * cartSlice Unit Tests
 */

import type { RootState } from '../../../store';
import {
  addToCart,
  cartReducer,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalPrice,
} from '../cartSlice';
import type { CartProductPayload, CartState } from '../types';

const mockProduct: CartProductPayload = {
  id: 'p1',
  name: 'Test Ürün',
  price: 120,
  category: 'Test',
  inStock: true,
};

const secondProduct: CartProductPayload = {
  id: 'p2',
  name: 'İkinci Ürün',
  price: 80,
  category: 'Diğer',
  inStock: true,
};

describe('cartSlice', () => {
  it('returns initial state', () => {
    const state = cartReducer(undefined, { type: 'unknown' });
    expect(state).toEqual({ items: [] });
  });

  it('adds a new product with quantity 1', () => {
    const initialState: CartState = { items: [] };
    const state = cartReducer(initialState, addToCart(mockProduct));

    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual({ ...mockProduct, quantity: 1 });
  });

  it('increments quantity when same product is added again', () => {
    const initialState: CartState = {
      items: [{ ...mockProduct, quantity: 1 }],
    };

    const state = cartReducer(initialState, addToCart(mockProduct));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it('removes product by id', () => {
    const initialState: CartState = {
      items: [
        { ...mockProduct, quantity: 1 },
        { ...secondProduct, quantity: 1 },
      ],
    };

    const state = cartReducer(initialState, removeFromCart(mockProduct.id));

    expect(state.items).toEqual([{ ...secondProduct, quantity: 1 }]);
  });

  it('increases quantity for existing item', () => {
    const initialState: CartState = {
      items: [{ ...mockProduct, quantity: 2 }],
    };

    const state = cartReducer(initialState, increaseQuantity(mockProduct.id));
    expect(state.items[0].quantity).toBe(3);
  });

  it('does not change state when increasing unknown item', () => {
    const initialState: CartState = {
      items: [{ ...mockProduct, quantity: 2 }],
    };

    const state = cartReducer(initialState, increaseQuantity('unknown'));
    expect(state).toEqual(initialState);
  });

  it('decreases quantity when item quantity is greater than 1', () => {
    const initialState: CartState = {
      items: [{ ...mockProduct, quantity: 3 }],
    };

    const state = cartReducer(initialState, decreaseQuantity(mockProduct.id));
    expect(state.items[0].quantity).toBe(2);
  });

  it('removes item when decreasing quantity from 1', () => {
    const initialState: CartState = {
      items: [{ ...mockProduct, quantity: 1 }],
    };

    const state = cartReducer(initialState, decreaseQuantity(mockProduct.id));
    expect(state.items).toEqual([]);
  });

  it('does not change state when decreasing unknown item', () => {
    const initialState: CartState = {
      items: [{ ...mockProduct, quantity: 1 }],
    };

    const state = cartReducer(initialState, decreaseQuantity('unknown'));
    expect(state).toEqual(initialState);
  });

  it('clears all items', () => {
    const initialState: CartState = {
      items: [
        { ...mockProduct, quantity: 2 },
        { ...secondProduct, quantity: 1 },
      ],
    };

    const state = cartReducer(initialState, clearCart());
    expect(state.items).toEqual([]);
  });

  it('selects items, total items and total price correctly', () => {
    const cartState: CartState = {
      items: [
        { ...mockProduct, quantity: 2 },
        { ...secondProduct, quantity: 1 },
      ],
    };

    const rootState = { cart: cartState } as unknown as RootState;

    expect(selectCartItems(rootState)).toEqual(cartState.items);
    expect(selectCartTotalItems(rootState)).toBe(3);
    expect(selectCartTotalPrice(rootState)).toBe(320);
  });
});
