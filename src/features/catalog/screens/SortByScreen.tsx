/**
 * Sort by screen
 */

import { useRoute, type RouteProp } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '../../../navigation/hooks';
import type { RootStackParamList } from '../../../navigation/types';
import { Text } from '../../../shared/ui';
import { COLORS } from '../../../theme';
import { SortOptionRow } from '../components';
import { useGetCatalogSortOptionsQuery } from '../services/catalogApi';
import type { CatalogSortOption } from '../types';

type SortByRoute = RouteProp<RootStackParamList, 'SortBy'>;

const SortByScreen: React.FC = () => {
  const route = useRoute<SortByRoute>();
  const navigation = useNavigation();
  const { data: sortOptions = [] } = useGetCatalogSortOptionsQuery();
  const selectedSortOption = route.params?.selectedSortOption ?? 'recommended';

  const handleSelectOption = useCallback(
    (sortOption: CatalogSortOption) => {
      navigation.navigate('Catalog', { selectedSortOption: sortOption });
    },
    [navigation],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Sırala
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        accessibilityRole="list"
        accessibilityLabel="Sıralama seçenekleri"
      >
        {sortOptions.map(option => (
          <SortOptionRow
            key={option.id}
            title={option.label}
            selected={option.id === selectedSortOption}
            onPress={() => handleSelectOption(option.id)}
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

export default SortByScreen;
