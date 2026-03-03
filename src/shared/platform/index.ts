/**
 * Platform-specific utilities
 * Helpers for iOS/Android specific logic
 */

import { Platform } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const platformSelect = <T>(options: {
  ios?: T;
  android?: T;
  default?: T;
}): T | undefined => {
  if (isIOS && options.ios !== undefined) {
    return options.ios;
  }
  if (isAndroid && options.android !== undefined) {
    return options.android;
  }
  return options.default;
};

export default {
  isIOS,
  isAndroid,
  platformSelect,
};
