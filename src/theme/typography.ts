/**
 * Typography
 * Standard font sizes and text styles - DO NOT hardcode font sizes
 */

export const TYPOGRAPHY = {
  // Font families
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    light: 'System',
  },

  // Font sizes
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Font weights
  fontWeight: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;

export const CATALOG2_TYPOGRAPHY = {
  family: {
    regular: 'Metropolis-Regular',
    medium: 'Metropolis-Medium',
    semibold: 'Metropolis-SemiBold',
    bold: 'Metropolis-Bold',
  },
  size: {
    xs: 10,
    sm: 11,
    base: 12,
    md: 14,
    lg: 16,
    xl: 18,
    '2xl': 28,
  },
} as const;

export default TYPOGRAPHY;
