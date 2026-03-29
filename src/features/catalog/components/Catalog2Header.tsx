import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Text } from '../../../shared/ui';
import { CATALOG2_COLORS, CATALOG2_TYPOGRAPHY } from '../../../theme';

interface Catalog2HeaderProps {
  itemsCount: number;
  onPressBack?: () => void;
}

const Catalog2Header: React.FC<Catalog2HeaderProps> = ({
  itemsCount,
  onPressBack,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <IconButton
          icon="chevron-left"
          iconColor={CATALOG2_COLORS.textPrimary}
          size={24}
          style={styles.iconButton}
          onPress={onPressBack}
        />
        <IconButton
          icon="magnify"
          iconColor={CATALOG2_COLORS.textPrimary}
          size={22}
          style={styles.iconButton}
          onPress={() => undefined}
        />
      </View>

      <Text variant="headlineMedium" style={styles.title}>
        Women’s tops
      </Text>
      <Text variant="bodySmall" style={styles.subtitle}>
        {itemsCount} items
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: CATALOG2_COLORS.background,
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 14,
  },
  topRow: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconButton: {
    margin: 0,
  },
  title: {
    color: CATALOG2_COLORS.textPrimary,
    fontFamily: CATALOG2_TYPOGRAPHY.family.bold,
    fontSize: CATALOG2_TYPOGRAPHY.size['2xl'],
    lineHeight: 34,
  },
  subtitle: {
    marginTop: 3,
    color: CATALOG2_COLORS.textSecondary,
    fontFamily: CATALOG2_TYPOGRAPHY.family.regular,
    fontSize: CATALOG2_TYPOGRAPHY.size.md,
    lineHeight: 20,
  },
});

export default Catalog2Header;
