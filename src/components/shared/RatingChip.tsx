/**
 * RatingChip
 * Small pill showing rating + review count, used across multiple sections.
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../../tokens';

interface RatingChipProps {
  rating: string;
  count: string;
  size?: 'sm' | 'md';
}

export default function RatingChip({ rating, count, size = 'md' }: RatingChipProps) {
  const isSmall = size === 'sm';
  return (
    <View style={[styles.chip, isSmall && styles.chipSm]}>
      <Text style={[styles.text, isSmall && styles.textSm]}>
        {rating} ★ ({count})
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: Colors.appBackground,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.separator,
    paddingHorizontal: Spacing.S4,
    paddingVertical: Spacing.S2,
    alignSelf: 'center',
  },
  chipSm: {
    paddingHorizontal: Spacing.S3,
    paddingVertical: 2,
  },
  text: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
  },
  textSm: {
    fontSize: 10,
    lineHeight: 14,
  },
});
