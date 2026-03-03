/**
 * Home Screen
 * Main home screen of the application
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Text } from '../../../shared/ui';
import { COLORS, SHADOWS } from '../../../theme';
import { useHomeScreen } from '../hooks/useHomeScreen';

const HomeScreen: React.FC = () => {
  const { greeting, handlePress } = useHomeScreen();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineLarge" style={styles.title}>
          {greeting}
        </Text>

        <Card style={styles.card}>
          <Text variant="bodyLarge" style={styles.description}>
            This is a React Native project following Koç Mobil architecture
            standards.
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Features:
          </Text>
          <Text variant="bodySmall" style={styles.feature}>
            • Redux Toolkit with RTK Query
          </Text>
          <Text variant="bodySmall" style={styles.feature}>
            • React Navigation
          </Text>
          <Text variant="bodySmall" style={styles.feature}>
            • React Native Paper theming
          </Text>
          <Text variant="bodySmall" style={styles.feature}>
            • Modular feature architecture
          </Text>
        </Card>

        <Button
          title="Get Started"
          onPress={handlePress}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
    color: COLORS.primary,
  },
  card: {
    marginBottom: 24,
    ...SHADOWS.medium,
  },
  description: {
    marginBottom: 16,
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 8,
    fontWeight: '600',
    color: COLORS.text,
  },
  feature: {
    marginTop: 4,
    color: COLORS.textSecondary,
  },
  button: {
    marginTop: 16,
  },
});

export default HomeScreen;
