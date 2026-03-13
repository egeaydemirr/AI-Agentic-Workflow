/**
 * Shadow Tokens
 * Standard shadow definitions for elevation
 */

import { ViewStyle } from 'react-native';

export const SHADOWS = {
  none: {
    shadowColor: '#4F8D6B',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  } as ViewStyle,

  small: {
    shadowColor: '#4F8D6B',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.14,
    shadowRadius: 1,
    elevation: 1,
  } as ViewStyle,

  medium: {
    shadowColor: '#4F8D6B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 3.84,
    elevation: 3,
  } as ViewStyle,

  large: {
    shadowColor: '#4F8D6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 6,
  } as ViewStyle,

  xlarge: {
    shadowColor: '#4F8D6B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  } as ViewStyle,
} as const;

export type ShadowKey = keyof typeof SHADOWS;

export default SHADOWS;
