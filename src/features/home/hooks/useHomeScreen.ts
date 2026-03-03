/**
 * Home Screen Hook
 * Business logic for home screen
 */

import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

export const useHomeScreen = () => {
  const [greeting] = useState('Koç Mobil Architecture');

  const handlePress = useCallback(() => {
    Alert.alert(
      'Welcome!',
      'This is a React Native project following Koç Mobil architecture standards.',
      [{ text: 'OK' }],
    );
  }, []);

  return {
    greeting,
    handlePress,
  };
};

export default useHomeScreen;
