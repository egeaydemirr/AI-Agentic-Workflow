/**
 * Navigation utilities and hooks
 */

import { useNavigation as useRNNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Typed useNavigation hook
export const useNavigation = () => {
  return useRNNavigation<NavigationProp>();
};

export default useNavigation;
