/**
 * HomeScreen Integration Tests
 *
 * Tests the HomeScreen component's rendering and navigation behavior
 * using mocked hooks to isolate screen-level logic.
 */

// ─── Mocks (hoisted — must use require() only, no outer-scope vars) ─────────

jest.mock('react-native-safe-area-context', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createElement } = require('react');
  return {
    SafeAreaProvider: ({ children }: { children: unknown }) =>
      createElement(View, null, children),
    SafeAreaView: ({
      children,
      style,
    }: {
      children: unknown;
      style?: object;
    }) => createElement(View, { style }, children),
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  };
});

jest.mock('../../../../navigation/hooks', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../../hooks/useHomeScreen', () => ({
  useHomeScreen: () => ({ greeting: 'Merhaba Test', handlePress: jest.fn() }),
}));

jest.mock('../../hooks/useProducts', () => ({
  useProducts: jest.fn(),
}));

// ─── Imports ─────────────────────────────────────────────────────────────────

import { fireEvent, render, screen } from '@testing-library/react-native';
import {
  mockProductInStock,
  mockProductList,
} from '../../__fixtures__/products';
import HomeScreen from '../HomeScreen';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { useNavigation } = require('../../../../navigation/hooks') as {
  useNavigation: jest.Mock;
};
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { useProducts } = require('../../hooks/useProducts') as {
  useProducts: jest.Mock;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const mockNavigate = jest.fn();

const defaultProductsState = {
  products: mockProductList,
  loading: false,
  isError: false,
  isRefreshing: false,
  errorMessage: '',
  refetch: jest.fn(),
};

const renderScreen = () => render(<HomeScreen />);

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useNavigation.mockReturnValue({ navigate: mockNavigate });
    useProducts.mockReturnValue(defaultProductsState);
  });

  describe('Header', () => {
    it('renders the greeting from useHomeScreen', () => {
      renderScreen();
      expect(screen.getByText('Merhaba Test')).toBeTruthy();
    });

    it('renders the app subtitle', () => {
      renderScreen();
      expect(screen.getByText('Koç Mobil Architecture')).toBeTruthy();
    });
  });

  describe('Product list rendering', () => {
    it('renders product names from the list', () => {
      renderScreen();
      for (const product of mockProductList) {
        expect(screen.getByText(product.name)).toBeTruthy();
      }
    });

    it('renders the "Ürünler" section title', () => {
      renderScreen();
      expect(screen.getByText('Ürünler')).toBeTruthy();
    });

    it('shows the loading skeleton when loading=true', () => {
      useProducts.mockReturnValue({ ...defaultProductsState, loading: true });
      renderScreen();
      expect(screen.getByLabelText('Ürünler yükleniyor...')).toBeTruthy();
    });

    it('shows error state when isError=true and products empty', () => {
      useProducts.mockReturnValue({
        ...defaultProductsState,
        products: [],
        isError: true,
        errorMessage: 'Sunucuya ulaşılamadı. Lütfen bağlantınızı kontrol edin.',
      });
      renderScreen();
      expect(screen.getByText('Bir hata oluştu')).toBeTruthy();
    });

    it('shows empty state when products array is empty', () => {
      useProducts.mockReturnValue({
        ...defaultProductsState,
        products: [],
        isError: false,
      });
      renderScreen();
      expect(screen.getByText('Ürün bulunamadı')).toBeTruthy();
    });
  });

  describe('Navigation', () => {
    it('navigates to ProductDetail with correct params when a product is tapped', () => {
      renderScreen();
      fireEvent.press(
        screen.getByRole('button', {
          name: new RegExp(mockProductInStock.name),
        }),
      );
      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith('ProductDetail', {
        productId: mockProductInStock.id,
        productName: mockProductInStock.name,
      });
    });

    it('navigates to the correct product when a different product is tapped', () => {
      const secondProduct = mockProductList[1];
      renderScreen();
      fireEvent.press(
        screen.getByRole('button', { name: new RegExp(secondProduct.name) }),
      );
      expect(mockNavigate).toHaveBeenCalledWith('ProductDetail', {
        productId: secondProduct.id,
        productName: secondProduct.name,
      });
    });
  });

  describe('Retry / Refresh', () => {
    it('calls refetch when "Tekrar Dene" is pressed in error state', () => {
      const refetch = jest.fn();
      useProducts.mockReturnValue({
        ...defaultProductsState,
        products: [],
        isError: true,
        refetch,
      });
      renderScreen();
      fireEvent.press(screen.getByText('Tekrar Dene'));
      expect(refetch).toHaveBeenCalledTimes(1);
    });
  });
});
