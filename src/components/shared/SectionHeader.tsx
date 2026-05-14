/**
 * SectionHeader
 * Reusable top-of-section block: pagination dots + title + subtitle.
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { SharedValue } from 'react-native-reanimated';

import { Colors, Typography, Spacing } from '../../tokens';
import { useHeadingStyle, useSubtitleStyle } from '../../hooks/useSectionAnimation';
import PaginationDots from './PaginationDots';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  totalDots?: number;
  activeDot?: number;
  progress: SharedValue<number>;
}

export default function SectionHeader({
  title,
  subtitle,
  totalDots = 9,
  activeDot = 0,
  progress,
}: SectionHeaderProps) {
  const headingStyle = useHeadingStyle(progress);
  const subtitleStyle = useSubtitleStyle(progress);

  return (
    <View style={styles.container}>
      <PaginationDots total={totalDots} active={activeDot} />
      <Animated.Text style={[styles.title, headingStyle]}>{title}</Animated.Text>
      <Animated.Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: Spacing.S6,
    paddingHorizontal: Spacing.S6,
    gap: Spacing.S3,
  },
  title: {
    ...Typography.sectionHeading,
    color: Colors.textPrimary2,
  },
  subtitle: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
