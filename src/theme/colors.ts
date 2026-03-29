/**
 * Color Palette
 * Centralized color definitions - DO NOT hardcode colors elsewhere
 */

export const COLORS = {
  // Primary colors (pastel green)
  primary: '#7FBF9A',
  primaryDark: '#4F8D6B',
  primaryLight: '#DDF3E5',

  // Secondary colors
  secondary: '#8DBFA6',
  secondaryDark: '#5E9B7C',
  secondaryLight: '#EAF7EF',

  // Accent colors
  accent: '#A7D7B8',
  accentDark: '#78B48F',
  accentLight: '#EEF9F2',

  // Neutral colors
  background: '#F4FBF6',
  surface: '#FFFFFF',
  surfaceVariant: '#E7F4EB',

  // Text colors
  text: '#1F3A2C',
  textSecondary: '#5F7B6D',
  textDisabled: '#A7B8B0',
  textInverse: '#FFFFFF',

  // Semantic colors
  success: '#4FAE72',
  successLight: '#BFE6CD',
  error: '#D97B7B',
  errorLight: '#F2CFCF',
  warning: '#C7AA66',
  warningLight: '#EEDFB7',
  info: '#6FA7A0',
  infoLight: '#CBE7E3',

  // Borders and dividers
  border: '#CFE3D7',
  divider: '#E3EFE7',

  // Overlay
  overlay: 'rgba(31, 58, 44, 0.42)',
  overlayLight: 'rgba(31, 58, 44, 0.22)',

  // White and black
  white: '#FFFFFF',
  black: '#10281D',
} as const;

export const CATALOG2_COLORS = {
  background: '#F9F9F9',
  surface: '#FFFFFF',
  textPrimary: '#222222',
  textSecondary: '#9B9B9B',
  accent: '#DB3022',
  star: '#FFBA49',
  border: '#EDEDED',
  tabBarBorder: '#F0F0F0',
  heartInactive: '#9B9B9B',
} as const;

export type ColorKey = keyof typeof COLORS;

export default COLORS;
