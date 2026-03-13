/**
 * CartScreen Integration Tests
 */

import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { formatCurrency } from '../../../../shared/utils';
import { cartReducer } from '../../cartSlice';
import type { CartItem } from '../../types';
import CartScreen from '../CartScreen';

jest.mock('../../../../store', () => {
  const ReactRedux = require('react-redux');
  return {
    useAppDispatch: ReactRedux.useDispatch,
    useAppSelector: ReactRedux.useSelector,
  };
});

jest.mock('react-native-safe-area-context', () => {
  const ReactLocal = require('react');
  const ReactNative = require('react-native');
  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) =>
      ReactLocal.createElement(ReactNative.View, null, children),
    SafeAreaView: ({
      children,
      style,
    }: {
      children: React.ReactNode;
      style?: object;
    }) => ReactLocal.createElement(ReactNative.View, { style }, children),
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  };
});

const buildStore = (items: CartItem[] = []) =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: {
        items,
      },
    },
  });

const renderScreen = (items: CartItem[] = []) => {
  const store = buildStore(items);

  render(
    <Provider store={store}>
      <CartScreen />
    </Provider>,
  );

  return store;
};

const firstItem: CartItem = {
  id: 'c1',
  name: 'iPhone 15',
  price: 100,
  category: 'Telefon',
  inStock: true,
  quantity: 2,
};

const secondItem: CartItem = {
  id: 'c2',
  name: 'iPad Air',
  price: 50,
  category: 'Tablet',
  inStock: true,
  quantity: 1,
};

describe('CartScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty state when cart has no items', () => {
    renderScreen([]);

    expect(screen.getByText('Sepetim')).toBeTruthy();
    expect(screen.getByText('0 ürün')).toBeTruthy();
    expect(screen.getByText('Sepetiniz boş')).toBeTruthy();
    expect(
      screen.getByText('Ürün eklemek için ana sayfaya dönebilirsiniz.'),
    ).toBeTruthy();
    expect(screen.queryByText('Toplam')).toBeNull();
  });

  it('renders cart items and summary values', () => {
    renderScreen([firstItem, secondItem]);

    expect(screen.getByText('iPhone 15')).toBeTruthy();
    expect(screen.getByText('iPad Air')).toBeTruthy();
    expect(screen.getByText('3 ürün')).toBeTruthy();
    expect(screen.getByText('Toplam')).toBeTruthy();
    expect(screen.getByText(formatCurrency(250))).toBeTruthy();
  });

  it('increases quantity when + is pressed', () => {
    const store = renderScreen([firstItem, secondItem]);

    fireEvent.press(screen.getAllByText('+')[0]);

    expect(store.getState().cart.items[0].quantity).toBe(3);
    expect(screen.getByText('4 ürün')).toBeTruthy();
    expect(screen.getByText(formatCurrency(350))).toBeTruthy();
  });

  it('decreases quantity when - is pressed and quantity > 1', () => {
    const store = renderScreen([firstItem]);

    fireEvent.press(screen.getByText('-'));

    expect(store.getState().cart.items[0].quantity).toBe(1);
    expect(screen.getByText('1 ürün')).toBeTruthy();
    expect(screen.getAllByText(formatCurrency(100)).length).toBeGreaterThan(0);
  });

  it('removes item when - is pressed and quantity is 1', () => {
    const store = renderScreen([secondItem]);

    fireEvent.press(screen.getByText('-'));

    expect(store.getState().cart.items).toEqual([]);
    expect(screen.getByText('Sepetiniz boş')).toBeTruthy();
  });

  it('removes target item when Sil is pressed', () => {
    const store = renderScreen([firstItem, secondItem]);

    fireEvent.press(screen.getAllByText('Sil')[0]);

    expect(store.getState().cart.items).toHaveLength(1);
    expect(store.getState().cart.items[0].id).toBe(secondItem.id);
    expect(screen.queryByText('iPhone 15')).toBeNull();
    expect(screen.getByText('iPad Air')).toBeTruthy();
  });

  it('clears all items when Sepeti Temizle is pressed', () => {
    const store = renderScreen([firstItem, secondItem]);

    fireEvent.press(screen.getByText('Sepeti Temizle'));

    expect(store.getState().cart.items).toEqual([]);
    expect(screen.getByText('Sepetiniz boş')).toBeTruthy();
    expect(screen.getByText('0 ürün')).toBeTruthy();
  });
});
