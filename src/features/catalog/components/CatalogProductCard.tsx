/**
 * Catalog product card
 */

import React, { memo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import placeholderImage from '../../../assets/placeholder';
import { Card, Text } from '../../../shared/ui';
import { formatCurrency } from '../../../shared/utils';
import { COLORS, SHADOWS } from '../../../theme';
import type { CatalogProduct, CatalogViewMode } from '../types';

interface CatalogProductCardProps {
  product: CatalogProduct;
  mode: CatalogViewMode;
  onPress?: (product: CatalogProduct) => void;
}

const PLACEHOLDER_IMAGE = placeholderImage;

export const CatalogProductCard: React.FC<CatalogProductCardProps> = memo(
  ({ product, mode, onPress }) => {
    const cardContainerStyle = [
      styles.cardContainer,
      mode === 'grid' ? styles.gridContainer : styles.listContainer,
    ];

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onPress?.(product)}
        disabled={!onPress}
        style={cardContainerStyle}
        accessibilityRole="button"
        accessibilityLabel={`${product.name}, ${formatCurrency(product.price)}`}
      >
        <Card style={styles.card}>
          <Image
            source={
              product.imageUrl ? { uri: product.imageUrl } : PLACEHOLDER_IMAGE
            }
            style={mode === 'grid' ? styles.gridImage : styles.listImage}
            resizeMode="cover"
            accessibilityIgnoresInvertColors
          />
          <View style={styles.info}>
            <Text variant="titleSmall" numberOfLines={2} style={styles.name}>
              {product.name}
            </Text>
            <Text variant="bodySmall" numberOfLines={1} style={styles.category}>
              {product.categoryName}
            </Text>
            <Text variant="titleMedium" style={styles.price}>
              {formatCurrency(product.price)}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  },
);

CatalogProductCard.displayName = 'CatalogProductCard';

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 12,
  },
  gridContainer: {
    flex: 1,
    marginHorizontal: 6,
  },
  listContainer: {
    marginHorizontal: 16,
  },
  card: {
    ...SHADOWS.small,
  },
  gridImage: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceVariant,
  },
  listImage: {
    width: '100%',
    height: 170,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceVariant,
  },
  info: {
    marginTop: 10,
    gap: 4,
  },
  name: {
    color: COLORS.text,
    fontWeight: '600',
  },
  category: {
    color: COLORS.textSecondary,
  },
  price: {
    marginTop: 2,
    color: COLORS.primaryDark,
    fontWeight: '700',
  },
});

export default CatalogProductCard;
