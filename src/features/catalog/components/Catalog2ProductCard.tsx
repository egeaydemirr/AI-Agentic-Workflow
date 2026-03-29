import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Text } from '../../../shared/ui';
import { CATALOG2_COLORS, CATALOG2_TYPOGRAPHY, SHADOWS } from '../../../theme';
import type { CatalogProduct } from '../types';

interface Catalog2ProductCardProps {
  product: CatalogProduct;
  width: number;
}

const renderStars = (rating: number) => {
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  return Array.from({ length: 5 }).map((_, index) => ({
    key: `star-${index}`,
    filled: index < full,
  }));
};

const Catalog2ProductCard: React.FC<Catalog2ProductCardProps> = ({
  product,
  width,
}) => {
  const stars = renderStars(product.rating);

  return (
    <Pressable style={[styles.card, { width }]}>
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: product.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />

        {product.discountPercent ? (
          <View style={styles.saleBadge}>
            <Text variant="labelSmall" style={styles.saleText}>
              -{product.discountPercent}%
            </Text>
          </View>
        ) : null}

        <View style={styles.favoriteWrap}>
          <IconButton
            icon={product.isFavorite ? 'heart' : 'heart-outline'}
            size={18}
            iconColor={
              product.isFavorite
                ? CATALOG2_COLORS.accent
                : CATALOG2_COLORS.heartInactive
            }
            style={styles.favoriteIcon}
            onPress={() => undefined}
          />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.ratingRow}>
          <View style={styles.starRow}>
            {stars.map(star => (
              <Text key={star.key} variant="bodySmall" style={styles.starText}>
                {star.filled ? '★' : '☆'}
              </Text>
            ))}
          </View>
          <Text variant="bodySmall" style={styles.ratingCount}>
            ({product.ratingCount ?? 0})
          </Text>
        </View>

        <Text variant="bodySmall" style={styles.brand}>
          {product.brand ?? 'Brand'}
        </Text>

        <Text variant="titleSmall" numberOfLines={1} style={styles.name}>
          {product.name}
        </Text>

        <View style={styles.priceRow}>
          {product.oldPrice ? (
            <Text variant="bodySmall" style={styles.oldPrice}>
              {product.oldPrice}$
            </Text>
          ) : null}
          <Text variant="titleSmall" style={styles.price}>
            {product.price}$
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 24,
  },
  imageWrap: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: CATALOG2_COLORS.surface,
    ...SHADOWS.medium,
  },
  image: {
    width: '100%',
    aspectRatio: 0.75,
  },
  saleBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    minWidth: 40,
    height: 24,
    borderRadius: 12,
    backgroundColor: CATALOG2_COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  saleText: {
    color: CATALOG2_COLORS.surface,
    fontFamily: CATALOG2_TYPOGRAPHY.family.medium,
    fontSize: CATALOG2_TYPOGRAPHY.size.sm,
  },
  favoriteWrap: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: CATALOG2_COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  favoriteIcon: {
    margin: 0,
  },
  content: {
    marginTop: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  starText: {
    color: CATALOG2_COLORS.star,
    fontSize: CATALOG2_TYPOGRAPHY.size.base,
    lineHeight: 14,
  },
  ratingCount: {
    marginLeft: 4,
    color: CATALOG2_COLORS.textSecondary,
    fontFamily: CATALOG2_TYPOGRAPHY.family.regular,
    fontSize: CATALOG2_TYPOGRAPHY.size.base,
  },
  brand: {
    marginTop: 5,
    color: CATALOG2_COLORS.textSecondary,
    fontFamily: CATALOG2_TYPOGRAPHY.family.regular,
    fontSize: CATALOG2_TYPOGRAPHY.size.base,
  },
  name: {
    marginTop: 1,
    color: CATALOG2_COLORS.textPrimary,
    fontFamily: CATALOG2_TYPOGRAPHY.family.semibold,
    fontSize: CATALOG2_TYPOGRAPHY.size.md,
  },
  priceRow: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  oldPrice: {
    color: CATALOG2_COLORS.textSecondary,
    textDecorationLine: 'line-through',
    fontFamily: CATALOG2_TYPOGRAPHY.family.regular,
    fontSize: CATALOG2_TYPOGRAPHY.size.md,
  },
  price: {
    color: CATALOG2_COLORS.accent,
    fontFamily: CATALOG2_TYPOGRAPHY.family.semibold,
    fontSize: CATALOG2_TYPOGRAPHY.size.md,
  },
});

export default Catalog2ProductCard;
