import React, { useMemo } from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '../../../navigation/hooks';
import { Text } from '../../../shared/ui';
import { CATALOG2_COLORS, CATALOG2_TYPOGRAPHY } from '../../../theme';
import {
  catalog2FilterChips,
  catalog2Products,
  catalog2Tabs,
} from '../__fixtures__/catalogData';
import Catalog2FilterRow from '../components/Catalog2FilterRow';
import Catalog2Header from '../components/Catalog2Header';
import Catalog2ProductCard from '../components/Catalog2ProductCard';
import type { CatalogProduct } from '../types';

const Catalog2Screen: React.FC = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const horizontalPadding = 16;
  const gap = 16;
  const cardWidth = useMemo(
    () => (width - horizontalPadding * 2 - gap) / 2,
    [width],
  );

  const renderItem: ListRenderItem<CatalogProduct> = ({ item }) => (
    <Catalog2ProductCard product={item} width={cardWidth} />
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <FlatList
        data={catalog2Products}
        numColumns={2}
        key="catalog2-grid"
        renderItem={renderItem}
        keyExtractor={item => item.id}
        columnWrapperStyle={styles.columnWrap}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <Catalog2Header
              itemsCount={catalog2Products.length}
              onPressBack={() => navigation.goBack()}
            />
            <Catalog2FilterRow
              tabs={catalog2Tabs}
              selectedTab={catalog2Tabs[0]}
              chips={catalog2FilterChips}
            />
          </View>
        }
      />

      <View style={styles.tabBar}>
        <View style={styles.tabItem}>
          <IconButton
            icon="home-outline"
            size={20}
            iconColor={CATALOG2_COLORS.textSecondary}
            onPress={() => undefined}
            style={styles.tabIcon}
          />
          <Text variant="labelSmall" style={styles.tabLabel}>
            Home
          </Text>
        </View>
        <View style={styles.tabItem}>
          <IconButton
            icon="shape-outline"
            size={20}
            iconColor={CATALOG2_COLORS.accent}
            onPress={() => undefined}
            style={styles.tabIcon}
          />
          <Text variant="labelSmall" style={styles.tabLabelActive}>
            Shop
          </Text>
        </View>
        <View style={styles.tabItem}>
          <IconButton
            icon="shopping-outline"
            size={20}
            iconColor={CATALOG2_COLORS.textSecondary}
            onPress={() => undefined}
            style={styles.tabIcon}
          />
          <Text variant="labelSmall" style={styles.tabLabel}>
            Bag
          </Text>
        </View>
        <View style={styles.tabItem}>
          <IconButton
            icon="heart-outline"
            size={20}
            iconColor={CATALOG2_COLORS.textSecondary}
            onPress={() => undefined}
            style={styles.tabIcon}
          />
          <Text variant="labelSmall" style={styles.tabLabel}>
            Favorites
          </Text>
        </View>
        <View style={styles.tabItem}>
          <IconButton
            icon="account-outline"
            size={20}
            iconColor={CATALOG2_COLORS.textSecondary}
            onPress={() => undefined}
            style={styles.tabIcon}
          />
          <Text variant="labelSmall" style={styles.tabLabel}>
            Profile
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CATALOG2_COLORS.background,
  },
  content: {
    paddingBottom: 96,
    paddingHorizontal: 16,
  },
  columnWrap: {
    justifyContent: 'space-between',
  },
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 82,
    backgroundColor: CATALOG2_COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: CATALOG2_COLORS.tabBarBorder,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingTop: 6,
    paddingHorizontal: 6,
  },
  tabItem: {
    alignItems: 'center',
    width: 64,
  },
  tabIcon: {
    margin: 0,
  },
  tabLabel: {
    marginTop: -2,
    color: CATALOG2_COLORS.textSecondary,
    fontFamily: CATALOG2_TYPOGRAPHY.family.regular,
    fontSize: CATALOG2_TYPOGRAPHY.size.sm,
  },
  tabLabelActive: {
    marginTop: -2,
    color: CATALOG2_COLORS.accent,
    fontFamily: CATALOG2_TYPOGRAPHY.family.medium,
    fontSize: CATALOG2_TYPOGRAPHY.size.sm,
  },
});

export default Catalog2Screen;
