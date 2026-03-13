/**
 * ProductListSkeleton Component
 * Loading placeholder for the product list
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS, SHADOWS } from '../../../theme';

const SkeletonItem: React.FC = () => (
  <View style={styles.card}>
    <View style={styles.row}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.info}>
        <View style={[styles.line, styles.lineTitle]} />
        <View style={[styles.line, styles.lineSub]} />
        <View style={styles.priceRow}>
          <View style={[styles.line, styles.linePrice]} />
          <View style={styles.badge} />
        </View>
      </View>
    </View>
  </View>
);

export const ProductListSkeleton: React.FC = () => (
  <View accessibilityLabel="Ürünler yükleniyor..." accessibilityRole="text">
    {Array.from({ length: 4 }).map((_, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <SkeletonItem key={index} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 20,
    padding: 16,
    backgroundColor: COLORS.surface,
    ...SHADOWS.medium,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceVariant,
  },
  info: {
    flex: 1,
    gap: 8,
  },
  line: {
    borderRadius: 4,
    backgroundColor: COLORS.surfaceVariant,
  },
  lineTitle: {
    height: 16,
    width: '80%',
  },
  lineSub: {
    height: 12,
    width: '50%',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  linePrice: {
    height: 16,
    width: '35%',
  },
  badge: {
    width: 56,
    height: 20,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceVariant,
  },
});

export default ProductListSkeleton;
