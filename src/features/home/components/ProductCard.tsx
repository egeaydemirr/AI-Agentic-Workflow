/**
 * ProductCard Component
 * Displays a single product item in the list
 */

import React, { memo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import placeholderImage from '../../../assets/placeholder';
import { Card, Text } from '../../../shared/ui';
import { formatCurrency } from '../../../shared/utils';
import { COLORS, SHADOWS } from '../../../theme';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

const PLACEHOLDER_IMAGE = placeholderImage;

export const ProductCard: React.FC<ProductCardProps> = memo(
  ({ product, onPress }) => {
    const { name, price, imageUrl, category, inStock } = product;

    return (
      <TouchableOpacity
        onPress={() => onPress(product)}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel={`${name}, ${formatCurrency(price)}, ${
          inStock ? 'Stokta var' : 'Stokta yok'
        }`}
        style={styles.touchable}
      >
        <Card style={styles.card}>
          <View style={styles.row}>
            <Image
              source={imageUrl ? { uri: imageUrl } : PLACEHOLDER_IMAGE}
              style={styles.image}
              resizeMode="cover"
              accessibilityIgnoresInvertColors
            />
            <View style={styles.info}>
              <Text variant="titleSmall" style={styles.name} numberOfLines={2}>
                {name}
              </Text>
              <Text variant="bodySmall" style={styles.category}>
                {category}
              </Text>
              <View style={styles.bottomRow}>
                <Text variant="titleMedium" style={styles.price}>
                  {formatCurrency(price)}
                </Text>
                <View
                  style={[
                    styles.stockBadge,
                    inStock ? styles.inStock : styles.outOfStock,
                  ]}
                  accessibilityRole="text"
                >
                  <Text variant="bodySmall" style={styles.stockLabel}>
                    {inStock ? 'Stokta' : 'Tükendi'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  },
);

ProductCard.displayName = 'ProductCard';

const styles = StyleSheet.create({
  touchable: {
    marginHorizontal: 16,
    marginVertical: 6,
  },
  card: {
    ...SHADOWS.medium,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  name: {
    color: COLORS.text,
    fontWeight: '600',
  },
  category: {
    color: COLORS.textSecondary,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  price: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  stockBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 16,
  },
  inStock: {
    backgroundColor: COLORS.successLight,
  },
  outOfStock: {
    backgroundColor: COLORS.errorLight,
  },
  stockLabel: {
    color: COLORS.white,
    fontWeight: '600',
  },
});

export default ProductCard;
