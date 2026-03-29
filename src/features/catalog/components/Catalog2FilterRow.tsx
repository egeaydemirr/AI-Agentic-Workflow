import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Text } from '../../../shared/ui';
import { CATALOG2_COLORS, CATALOG2_TYPOGRAPHY, SHADOWS } from '../../../theme';

interface Catalog2FilterRowProps {
  tabs: string[];
  selectedTab: string;
  chips: string[];
}

const Catalog2FilterRow: React.FC<Catalog2FilterRowProps> = ({
  tabs,
  selectedTab,
  chips,
}) => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContent}
      >
        {tabs.map(tab => {
          const active = tab === selectedTab;
          return (
            <Pressable
              key={tab}
              style={[styles.tabPill, active && styles.tabPillActive]}
            >
              <Text
                variant="labelMedium"
                style={[styles.tabText, active && styles.tabTextActive]}
              >
                {tab}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.filterBar}>
        <View style={styles.leftGroup}>
          <Pressable style={styles.roundedChip}>
            <IconButton
              icon="tune-vertical"
              size={16}
              iconColor={CATALOG2_COLORS.textPrimary}
              style={styles.chipIcon}
              onPress={() => undefined}
            />
            <Text variant="labelSmall" style={styles.chipText}>
              {chips[0]}
            </Text>
          </Pressable>

          <Pressable style={styles.roundedChip}>
            <Text variant="labelSmall" style={styles.chipText}>
              {chips[1]}
            </Text>
          </Pressable>
        </View>

        <Pressable style={styles.viewToggle}>
          <IconButton
            icon="view-grid-outline"
            size={18}
            iconColor={CATALOG2_COLORS.textPrimary}
            style={styles.chipIcon}
            onPress={() => undefined}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContent: {
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  tabPill: {
    backgroundColor: CATALOG2_COLORS.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: CATALOG2_COLORS.border,
    paddingHorizontal: 20,
    minHeight: 30,
    justifyContent: 'center',
  },
  tabPillActive: {
    backgroundColor: CATALOG2_COLORS.textPrimary,
    borderColor: CATALOG2_COLORS.textPrimary,
  },
  tabText: {
    color: CATALOG2_COLORS.textPrimary,
    fontFamily: CATALOG2_TYPOGRAPHY.family.regular,
    fontSize: CATALOG2_TYPOGRAPHY.size.base,
  },
  tabTextActive: {
    color: CATALOG2_COLORS.surface,
    fontFamily: CATALOG2_TYPOGRAPHY.family.medium,
  },
  filterBar: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: CATALOG2_COLORS.background,
  },
  leftGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  roundedChip: {
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: CATALOG2_COLORS.border,
    backgroundColor: CATALOG2_COLORS.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 2,
    paddingRight: 12,
    ...SHADOWS.small,
  },
  chipIcon: {
    margin: 0,
    marginRight: -4,
  },
  chipText: {
    color: CATALOG2_COLORS.textPrimary,
    fontFamily: CATALOG2_TYPOGRAPHY.family.medium,
    fontSize: CATALOG2_TYPOGRAPHY.size.base,
  },
  viewToggle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CATALOG2_COLORS.surface,
    borderWidth: 1,
    borderColor: CATALOG2_COLORS.border,
  },
});

export default Catalog2FilterRow;
