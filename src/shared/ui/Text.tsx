/**
 * Text Component
 * Themed text component with consistent typography
 */

import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

interface TextProps {
  children: React.ReactNode;
  variant?:
    | 'displayLarge'
    | 'displayMedium'
    | 'displaySmall'
    | 'headlineLarge'
    | 'headlineMedium'
    | 'headlineSmall'
    | 'titleLarge'
    | 'titleMedium'
    | 'titleSmall'
    | 'bodyLarge'
    | 'bodyMedium'
    | 'bodySmall'
    | 'labelLarge'
    | 'labelMedium'
    | 'labelSmall';
  style?: StyleProp<TextStyle>;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'bodyMedium',
  style,
}) => {
  return (
    <PaperText variant={variant} style={style}>
      {children}
    </PaperText>
  );
};

export default Text;
