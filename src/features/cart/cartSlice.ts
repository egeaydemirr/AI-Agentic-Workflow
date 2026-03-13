/**
 * Cart Slice
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type { CartProductPayload, CartState } from './types';

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProductPayload>) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
        return;
      }

      state.items.push({
        ...action.payload,
        quantity: 1,
      });
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(cartItem => cartItem.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(cartItem => cartItem.id === action.payload);
      if (!item) {
        return;
      }

      if (item.quantity <= 1) {
        state.items = state.items.filter(
          cartItem => cartItem.id !== action.payload,
        );
        return;
      }

      item.quantity -= 1;
    },
    clearCart: state => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartTotalItems = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotalPrice = (state: RootState) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

export const cartReducer = cartSlice.reducer;

export default cartSlice;
