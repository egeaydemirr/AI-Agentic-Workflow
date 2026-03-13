/**
 * Cart Screen
 */

import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Text } from '../../../shared/ui';
import { formatCurrency } from '../../../shared/utils';
import { useAppDispatch, useAppSelector } from '../../../store';
import { COLORS, SHADOWS } from '../../../theme';
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalPrice,
} from '../cartSlice';
import type { CartItem } from '../types';

const CartScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalItems = useAppSelector(selectCartTotalItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  const renderItem = ({ item }: { item: CartItem }) => (
    <Card style={styles.itemCard}>
      <View style={styles.itemTopRow}>
        <View style={styles.itemInfo}>
          <Text variant="titleMedium" style={styles.itemName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text variant="bodySmall" style={styles.itemCategory}>
            {item.category}
          </Text>
        </View>
        <Text variant="titleSmall" style={styles.itemPrice}>
          {formatCurrency(item.price)}
        </Text>
      </View>

      <View style={styles.itemActions}>
        <Button
          title="-"
          onPress={() => dispatch(decreaseQuantity(item.id))}
          mode="outlined"
          style={styles.qtyButton}
        />
        <Text variant="titleMedium" style={styles.qtyText}>
          {item.quantity}
        </Text>
        <Button
          title="+"
          onPress={() => dispatch(increaseQuantity(item.id))}
          mode="contained"
          style={styles.qtyButton}
        />
        <Button
          title="Sil"
          onPress={() => dispatch(removeFromCart(item.id))}
          mode="text"
          style={styles.removeButton}
        />
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Sepetim
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          {totalItems} ürün
        </Text>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text variant="headlineSmall" style={styles.emptyIcon}>
            🛍️
          </Text>
          <Text variant="titleMedium" style={styles.emptyTitle}>
            Sepetiniz boş
          </Text>
          <Text variant="bodyMedium" style={styles.emptyDescription}>
            Ürün eklemek için ana sayfaya dönebilirsiniz.
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />

          <Card style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text variant="titleMedium" style={styles.summaryLabel}>
                Toplam
              </Text>
              <Text variant="headlineSmall" style={styles.summaryValue}>
                {formatCurrency(totalPrice)}
              </Text>
            </View>
            <Button
              title="Sepeti Temizle"
              onPress={() => dispatch(clearCart())}
              mode="outlined"
              style={styles.clearButton}
            />
          </Card>
        </>
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
    paddingTop: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    backgroundColor: COLORS.background,
  },
  title: {
    color: COLORS.primaryDark,
    fontWeight: '700',
  },
  subtitle: {
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  listContent: {
    padding: 12,
    paddingBottom: 120,
  },
  itemCard: {
    marginBottom: 12,
    borderRadius: 18,
    ...SHADOWS.small,
  },
  itemTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    color: COLORS.text,
    fontWeight: '600',
  },
  itemCategory: {
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  itemPrice: {
    color: COLORS.primaryDark,
    fontWeight: '700',
  },
  itemActions: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyButton: {
    minWidth: 44,
  },
  qtyText: {
    minWidth: 24,
    textAlign: 'center',
    color: COLORS.text,
  },
  removeButton: {
    marginLeft: 'auto',
  },
  summaryCard: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    borderRadius: 20,
    ...SHADOWS.medium,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    color: COLORS.textSecondary,
  },
  summaryValue: {
    color: COLORS.primaryDark,
    fontWeight: '700',
  },
  clearButton: {
    marginTop: 12,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyTitle: {
    marginTop: 12,
    color: COLORS.text,
    fontWeight: '600',
  },
  emptyDescription: {
    marginTop: 8,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default CartScreen;
