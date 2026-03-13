/**
 * ProductListEmpty Unit Tests
 */

import { fireEvent, render, screen } from '@testing-library/react-native';
import { ProductListEmpty } from '../ProductListEmpty';

const onRetryMock = jest.fn();

describe('ProductListEmpty', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Default (empty) state', () => {
    it('renders empty state icon', () => {
      render(<ProductListEmpty onRetry={onRetryMock} />);
      expect(screen.getByText('🛒')).toBeTruthy();
    });

    it('renders "Ürün bulunamadı" title', () => {
      render(<ProductListEmpty onRetry={onRetryMock} />);
      expect(screen.getByText('Ürün bulunamadı')).toBeTruthy();
    });

    it('renders empty description text', () => {
      render(<ProductListEmpty onRetry={onRetryMock} />);
      expect(screen.getByText('Şu anda görüntülenecek ürün yok.')).toBeTruthy();
    });

    it('renders "Yenile" button in empty state', () => {
      render(<ProductListEmpty onRetry={onRetryMock} />);
      expect(screen.getByText('Yenile')).toBeTruthy();
    });

    it('has correct accessibilityLabel in empty state', () => {
      render(<ProductListEmpty onRetry={onRetryMock} />);
      expect(screen.getByLabelText('Henüz ürün bulunmuyor.')).toBeTruthy();
    });

    it('calls onRetry when "Yenile" button is pressed', () => {
      render(<ProductListEmpty onRetry={onRetryMock} />);
      fireEvent.press(screen.getByText('Yenile'));
      expect(onRetryMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('Error state (isError=true)', () => {
    it('renders error state icon', () => {
      render(<ProductListEmpty onRetry={onRetryMock} isError />);
      expect(screen.getByText('⚠️')).toBeTruthy();
    });

    it('renders "Bir hata oluştu" title', () => {
      render(<ProductListEmpty onRetry={onRetryMock} isError />);
      expect(screen.getByText('Bir hata oluştu')).toBeTruthy();
    });

    it('renders error description text', () => {
      render(<ProductListEmpty onRetry={onRetryMock} isError />);
      expect(
        screen.getByText('Ürünler yüklenirken bir sorun oluştu.'),
      ).toBeTruthy();
    });

    it('renders "Tekrar Dene" button in error state', () => {
      render(<ProductListEmpty onRetry={onRetryMock} isError />);
      expect(screen.getByText('Tekrar Dene')).toBeTruthy();
    });

    it('has correct accessibilityLabel in error state', () => {
      render(<ProductListEmpty onRetry={onRetryMock} isError />);
      expect(screen.getByLabelText('Ürünler yüklenemedi.')).toBeTruthy();
    });

    it('calls onRetry when "Tekrar Dene" button is pressed', () => {
      render(<ProductListEmpty onRetry={onRetryMock} isError />);
      fireEvent.press(screen.getByText('Tekrar Dene'));
      expect(onRetryMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('State isolation', () => {
    it('does NOT render error icon in default state', () => {
      render(<ProductListEmpty onRetry={onRetryMock} />);
      expect(screen.queryByText('⚠️')).toBeNull();
    });

    it('does NOT render "Tekrar Dene" in empty (non-error) state', () => {
      render(<ProductListEmpty onRetry={onRetryMock} />);
      expect(screen.queryByText('Tekrar Dene')).toBeNull();
    });

    it('does NOT render "Yenile" in error state', () => {
      render(<ProductListEmpty onRetry={onRetryMock} isError />);
      expect(screen.queryByText('Yenile')).toBeNull();
    });
  });
});
