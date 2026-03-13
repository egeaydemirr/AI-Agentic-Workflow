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
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  elevation = 1,
}) => {
  return (
    <PaperCard style={style} elevation={elevation}>
      <PaperCard.Content>{children}</PaperCard.Content>
    </PaperCard>
  );
};

export default Card;
