/**
 * Catalog toolbar controls
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../../shared/ui';
import { COLORS } from '../../../theme';
import type { CatalogViewMode } from '../types';

interface CatalogToolbarProps {
  categoryLabel: string;
  sortLabel: string;
  viewMode: CatalogViewMode;
  onPressCategories: () => void;
  onPressSortBy: () => void;
  onSetGridMode: () => void;
  onSetListMode: () => void;
}

export const CatalogToolbar: React.FC<CatalogToolbarProps> = ({
  categoryLabel,
  sortLabel,
  viewMode,
  onPressCategories,
  onPressSortBy,
  onSetGridMode,
  onSetListMode,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Button
          title={`Kategori: ${categoryLabel}`}
          onPress={onPressCategories}
          mode="outlined"
          icon="shape-outline"
          accessibilityLabel="Kategori filtresini aç"
          accessibilityHint="Kategori seçimi ekranını açar"
        />
        <Button
          title={`Sırala: ${sortLabel}`}
          onPress={onPressSortBy}
          mode="outlined"
          icon="sort"
          accessibilityLabel="Sıralama seçeneklerini aç"
          accessibilityHint="Sıralama ekranını açar"
        />
      </View>

      <View style={styles.row}>
        <Button
          title="Grid"
          onPress={onSetGridMode}
          mode={viewMode === 'grid' ? 'contained-tonal' : 'outlined'}
          icon="view-grid-outline"
          accessibilityLabel="Grid görünümünü seç"
        />
        <Button
          title="Liste"
          onPress={onSetListMode}
          mode={viewMode === 'list' ? 'contained-tonal' : 'outlined'}
          icon="view-list-outline"
          accessibilityLabel="Liste görünümünü seç"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: COLORS.background,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
});

export default CatalogToolbar;
