/**
 * PriceRow
 * Displays discount badge + strikethrough original price + final price.
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Typography, Spacing } from '../../tokens';

interface PriceRowProps {
  discount: string;      // e.g. "↓ 18%"
  original: string;     // e.g. "15,990"
  final: string;        // e.g. "₹22,099"
  align?: 'left' | 'center' | 'right';
  size?: 'sm' | 'md';
}

export default function PriceRow({
  discount,
  original,
  final,
  align = 'center',
  size = 'md',
}: PriceRowProps) {
  const isSmall = size === 'sm';
  const justifyContent =
    align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start';

  return (
    <View style={[styles.row, { justifyContent }]}>
      <Text style={[styles.discount, isSmall && styles.textSm]}>{discount}</Text>
      <Text style={[styles.original, isSmall && styles.textSm]}>{original}</Text>
      <Text style={[styles.final, isSmall && styles.textSm]}>{final}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.S3,
    flexWrap: 'wrap',
  },
  discount: {
    ...Typography.bodySmallSB,
    color: Colors.successHighlight,
  },
  original: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  final: {
    ...Typography.bodySmallSB,
    color: Colors.textPrimary,
  },
  textSm: {
    fontSize: 11,
    lineHeight: 16,
  },
});
