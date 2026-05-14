/**
 * ReviewSynthesizer — Section 2
 * AI-synthesized review summary with product details, good/bad cards.
 */

import React from 'react';
import {
  Image,
  Platform,
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
import SectionHeader from '../shared/SectionHeader';
import CTABar from '../shared/CTABar';
import RatingChip from '../shared/RatingChip';
import PriceRow from '../shared/PriceRow';
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

// ---------------------------------------------------------------------------
// Sub-component: ReviewCard (good / bad)
// ---------------------------------------------------------------------------

function ReviewCard({
  icon,
  heading,
  points,
}: {
  icon: string;
  heading: string;
  points: string[];
}) {
  return (
    <View style={reviewCardStyles.card}>
      <Image source={{ uri: icon }} style={reviewCardStyles.icon} resizeMode="contain" />
      <Text style={reviewCardStyles.heading}>{heading}</Text>
      {points.map((p, i) => (
        <View key={i} style={reviewCardStyles.bulletRow}>
          <Text style={reviewCardStyles.bullet}>•</Text>
          <Text style={reviewCardStyles.bulletText}>{p}</Text>
        </View>
      ))}
    </View>
  );
}

const reviewCardStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.subtleNeutralGroup,
    borderRadius: Radius.md,
    padding: Spacing.S5,
    gap: Spacing.S3,
  },
  icon: {
    width: 20,
    height: 20,
    marginBottom: 2,
  },
  heading: {
    ...Typography.bodySB,
    color: Colors.textPrimary,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: Spacing.S2,
    alignItems: 'flex-start',
  },
  bullet: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  bulletText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    flex: 1,
  },
});

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function ReviewSynthesizer({ scrollY, sectionIndex }: Props) {
  const progress = useSectionProgress(scrollY, sectionIndex);
  const containerStyle = useContainerStyle(progress);
  const contentStyle = useContentStyle(progress);
  const ctaStyle = useCTAStyle(progress);

  return (
    <Animated.View style={[styles.root, { height: SECTION_HEIGHT }, containerStyle]}>
      {/* Header */}
      <SectionHeader
        title="What shoppers are saying"
        subtitle="Highlights from verified reviews"
        totalDots={9}
        activeDot={1}
        progress={progress}
      />

      {/* Content block */}
      <Animated.View style={[styles.content, contentStyle]}>
        <View style={styles.innerCard}>
          {/* Product image with rating overlay */}
          <View style={styles.productImageWrapper}>
            <Image
              source={{ uri: Assets.REVIEW_PRODUCT }}
              style={styles.productImage}
              resizeMode="contain"
            />
            <View style={styles.ratingOverlay}>
              <RatingChip rating="4.6" count="275" size="sm" />
            </View>
          </View>

          {/* Product name */}
          <Text style={styles.productName} numberOfLines={2}>
            LG 28 L All-In-One Convection Microwave Oven...
          </Text>

          {/* Price row */}
          <PriceRow
            discount="↓ 18%"
            original="15,990"
            final="₹22,099"
            align="center"
            size="sm"
          />

          {/* Gradient summary bar (simulated with brand color) */}
          <View style={styles.summaryBar}>
            <Text style={styles.summaryBarStar}>★</Text>
            <Text style={styles.summaryBarText}>Summarised from 9k user reviews</Text>
            <Text style={styles.summaryBarStar}>★</Text>
          </View>

          {/* Good / Bad cards */}
          <View style={styles.reviewRow}>
            <ReviewCard
              icon={Assets.REVIEW_GOOD}
              heading="The Good Stuff"
              points={[
                'Crispy snacks using 88% less oil.',
                'Restaurant-style Naan and Tandoori Roti at home.',
              ]}
            />
            <ReviewCard
              icon={Assets.REVIEW_BAD}
              heading="Know before you go"
              points={[
                'Complex buttons and dial lack modern touch simplicity.',
                'Slower preheating compared to dedicated OTG ovens.',
              ]}
            />
          </View>
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
  content: {
    flex: 1,
    paddingHorizontal: Spacing.S6,
    justifyContent: 'center',
  },
  innerCard: {
    backgroundColor: Colors.appBackground,
    borderRadius: Radius.md,
    overflow: 'hidden',
    gap: Spacing.S4,
    paddingBottom: Spacing.S4,
  },
  productImageWrapper: {
    alignSelf: 'center',
    width: 120,
    height: 120,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    overflow: 'visible',
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: Radius.md,
  },
  ratingOverlay: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2,
  },
  productName: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginTop: Spacing.S3,
    paddingHorizontal: Spacing.S4,
  },
  summaryBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.S3,
    paddingVertical: Spacing.S3,
    backgroundColor: Colors.subtleBrandGroup,
    borderRadius: Radius.sm,
    marginHorizontal: Spacing.S2,
  },
  summaryBarStar: {
    fontSize: 12,
    color: Colors.gradientSecondary,
  },
  summaryBarText: {
    ...Typography.labelLight,
    color: Colors.brandPrimary,
    textAlign: 'center',
  },
  reviewRow: {
    flexDirection: 'row',
    gap: Spacing.S4,
  },
});
