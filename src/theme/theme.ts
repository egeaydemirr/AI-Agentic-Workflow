/**
 * React Native Paper Theme Configuration
 * Main theme object for the application
 */

import { MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { COLORS } from './colors';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    primaryContainer: COLORS.primaryLight,
    secondary: COLORS.secondary,
    secondaryContainer: COLORS.secondaryLight,
    tertiary: COLORS.accent,
    tertiaryContainer: COLORS.accentLight,
    surface: COLORS.surface,
    surfaceVariant: COLORS.surfaceVariant,
    background: COLORS.background,
    error: COLORS.error,
    errorContainer: COLORS.errorLight,
    onPrimary: COLORS.white,
    onSecondary: COLORS.white,
    onTertiary: COLORS.white,
    onSurface: COLORS.text,
    onSurfaceVariant: COLORS.textSecondary,
    onError: COLORS.white,
    onBackground: COLORS.text,
    outline: COLORS.border,
    outlineVariant: COLORS.divider,
    inverseSurface: COLORS.secondary,
    inverseOnSurface: COLORS.textInverse,
    inversePrimary: COLORS.primaryLight,
    shadow: COLORS.black,
    scrim: COLORS.overlay,
    backdrop: COLORS.overlayLight,
  },
  roundness: 8,
};

export type AppTheme = typeof theme;

export default theme;
