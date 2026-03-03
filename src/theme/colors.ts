/**
 * Color Palette
 * Centralized color definitions - DO NOT hardcode colors elsewhere
 */

export const COLORS = {
  // Primary colors (Koç brand colors)
  primary: '#E30613',
  primaryDark: '#B3050F',
  primaryLight: '#FF3845',

  // Secondary colors
  secondary: '#1A1A1A',
  secondaryDark: '#000000',
  secondaryLight: '#4A4A4A',

  // Accent colors
  accent: '#FFA726',
  accentDark: '#F57C00',
  accentLight: '#FFB74D',

  // Neutral colors
  background: '#FFFFFF',
  surface: '#F5F5F5',
  surfaceVariant: '#E0E0E0',

  // Text colors
  text: '#1A1A1A',
  textSecondary: '#757575',
  textDisabled: '#BDBDBD',
  textInverse: '#FFFFFF',

  // Semantic colors
  success: '#4CAF50',
  successLight: '#81C784',
  error: '#F44336',
  errorLight: '#E57373',
  warning: '#FF9800',
  warningLight: '#FFB74D',
  info: '#2196F3',
  infoLight: '#64B5F6',

  // Borders and dividers
  border: '#E0E0E0',
  divider: '#EEEEEE',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',

  // White and black
  white: '#FFFFFF',
  black: '#000000',
} as const;

export type ColorKey = keyof typeof COLORS;

export default COLORS;
