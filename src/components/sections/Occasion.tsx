/**
 * Occasion — Section 7
 * Dress for the occasion with 2-row horizontally scrollable category chips.
 */

import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { SharedValue } from 'react-native-reanimated';

import {
  Colors,
  Radius,
  SECTION_HEIGHT,
  Spacing,
  Typography,
} from '../../tokens';
import SectionHeader from '../shared/SectionHeader';
import CTABar from '../shared/CTABar';
import {
  useSectionProgress,
  useContainerStyle,
  useContentStyle,
  useCTAStyle,
} from '../../hooks/useSectionAnimation';

interface Props {
  scrollY: SharedValue<number>;
  sectionIndex: number;
}

const ROW_1 = [
  'Beach Holiday 🏖️',
  'Date Night 🌙',
  'Work From Office 💼',
  'Wedding Guest 💐',
];

const ROW_2 = [
  'Casual Friday 👕',
  'Party Night 🎉',
  'Gym Fit 💪',
  'Travel Ready ✈️',
];

// ---------------------------------------------------------------------------
// Sub-component: OccasionChip
// ---------------------------------------------------------------------------

function OccasionChip({ label }: { label: string }) {
  return (
    <TouchableOpacity style={chipStyles.chip} activeOpacity={0.75}>
      <Text style={chipStyles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const chipStyles = StyleSheet.create({
  chip: {
    backgroundColor: Colors.subtleNeutralGroup,
    borderRadius: 100,
    paddingHorizontal: Spacing.S6,
    paddingVertical: Spacing.S4,
    borderWidth: 1,
    borderColor: Colors.separator,
  },
  label: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
  },
});

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function Occasion({ scrollY, sectionIndex }: Props) {
  const progress = useSectionProgress(scrollY, sectionIndex);
  const containerStyle = useContainerStyle(progress);
  const contentStyle = useContentStyle(progress);
  const ctaStyle = useCTAStyle(progress);

  return (
    <Animated.View style={[styles.root, { height: SECTION_HEIGHT }, containerStyle]}>
      {/* Header */}
      <SectionHeader
        title="Dress for the occasion"
        subtitle="Curated styles for every moment"
        totalDots={9}
        activeDot={6}
        progress={progress}
      />

      {/* Chips grid — 2 rows, horizontal scroll */}
      <Animated.View style={[styles.chipsArea, contentStyle]}>
        {/* Row 1 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}
        >
          {ROW_1.map((label) => (
            <OccasionChip key={label} label={label} />
          ))}
        </ScrollView>

        {/* Row 2 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}
        >
          {ROW_2.map((label) => (
            <OccasionChip key={label} label={label} />
          ))}
        </ScrollView>

        {/* Large occasion preview placeholder */}
        <View style={styles.previewBox}>
          <Text style={styles.previewText}>Tap a category to explore looks ✨</Text>
        </View>
      </Animated.View>

      {/* CTA */}
      <CTABar label="Suggest some designer styles" progress={progress} />
    </Animated.View>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.appBackground,
    overflow: 'hidden',
  },
  chipsArea: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.S4,
  },
  chipRow: {
    paddingHorizontal: Spacing.S6,
    gap: Spacing.S3,
    alignItems: 'center',
  },
  previewBox: {
    marginHorizontal: Spacing.S6,
    backgroundColor: Colors.subtleNeutralGroup,
    borderRadius: Radius.md,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.separator,
    borderStyle: 'dashed',
  },
  previewText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
