/**
 * PaginationDots
 * Decorative horizontal dot row matching the Figma pagination bar style.
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../tokens';

interface PaginationDotsProps {
  total: number;
  active: number;
  /** colour override for active dot */
  activeColor?: string;
  /** colour override for inactive dots */
  inactiveColor?: string;
  /** align horizontally */
  centered?: boolean;
}

export default function PaginationDots({
  total,
  active,
  activeColor = Colors.brandPrimary,
  inactiveColor = Colors.emphasisDark,
  centered = true,
}: PaginationDotsProps) {
  return (
    <View style={[styles.row, centered && styles.centered]}>
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === active;
        return (
          <View
            key={i}
            style={[
              styles.dot,
              isActive
                ? [styles.dotActive, { backgroundColor: activeColor }]
                : [styles.dotInactive, { backgroundColor: inactiveColor }],
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 12,
  },
  centered: {
    justifyContent: 'center',
  },
  dot: {
    borderRadius: 100,
  },
  dotActive: {
    width: 16,
    height: 6,
  },
  dotInactive: {
    width: 6,
    height: 6,
  },
});
