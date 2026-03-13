/**
 * ProductListEmpty Component
 * Shown when the product list has no items
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from '../../../shared/ui';
import { COLORS } from '../../../theme';

interface ProductListEmptyProps {
  onRetry: () => void;
  isError?: boolean;
}

export const ProductListEmpty: React.FC<ProductListEmptyProps> = ({
  onRetry,
  isError = false,
}) => {
  return (
    <View
      style={styles.container}
      accessibilityRole="text"
      accessibilityLabel={
        isError ? 'Ürünler yüklenemedi.' : 'Henüz ürün bulunmuyor.'
      }
    >
      <Text variant="headlineSmall" style={styles.icon}>
        {isError ? '⚠️' : '🛒'}
      </Text>
      <Text variant="titleMedium" style={styles.title}>
        {isError ? 'Bir hata oluştu' : 'Ürün bulunamadı'}
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        {isError
          ? 'Ürünler yüklenirken bir sorun oluştu.'
          : 'Şu anda görüntülenecek ürün yok.'}
      </Text>
      <Button
        title={isError ? 'Tekrar Dene' : 'Yenile'}
        onPress={onRetry}
        mode="outlined"
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
    gap: 8,
  },
  icon: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    color: COLORS.text,
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
  },
});

export default ProductListEmpty;
