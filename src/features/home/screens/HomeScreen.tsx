/**
 * Home Screen
 * Main home screen of the application
 */

import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '../../../navigation/hooks';
import { Button, Text } from '../../../shared/ui';
import { COLORS, SHADOWS } from '../../../theme';
import { ProductList } from '../components/ProductList';
import { useHomeScreen } from '../hooks/useHomeScreen';
import { useProducts } from '../hooks/useProducts';
import type { Product } from '../types';

const HomeScreen: React.FC = () => {
  const { greeting } = useHomeScreen();
  const navigation = useNavigation();
  const { products, loading, isError, isRefreshing, refetch } = useProducts();

  const handleProductPress = useCallback(
    (product: Product) => {
      navigation.navigate('ProductDetail', {
        productId: product.id,
        productName: product.name,
      });
    },
    [navigation],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text variant="headlineMedium" style={styles.title}>
            {greeting}
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Koç Mobil Architecture
          </Text>
        </View>
        <Button
          title="Sepet"
          onPress={() => navigation.navigate('Cart')}
          mode="contained-tonal"
          icon="cart-outline"
        />
      </View>
      <ProductList
        products={products}
        loading={loading}
        isError={isError}
        onRetry={refetch}
        onProductPress={handleProductPress}
        onRefresh={refetch}
        isRefreshing={isRefreshing}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    ...SHADOWS.medium,
    backgroundColor: COLORS.background,
  },
  title: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  subtitle: {
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});

export default HomeScreen;
