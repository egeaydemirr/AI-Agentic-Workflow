/**
 * Input Component
 * Themed text input component
 */

import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  mode?: 'flat' | 'outlined';
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  right?: React.ReactNode;
  left?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error = false,
  disabled = false,
  style,
  mode = 'outlined',
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  right,
  left,
}) => {
  return (
    <PaperTextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      error={error}
      disabled={disabled}
      style={style}
      mode={mode}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      right={right}
      left={left}
    />
  );
};

export default Input;
