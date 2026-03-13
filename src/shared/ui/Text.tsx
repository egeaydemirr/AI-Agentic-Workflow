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
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'bodyMedium',
  style,
  numberOfLines,
  ellipsizeMode,
}) => {
  return (
    <PaperText
      variant={variant}
      style={style}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      {children}
    </PaperText>
  );
};

export default Text;
