/**
 * ProductList Component
 * Renders the full product list with loading, error, and empty states
 */

import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { Text } from '../../../shared/ui';
import { COLORS } from '../../../theme';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ProductListEmpty } from './ProductListEmpty';
import { ProductListSkeleton } from './ProductListSkeleton';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  isError: boolean;
  onRetry: () => void;
  onProductPress: (product: Product) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  loading,
  isError,
  onRetry,
  onProductPress,
  onRefresh,
  isRefreshing,
}) => {
  const renderItem: ListRenderItem<Product> = useCallback(
    ({ item }) => <ProductCard product={item} onPress={onProductPress} />,
    [onProductPress],
  );

  const keyExtractor = useCallback((item: Product, index: number) => {
    // Use a composite key: id if present and non-empty, otherwise fallback to index
    return item.id && item.id.trim() !== '' ? item.id : `product-${index}`;
  }, []);

  if (loading) {
    return <ProductListSkeleton />;
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.sectionTitle}>
        Ürünler
      </Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        ListEmptyComponent={
          <ProductListEmpty onRetry={onRetry} isError={isError} />
        }
        contentContainerStyle={
          products.length === 0 ? styles.emptyContent : styles.listContent
        }
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews
        accessibilityRole="list"
        accessibilityLabel="Ürün listesi"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
    color: COLORS.text,
    fontWeight: '700',
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContent: {
    flexGrow: 1,
  },
});

export default ProductList;
