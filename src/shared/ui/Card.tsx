/**
 * Card Component
 * Reusable card container
 */

import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Card as PaperCard } from 'react-native-paper';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  elevation?: number;
  mode?: 'elevated' | 'outlined' | 'contained';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  elevation = 1,
  mode = 'elevated',
}) => {
  return (
    <PaperCard style={style} elevation={elevation} mode={mode}>
      <PaperCard.Content>{children}</PaperCard.Content>
    </PaperCard>
  );
};

export default Card;
