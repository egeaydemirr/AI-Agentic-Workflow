/**
 * CategorySelectionScreen
 * Lightweight category selection screen for Categories 2 flow
 */

import { useRoute, type RouteProp } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '../../../navigation/hooks';
import type { RootStackParamList } from '../../../navigation/types';
import { Text } from '../../../shared/ui';
import { COLORS } from '../../../theme';
import { CategoryRow } from '../components';
import { useGetCatalogCategoriesQuery } from '../services/catalogApi';

type CategorySelectionRoute = RouteProp<
  RootStackParamList,
  'CategorySelection'
>;

const CategorySelectionScreen: React.FC = () => {
  const route = useRoute<CategorySelectionRoute>();
  const navigation = useNavigation();
  const { data: categories = [] } = useGetCatalogCategoriesQuery();
  const selectedCategoryId = route.params?.selectedCategoryId ?? 'all';

  const handleApplyCategory = useCallback(
    (categoryId: string) => {
      navigation.navigate('Catalog', { selectedCategoryId: categoryId });
    },
    [navigation],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Kategori Seçimi
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        accessibilityRole="list"
        accessibilityLabel="Kategori seçim listesi"
      >
        {categories.map(category => (
          <CategoryRow
            key={category.id}
            title={category.name}
            selected={category.id === selectedCategoryId}
            onPress={() => handleApplyCategory(category.id)}
          />
        ))}
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
});

export default CategorySelectionScreen;
