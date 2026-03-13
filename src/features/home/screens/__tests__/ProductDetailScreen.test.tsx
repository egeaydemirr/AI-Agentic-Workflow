import { NavigationContainer } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import { useGetProductsQuery } from '../../services/homeApi';
import ProductDetailScreen from '../ProductDetailScreen';

jest.mock('../../services/homeApi');

const mockNavigate = jest.fn();
jest.mock('../../../navigation/hooks', () => ({
  useNavigation: () => ({ goBack: mockNavigate }),
}));

const PRODUCT = {
  id: '1',
  name: 'Test Product',
  description: 'Test Description',
  price: 100,
  category: 'Test Category',
  inStock: true,
};

describe('ProductDetailScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderScreen(params?: { productId: string; productName: string }) {
    const routeParams = params || { productId: '1', productName: PRODUCT.name };
    (useGetProductsQuery as jest.Mock).mockReturnValue({
      data: [PRODUCT],
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });
    return render(
      <NavigationContainer>
        {/* @ts-ignore */}
        <ProductDetailScreen route={{ params: routeParams }} />
      </NavigationContainer>,
    );
  }

  it('renders product details', () => {
    const { getByText } = renderScreen();
    expect(getByText(PRODUCT.name)).toBeTruthy();
    expect(getByText(PRODUCT.category)).toBeTruthy();
    expect(getByText('AÇIKLAMA')).toBeTruthy();
    expect(getByText(PRODUCT.description)).toBeTruthy();
    expect(getByText('DETAYLAR')).toBeTruthy();
    expect(getByText('Fiyat')).toBeTruthy();
    expect(getByText('₺100.00')).toBeTruthy();
    expect(getByText('Mevcut')).toBeTruthy();
  });

  it('shows error if product not found', () => {
    (useGetProductsQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });
    const { getByText } = renderScreen();
    expect(getByText('Ürün bulunamadı.')).toBeTruthy();
  });

  it('shows loading state', () => {
    (useGetProductsQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
      refetch: jest.fn(),
    });
    const { getByText } = renderScreen();
    expect(getByText('Ürünler yükleniyor...')).toBeTruthy();
  });

  it('shows error state', () => {
    (useGetProductsQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
      refetch: jest.fn(),
    });
    const { getByText } = renderScreen();
    expect(getByText('Ürünler yüklenemedi.')).toBeTruthy();
  });

  it('navigates back when "Geri Dön" is pressed', () => {
    const { getByText } = renderScreen();
    fireEvent.press(getByText('Geri Dön'));
    expect(mockNavigate).toHaveBeenCalled();
  });
});
