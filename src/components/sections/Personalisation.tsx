/**
 * Personalisation — Section 9
 * Dark card with abstract blob background and preference question.
 */

import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { SharedValue } from 'react-native-reanimated';

import {
  Assets,
  Colors,
  Radius,
  SECTION_HEIGHT,
  Spacing,
  Typography,
} from '../../tokens';
import PaginationDots from '../shared/PaginationDots';
import CTABar from '../shared/CTABar';
import {
  useSectionProgress,
  useContainerStyle,
  useHeadingStyle,
  useSubtitleStyle,
  useContentStyle,
  useCTAStyle,
} from '../../hooks/useSectionAnimation';

interface Props {
  scrollY: SharedValue<number>;
  sectionIndex: number;
}

const OPTIONS = [
  'Breezy White Linen',
  'Striped cotton Tee',
  'Casual Chinos',
  'Prefer not to Say',
];

export default function Personalisation({ scrollY, sectionIndex }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const progress = useSectionProgress(scrollY, sectionIndex);
  const containerStyle = useContainerStyle(progress);
  const headingStyle = useHeadingStyle(progress);
  const subtitleStyle = useSubtitleStyle(progress);
  const contentStyle = useContentStyle(progress);
  const ctaStyle = useCTAStyle(progress);

  return (
    <Animated.View style={[styles.root, { height: SECTION_HEIGHT }, containerStyle]}>
      {/* Pagination above card */}
      <View style={styles.paginationRow}>
        <PaginationDots total={9} active={8} />
      </View>

      {/* Dark card */}
      <Animated.View style={[styles.card, contentStyle]}>
        {/* Blob background */}
        <Image
          source={{ uri: Assets.PERSONAL_BG }}
          style={styles.blobBg}
          resizeMode="cover"
        />

        {/* Content overlay */}
        <View style={styles.cardContent}>
          {/* Title */}
          <Animated.Text style={[styles.cardTitle, headingStyle]}>
            Help us know you better
          </Animated.Text>

          {/* Question */}
          <Animated.Text style={[styles.cardQuestion, subtitleStyle]}>
            Packing for a coastal getaway! What is the first thing in your bag?
          </Animated.Text>

          {/* Option pills */}
          <View style={styles.optionsWrapper}>
            {OPTIONS.map((opt, i) => (
              <TouchableOpacity
                key={opt}
                style={[
                  styles.optionPill,
                  selected === i && styles.optionPillSelected,
                ]}
                onPress={() => setSelected(i)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.optionText,
                    selected === i && styles.optionTextSelected,
                  ]}
                >
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Animated.View>

      {/* Privacy text */}
      <Text style={styles.privacyText}>
        Your preferences are never shared with third parties and help personalise your experience.
      </Text>

      {/* CTA */}
      <CTABar label="Tell us more about you" progress={progress} />
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
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  paginationRow: {
    alignItems: 'center',
    marginBottom: Spacing.S5,
  },
  card: {
    backgroundColor: Colors.boldNeutralEmphasis,
    borderRadius: 20,
    height: 444,
    overflow: 'hidden',
    flex: 1,
    maxHeight: 444,
  },
  blobBg: {
    position: 'absolute',
    width: 443,
    height: 520,
    top: -70,
    left: -116,
  },
  cardContent: {
    position: 'absolute',
    top: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: Spacing.S5,
    gap: Spacing.S5,
  },
  cardTitle: {
    ...Typography.sectionHeading,
    color: Colors.white,
    paddingHorizontal: 12,
    textAlign: 'center',
  },
  cardQuestion: {
    ...Typography.bodySmall,
    color: Colors.neutralHighlight,
    textAlign: 'center',
    width: 240,
  },
  optionsWrapper: {
    width: '100%',
    gap: Spacing.S5,
    paddingHorizontal: 32,
    marginTop: Spacing.S3,
  },
  optionPill: {
    height: 44,
    backgroundColor: Colors.boldNeutralGroup,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#525252',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionPillSelected: {
    backgroundColor: Colors.brandPrimary,
    borderColor: Colors.brandPrimary,
  },
  optionText: {
    ...Typography.bodySmall,
    color: Colors.white,
    textAlign: 'center',
  },
  optionTextSelected: {
    fontWeight: '600',
  },
  privacyText: {
    ...Typography.labelLight,
    color: Colors.textSecondary,
    textAlign: 'center',
    opacity: 0.6,
    marginTop: 12,
    paddingHorizontal: Spacing.S6,
  },
});
