/**
 * Categories screen
 */

import { useRoute, type RouteProp } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '../../../navigation/hooks';
import type { RootStackParamList } from '../../../navigation/types';
import { Button, Text } from '../../../shared/ui';
import { COLORS } from '../../../theme';
import { CategoryRow } from '../components';
import { useGetCatalogCategoriesQuery } from '../services/catalogApi';

type CategoriesRoute = RouteProp<RootStackParamList, 'Categories'>;

const CategoriesScreen: React.FC = () => {
  const route = useRoute<CategoriesRoute>();
  const navigation = useNavigation();
  const { data: categories = [] } = useGetCatalogCategoriesQuery();
  const selectedCategoryId = route.params?.selectedCategoryId ?? 'all';

  const handleSelectCategory = useCallback(
    (categoryId: string) => {
      navigation.navigate('Catalog', { selectedCategoryId: categoryId });
    },
    [navigation],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Kategoriler
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        accessibilityRole="list"
        accessibilityLabel="Kategori listesi"
      >
        {categories.map(category => (
          <CategoryRow
            key={category.id}
            title={category.name}
            selected={category.id === selectedCategoryId}
            onPress={() => handleSelectCategory(category.id)}
          />
        ))}

        <Button
          title="Kategori Seçim Ekranı"
          onPress={() =>
            navigation.navigate('CategorySelection', { selectedCategoryId })
          }
          mode="outlined"
          icon="format-list-checks"
          style={styles.selectionButton}
          accessibilityLabel="Detaylı kategori seçim ekranını aç"
        />
      </ScrollView>
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
    paddingBottom: 10,
  },
  title: {
    color: COLORS.primaryDark,
    fontWeight: '700',
  },
  content: {
    padding: 16,
    paddingBottom: 24,
  },
  selectionButton: {
    marginTop: 8,
  },
});

export default CategoriesScreen;
