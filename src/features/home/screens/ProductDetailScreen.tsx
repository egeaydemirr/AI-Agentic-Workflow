/**
 * Product Detail Screen
 * Displays detailed information about a selected product
 */

import { useRoute, type RouteProp } from '@react-navigation/native';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '../../../navigation/hooks';
import type { RootStackParamList } from '../../../navigation/types';
import { Button, Card, Text } from '../../../shared/ui';
import { useAppDispatch } from '../../../store';
import { COLORS, SHADOWS } from '../../../theme';
import { addToCart } from '../../cart';
// ...existing code...
import { useGetProductsQuery } from '../services/homeApi';

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

export default function ProductDetailScreen() {
  const route = useRoute<ProductDetailRouteProp>();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { productId, productName } = route.params;

  const {
    data: products = [],
    isLoading,
    isError,
    // ...existing code...
    refetch,
  } = useGetProductsQuery();

  const product = products.find(p => p.id === productId);

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        inStock: product.inStock,
      }),
    );

    Alert.alert('Sepete eklendi', `${product.name} sepetinize eklendi.`, [
      {
        text: 'Sepete Git',
        onPress: () => navigation.navigate('Cart'),
      },
      {
        text: 'Devam Et',
      },
    ]);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text variant="titleMedium" style={styles.errorText}>
            Ürünler yükleniyor...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError || !product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text variant="titleMedium" style={styles.errorText}>
            {isError ? 'Ürünler yüklenemedi.' : 'Ürün bulunamadı.'}
          </Text>
          <Button
            title="Yeniden Dene"
            onPress={refetch}
            mode="contained"
            style={styles.primaryButton}
          />
          <Button
            title="Geri Dön"
            onPress={() => navigation.goBack()}
            mode="outlined"
            style={styles.backButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Başlık */}
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            {productName}
          </Text>
          <Text variant="bodySmall" style={styles.category}>
            {product.category}
          </Text>
        </View>

        {/* Açıklama */}
        <Card style={styles.card}>
          <Text variant="titleSmall" style={styles.sectionTitle}>
            AÇIKLAMA
          </Text>
          <Divider style={styles.divider} />
          <Text variant="bodyMedium" style={styles.bodyText}>
            {product.description}
          </Text>
        </Card>

        {/* Detaylar */}
        <Card style={styles.card}>
          <Text variant="titleSmall" style={styles.sectionTitle}>
            DETAYLAR
          </Text>
          <Divider style={styles.divider} />
          <View style={styles.detailRow}>
            <Text variant="bodyMedium" style={styles.detailLabel}>
              Fiyat
            </Text>
            <Text variant="bodyMedium" style={styles.price}>
              ₺{product.price.toFixed(2)}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text variant="bodyMedium" style={styles.detailLabel}>
              Stok Durumu
            </Text>
            <Text
              variant="bodyMedium"
              style={product.inStock ? styles.inStock : styles.outOfStock}
            >
              {product.inStock ? 'Mevcut' : 'Tükendi'}
            </Text>
          </View>
        </Card>

        {/* Aksiyon butonları */}
        <View style={styles.actions}>
          <Button
            title="Sepete Ekle"
            onPress={handleAddToCart}
            mode="contained"
            disabled={!product.inStock}
            icon="cart-plus"
            style={styles.primaryButton}
          />
          <Button
            title="Geri Dön"
            onPress={() => navigation.goBack()}
            mode="outlined"
            style={styles.backButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: COLORS.error,
    marginBottom: 16,
  },
  header: {
    marginBottom: 4,
  },
  title: {
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  category: {
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  card: {
    ...SHADOWS.medium,
  },
  sectionTitle: {
    color: COLORS.textSecondary,
    letterSpacing: 1,
    marginBottom: 8,
  },
  divider: {
    marginBottom: 12,
  },
  bodyText: {
    color: COLORS.text,
    lineHeight: 22,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    color: COLORS.textSecondary,
  },
  price: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  inStock: {
    color: COLORS.success,
    fontWeight: '600',
  },
  outOfStock: {
    color: COLORS.error,
    fontWeight: '600',
  },
  actions: {
    gap: 12,
    marginTop: 8,
  },
  primaryButton: {},
  backButton: {},
});
