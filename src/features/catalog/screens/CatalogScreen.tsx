/**
 * Catalog screen
 */

import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '../../../navigation/hooks';
import { Text } from '../../../shared/ui';
import { COLORS } from '../../../theme';
import { CatalogProductCard, CatalogToolbar } from '../components';
import { useCatalog } from '../hooks';
import type { CatalogProduct } from '../types';

const CatalogScreen: React.FC = () => {
  const navigation = useNavigation();
  const {
    products,
    categories,
    sortOptions,
    selectedCategoryId,
    selectedSortOption,
    viewMode,
    loading,
    isRefreshing,
    refetch,
    setGridMode,
    setListMode,
  } = useCatalog();

  const selectedCategoryLabel =
    categories.find(category => category.id === selectedCategoryId)?.name ??
    'Tümü';
  const selectedSortLabel =
    sortOptions.find(option => option.id === selectedSortOption)?.label ??
    'Önerilen';

  const handleOpenCategories = useCallback(() => {
    navigation.navigate('Categories', { selectedCategoryId });
  }, [navigation, selectedCategoryId]);

  const handleOpenSortBy = useCallback(() => {
    navigation.navigate('SortBy', { selectedSortOption });
  }, [navigation, selectedSortOption]);

  const keyExtractor = useCallback((item: CatalogProduct) => item.id, []);

  const renderItem: ListRenderItem<CatalogProduct> = useCallback(
    ({ item }) => <CatalogProductCard product={item} mode={viewMode} />,
    [viewMode],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Katalog
        </Text>
      </View>

      <CatalogToolbar
        categoryLabel={selectedCategoryLabel}
        sortLabel={selectedSortLabel}
        viewMode={viewMode}
        onPressCategories={handleOpenCategories}
        onPressSortBy={handleOpenSortBy}
        onSetGridMode={setGridMode}
        onSetListMode={setListMode}
      />

      {loading ? (
        <View style={styles.centered} accessibilityRole="progressbar">
          <Text variant="titleMedium" style={styles.loadingText}>
            Ürünler yükleniyor...
          </Text>
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={viewMode === 'grid' ? 2 : 1}
          key={viewMode}
          onRefresh={refetch}
          refreshing={isRefreshing}
          accessibilityRole="list"
          accessibilityLabel="Katalog ürün listesi"
          contentContainerStyle={
            products.length === 0 ? styles.emptyContent : styles.content
          }
          ListEmptyComponent={
            <View style={styles.centered}>
              <Text variant="titleMedium" style={styles.emptyText}>
                Filtreye uygun ürün bulunamadı.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: {
    color: COLORS.primaryDark,
    fontWeight: '700',
  },
  content: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  emptyContent: {
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    color: COLORS.textSecondary,
  },
  emptyText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default CatalogScreen;
