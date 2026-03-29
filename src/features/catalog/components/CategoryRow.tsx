/**
 * Category selection row
 */

import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '../../../shared/ui';
import { COLORS } from '../../../theme';

interface CategoryRowProps {
  title: string;
  selected: boolean;
  onPress: () => void;
}

export const CategoryRow: React.FC<CategoryRowProps> = ({
  title,
  selected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selectedContainer]}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`${title}${selected ? ', seçili' : ''}`}
    >
      <View>
        <Text variant="titleSmall" style={styles.title}>
          {title}
        </Text>
      </View>
      <Text
        variant="labelLarge"
        style={selected ? styles.selectedText : styles.arrowText}
      >
        {selected ? 'Seçili' : '>'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.divider,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedContainer: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  title: {
    color: COLORS.text,
    fontWeight: '600',
  },
  selectedText: {
    color: COLORS.primaryDark,
    fontWeight: '700',
  },
  arrowText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
});

export default CategoryRow;
