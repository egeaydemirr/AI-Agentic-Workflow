/**
 * Button Component
 * Reusable button component based on theme
 */

import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

interface ButtonProps {
  title: string;
  onPress: () => void;
  mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  icon?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  mode = 'contained',
  disabled = false,
  loading = false,
  style,
  icon,
  accessibilityLabel,
  accessibilityHint,
}) => {
  return (
    <PaperButton
      mode={mode}
      onPress={onPress}
      disabled={disabled}
      loading={loading}
      style={style}
      icon={icon}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityHint={accessibilityHint}
    >
      {title}
    </PaperButton>
  );
};

export default Button;
