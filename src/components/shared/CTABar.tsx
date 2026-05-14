/**
 * CTABar
 * Pill-shaped call-to-action bar rendered at the bottom of most sections.
 * Uses brand pink (#c70255) to simulate gradient text (avoids MaskedView complexity).
 */

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { SharedValue } from 'react-native-reanimated';

import { Colors, Typography, Spacing, Radius } from '../../tokens';
import { useCTAStyle } from '../../hooks/useSectionAnimation';

interface CTABarProps {
  label: string;
  progress: SharedValue<number>;
  onPress?: () => void;
}

export default function CTABar({ label, progress, onPress }: CTABarProps) {
  const ctaStyle = useCTAStyle(progress);

  return (
    <Animated.View style={[styles.wrapper, ctaStyle]}>
      <TouchableOpacity
        style={styles.pill}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {/* Message / mic icon placeholder */}
        <View style={styles.iconDot}>
          <Text style={styles.iconText}>✦</Text>
        </View>
        <Text style={styles.label} numberOfLines={1}>
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    paddingHorizontal: Spacing.S6,
    paddingBottom: Spacing.S4,
    marginTop: Spacing.S4,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.appBackground,
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.S7,
    paddingVertical: Spacing.S4,
    gap: Spacing.S4,
    // Subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  iconDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.subtleBrandGroup,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 10,
    color: Colors.brandPrimary,
    fontWeight: '700',
  },
  label: {
    ...Typography.bodySB,
    color: Colors.brandPrimary,
  },
});
